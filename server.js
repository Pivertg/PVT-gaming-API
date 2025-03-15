const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); // Active CORS pour éviter les erreurs de requête
app.use(express.json());

// Utilise une variable d'environnement pour la clé API (important pour la sécurité)
const API_KEY = process.env.API_KEY;

// Route d'accueil
app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur PVT-Gaming API !');
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

        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: 'Erreur lors de la récupération des infos du joueur',
            error: error.response?.data || error.message
        });
    }
});

module.exports = app; // Exporte l'application pour Vercel
