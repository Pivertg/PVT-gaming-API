const express = require('express');
const app = express();

// Route principale
app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur PVT-gaming API !');
});

// Route API
app.get('/api', (req, res) => {
    res.json({ message: 'Bienvenue sur l\'API PVT-gaming!' });
});

// Export pour Vercel
module.exports = app;

