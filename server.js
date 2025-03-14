const express = require('express');
const app = express();
const port = 5000;

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Exemple de route GET
app.get('/api/test', (req, res) => {
  res.send('API fonctionne !');
});

// Exemple de route POST
app.post('/api/data', (req, res) => {
  const data = req.body;
  res.json({ message: 'Données reçues', data });
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur en ligne sur http://localhost:${port}`);
});
// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Quelque chose a mal tourné!' });
});
const mongoose = require('mongoose');

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/monProjet', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connecté à MongoDB');
}).catch((err) => {
  console.log('Erreur de connexion à MongoDB:', err);
});

