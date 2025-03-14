const express = require('express');
const app = express();
const port = 3000;

// Route API de base
app.get('/api', (req, res) => {
    res.json({ message: 'Bienvenue sur l\'API PVT-gaming!' });
});

// Démarre le serveur
app.listen(port, () => {
    console.log(`Serveur écoutant sur http://localhost:${port}`);
});
