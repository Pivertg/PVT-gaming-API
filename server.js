const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

let rosters = [
    { id: 1, nom: "Roster 1", joueurs: [] },
    { id: 2, nom: "Roster 2", joueurs: [] },
    { id: 3, nom: "Roster 3", joueurs: [] },
    { id: 4, nom: "Roster 4", joueurs: [] },
    { id: 5, nom: "Roster 5", joueurs: [] },
    { id: 6, nom: "Roster 6", joueurs: [] },
    { id: 7, nom: "Roster 7", joueurs: [] }
];

let joueurs = [
    { id: 1, pseudo: "Joueur A", idBrawlStars: "123", trophies: 500, roster: 1, win3v3: 30, classer: "Or", rangMax: 15 },
    { id: 2, pseudo: "Joueur B", idBrawlStars: "456", trophies: 300, roster: 1, win3v3: 20, classer: "Bronze", rangMax: 10 },
    { id: 3, pseudo: "Joueur C", idBrawlStars: "789", trophies: 450, roster: 1, win3v3: 50, classer: "Platine", rangMax: 20 },
    { id: 4, pseudo: "Joueur D", idBrawlStars: "234", trophies: 700, roster: 2, win3v3: 60, classer: "Diamant", rangMax: 22 },
    { id: 5, pseudo: "Joueur E", idBrawlStars: "567", trophies: 600, roster: 2, win3v3: 40, classer: "Or", rangMax: 18 },
    { id: 6, pseudo: "Joueur F", idBrawlStars: "890", trophies: 650, roster: 2, win3v3: 35, classer: "Argent", rangMax: 12 },
    { id: 7, pseudo: "Joueur G", idBrawlStars: "345", trophies: 750, roster: 3, win3v3: 70, classer: "Diamant", rangMax: 25 },
    { id: 8, pseudo: "Joueur H", idBrawlStars: "678", trophies: 800, roster: 3, win3v3: 75, classer: "Champion", rangMax: 30 },
    { id: 9, pseudo: "Joueur I", idBrawlStars: "901", trophies: 850, roster: 3, win3v3: 80, classer: "Légende", rangMax: 35 },
    { id: 10, pseudo: "Joueur J", idBrawlStars: "112", trophies: 900, roster: 4, win3v3: 90, classer: "Légende", rangMax: 40 },
    { id: 11, pseudo: "Joueur I", idBrawlStars: "901", trophies: 850, roster: 4, win3v3: 80, classer: "Légende", rangMax: 35 },
    { id: 12, pseudo: "Joueur I", idBrawlStars: "901", trophies: 850, roster: 4, win3v3: 80, classer: "Légende", rangMax: 35 },
    { id: 13, pseudo: "Joueur I", idBrawlStars: "901", trophies: 850, roster: 5, win3v3: 80, classer: "Légende", rangMax: 35 },
    { id: 14, pseudo: "Joueur I", idBrawlStars: "901", trophies: 850, roster: 5, win3v3: 80, classer: "Légende", rangMax: 35 },
    { id: 15, pseudo: "Joueur I", idBrawlStars: "901", trophies: 850, roster: 5, win3v3: 80, classer: "Légende", rangMax: 35 },
    { id: 16, pseudo: "Joueur I", idBrawlStars: "901", trophies: 850, roster: 6, win3v3: 80, classer: "Légende", rangMax: 35 },
    { id: 17, pseudo: "Joueur I", idBrawlStars: "901", trophies: 850, roster: 6, win3v3: 80, classer: "Légende", rangMax: 35 },
    { id: 18, pseudo: "Joueur I", idBrawlStars: "901", trophies: 850, roster: 6, win3v3: 80, classer: "Légende", rangMax: 35 }

];

// 🟢 Récupérer tous les rosters
app.get("/api/rosters", (req, res) => {
    res.json(rosters);
});

// 🟢 Récupérer un roster avec ses joueurs
app.get("/api/rosters/:rosterId", (req, res) => {
    const rosterId = parseInt(req.params.rosterId);
    const roster = rosters.find(r => r.id === rosterId);
    if (!roster) return res.status(404).json({ message: "Roster non trouvé" });

    const joueursFiltrés = joueurs.filter(j => j.roster === rosterId);
    
    res.json({ id: roster.id, nom: roster.nom, joueurs: joueursFiltrés });
});

// 🟢 Ajouter un roster
app.post("/api/rosters", (req, res) => {
    const { nom } = req.body;
    if (!nom) return res.status(400).json({ message: "Le nom du roster est obligatoire !" });

    const newRoster = { id: rosters.length + 1, nom, joueurs: [] };
    rosters.push(newRoster);
    res.status(201).json(newRoster);
});

// 🟢 Ajouter un joueur à un roster
app.post("/api/rosters/:rosterId/joueurs", (req, res) => {
    const rosterId = parseInt(req.params.rosterId);
    const { pseudo, idBrawlStars, trophies, win3v3, classer, rangMax } = req.body;
    
    if (!pseudo || !idBrawlStars || !trophies || !win3v3 || !classer || !rangMax) {
        return res.status(400).json({ message: "Tous les champs sont obligatoires !" });
    }

    const newJoueur = { id: joueurs.length + 1, pseudo, idBrawlStars, trophies, roster: rosterId, win3v3, classer, rangMax };
    joueurs.push(newJoueur);
    res.status(201).json(newJoueur);
});

// 🔴 Supprimer un joueur d'un roster
app.delete("/api/rosters/:rosterId/joueurs/:joueurId", (req, res) => {
    const joueurId = parseInt(req.params.joueurId);
    joueurs = joueurs.filter(j => j.id !== joueurId);
    res.json({ message: "Joueur supprimé !" });
});

// 🔴 Supprimer un roster
app.delete("/api/rosters/:rosterId", (req, res) => {
    const rosterId = parseInt(req.params.rosterId);
    rosters = rosters.filter(r => r.id !== rosterId);
    joueurs = joueurs.filter(j => j.roster !== rosterId); // Supprimer aussi les joueurs du roster
    res.json({ message: "Roster supprimé !" });
});

// 🚀 Lancement du serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
