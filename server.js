const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔥 Configuration CORS pour autoriser les requêtes depuis ton site
const corsOptions = {
    origin: ["https://pivertg.github.io"], // Autorise uniquement ton site
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization"
};
app.use(cors(corsOptions));
app.use(express.json());

// ✅ Message d'accueil
app.get("/", (req, res) => {
    res.send("🚀 API PVT Gaming est en ligne !");
});

// 🎮 Base de données fictive (remplace par une vraie DB si besoin)
let joueurs = [
    { id: 1, pseudo: "Joueur1", idBrawlStars: "1234", trophies: 5000, roster: "1" },
    { id: 2, pseudo: "Joueur2", idBrawlStars: "5678", trophies: 6000, roster: "1" },
    { id: 3, pseudo: "Joueur3", idBrawlStars: "9101", trophies: 4500, roster: "1" },
    { id: 4, pseudo: "Joueur4", idBrawlStars: "1121", trophies: 5200, roster: "2" },
    { id: 5, pseudo: "Joueur5", idBrawlStars: "3141", trophies: 4900, roster: "2" },
    { id: 6, pseudo: "Joueur6", idBrawlStars: "5161", trophies: 4700, roster: "2" },
    { id: 7, pseudo: "Joueur7", idBrawlStars: "7181", trophies: 5500, roster: "3" },
    { id: 8, pseudo: "Joueur8", idBrawlStars: "9202", trophies: 6100, roster: "3" },
    { id: 9, pseudo: "Joueur9", idBrawlStars: "1021", trophies: 5800, roster: "3" },
];

// 🟢 Récupérer tous les joueurs
app.get("/api/joueurs", (req, res) => {
    res.json(joueurs);
});

// 🟢 Récupérer un joueur par ID
app.get("/api/joueurs/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const joueur = joueurs.find(j => j.id === id);
    if (!joueur) {
        return res.status(404).json({ message: "Joueur non trouvé !" });
    }
    res.json(joueur);
});

// 🟢 Récupérer les joueurs par roster
app.get("/api/rosters/:rosterId", (req, res) => {
    const rosterId = req.params.rosterId;
    const joueursRoster = joueurs.filter(j => j.roster === rosterId);
    res.json(joueursRoster);
});

// 🟠 Modifier un joueur
app.put("/api/joueurs/:id", (req, res) => {
    const joueurId = parseInt(req.params.id);
    const { pseudo, idBrawlStars, trophies, roster } = req.body;
    
    let joueur = joueurs.find(j => j.id === joueurId);
    if (!joueur) {
        return res.status(404).json({ message: "Joueur non trouvé !" });
    }

    joueur.pseudo = pseudo || joueur.pseudo;
    joueur.idBrawlStars = idBrawlStars || joueur.idBrawlStars;
    joueur.trophies = trophies || joueur.trophies;
    joueur.roster = roster || joueur.roster;

    res.json({ message: "Joueur mis à jour !", joueur });
});

// 🔴 Supprimer un joueur
app.delete("/api/joueurs/:id", (req, res) => {
    const joueurId = parseInt(req.params.id);
    joueurs = joueurs.filter(j => j.id !== joueurId);
    res.json({ message: "Joueur supprimé !" });
});

// 🚀 Lancer le serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
