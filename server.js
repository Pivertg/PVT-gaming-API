const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 5000;

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/monProjet', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connecté à MongoDB');
}).catch((err) => {
  console.log('Erreur de connexion à MongoDB:', err);
});

// Modèle Utilisateur pour MongoDB
const utilisateurSchema = new mongoose.Schema({
  nom: String,
  email: String,
  motDePasse: String
});

const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);

// Définir les options Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API PVT Gaming',
      version: '1.0.0',
      description: 'Documentation de l\'API pour PVT Gaming'
    },
  },
  apis: ['./server.js'], // Spécifie les fichiers où les commentaires de Swagger sont définis
};

// Initialiser Swagger
const swaggerSpec = swaggerJsdoc(options);

// Ajouter Swagger UI comme middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route de test
/**
 * @swagger
 * /api/test:
 *   get:
 *     description: Obtenir un message de test
 *     responses:
 *       200:
 *         description: Message de succès
 */
app.get('/api/test', (req, res) => {
  res.send('API fonctionne !');
});

// Route POST pour ajouter un utilisateur
/**
 * @swagger
 * /api/utilisateur:
 *   post:
 *     description: Ajouter un nouvel utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur ajouté avec succès
 */
app.post('/api/utilisateur', async (req, res) => {
  const { nom, email, motDePasse } = req.body;

  // Hash du mot de passe avant de l'enregistrer
  const motDePasseHash = await bcrypt.hash(motDePasse, 10);

  const nouvelUtilisateur = new Utilisateur({ nom, email, motDePasse: motDePasseHash });
  await nouvelUtilisateur.save();
  res.json({ message: 'Utilisateur ajouté', utilisateur: nouvelUtilisateur });
});

// Route POST pour la connexion et génération de token JWT
/**
 * @swagger
 * /api/login:
 *   post:
 *     description: Connexion d'un utilisateur et génération d'un token JWT
 *     responses:
 *       200:
 *         description: Connexion réussie
 */
app.post('/api/login', async (req, res) => {
  const { email, motDePasse } = req.body;

  // Rechercher l'utilisateur dans la base de données
  const utilisateur = await Utilisateur.findOne({ email });

  if (!utilisateur) {
    return res.status(400).json({ message: 'Utilisateur non trouvé' });
  }

  // Vérifier le mot de passe
  const estValide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);

  if (!estValide) {
    return res.status(400).json({ message: 'Mot de passe incorrect' });
  }

  // Générer un JWT
  const token = jwt.sign({ id: utilisateur._id }, 'ma_clé_secrète', { expiresIn: '1h' });
  res.json({ message: 'Connexion réussie', token });
});

// Middleware pour protéger les routes
const verifierToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé, token manquant' });
  }

  try {
    const payload = jwt.verify(token, 'ma_clé_secrète');
    req.utilisateur = payload;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token invalide' });
  }
};

// Route protégée (exemple)
app.get('/api/protected', verifierToken, (req, res) => {
  res.json({ message: 'Bienvenue sur la route protégée', utilisateur: req.utilisateur });
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Quelque chose a mal tourné!' });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur en ligne sur http://localhost:${port}`);
});
