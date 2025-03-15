const express = require('express');
const axios = require('axios');

const app = express();
const port = 5000;

// Remplace par ta clé API Brawl Stars
const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImRhNDBhYzg2LWJlNzAtNDEyYi1hNDg3LWEwZWVkY2Q3MzVhZiIsImlhdCI6MTc0MjAyNDIxMCwic3ViIjoiZGV2ZWxvcGVyL2NhMmI0N2FjLTFhZmItY2M4MS1lMzg5LWUzYTZlMDExMmYwNyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiOTIuMTQzLjEzMC41Il0sInR5cGUiOiJjbGllbnQifV19.w7Qc6vc2Qge4GSSH3b4OB-EPIdHiX-Nh89e__jtBDMolefld04nfMElEaL7pyare_IpiGPuITXYS-mOirCWJqg';

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
    console.log(`Serveur en ligne sur http://localhost:${port}`);
});
