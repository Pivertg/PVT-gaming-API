const axios = require('axios');

module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Méthode non autorisée' });
    }

    const { tag } = req.query;
    if (!tag) {
        return res.status(400).json({ error: 'Tag du joueur requis' });
    }

    const API_KEY = process.env.API_KEY; // Utiliser une variable d'environnement
    const joueurTag = tag.replace('#', '%23'); // Encodage du #

    try {
        const response = await axios.get(`https://api.brawlstars.com/v1/players/${joueurTag}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Accept': 'application/json'
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: 'Erreur lors de la récupération des infos du joueur',
            error: error.response?.data || error.message
        });
    }
};
