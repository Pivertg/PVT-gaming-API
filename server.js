require('dotenv').config(); // Charger les variables d'environnement
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;

// Récupération de la clé API depuis le fichier .env
const API_KEY = process.env.API_KEY;

// Vérification que la clé API est bien définie
if (!API_KEY) {
    console.error("Erreur : API_KEY non définie !");
    process.exit(1); // Arrêter le serveur si la clé API est manquante
}

// Middleware pour parser le JSON
app.use(express.json());

// Route d'accueil
app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur PVT-gaming API !');
});

// Route pour récupérer les infos d’un joueur Brawl Stars
app.get('/api/joueur/:tag', async (req, res) => {
    const joueurTag = req.params.tag.replace('#', '%23'); // Encodage du #

    try {
        const response = await axios.get(`https://api.brawlstars.com/v1/players/${joueurTag}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Accept': 'application/json'
            }
        });

        res.json(response.data); // Renvoie les données du joueur
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: 'Erreur lors de la récupération des infos du joueur',
            error: error.response?.data || error.message
        });
    }
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`✅ Serveur en ligne sur http://localhost:${port}`);
});
