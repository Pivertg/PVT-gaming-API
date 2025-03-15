const express = require('express');
const app = express();
const port = 5000;

// Route de base pour la page d'accueil
app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur PVT-gaming API !');
});

// Route API
app.get('/api', (req, res) => {
    res.json({ message: 'Bienvenue sur l\'API PVT-gaming!' });
});

// Lancement du serveur
app.listen(port, () => {
    console.log(`Serveur en ligne sur http://localhost:${port}`);
});
