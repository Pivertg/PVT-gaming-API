const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Route principale
app.get("/", (req, res) => {
    res.send("🚀 API PVT Gaming est en ligne !");
});

// Base de données fictive (remplace par une vraie DB si besoin)
let joueurs = [
    { id: 1, pseudo: "Joueur1", idBrawlStars: "1234", trophies: 5000, roster: "1" },
    { id: 2, pseudo: "Joueur2", idBrawlStars: "5678", trophies: 6000, roster: "1" },
    { id: 3, pseudo: "Joueur3", idBrawlStars: "1111", trophies: 4500, roster: "2" },
    { id: 4, pseudo: "Joueur4", idBrawlStars: "2222", trophies: 4800, roster: "2" },
    { id: 5, pseudo: "Joueur5", idBrawlStars: "3333", trophies: 5100, roster: "3" },
    { id: 6, pseudo: "Joueur6", idBrawlStars: "4444", trophies: 5300, roster: "3" },
    { id: 7, pseudo: "Joueur7", idBrawlStars: "5555", trophies: 5500, roster: "4" }
];

// Route pour récupérer tous les joueurs classés par roster (3 max par roster)
app.get("/api/rosters", (req, res) => {
    const rosters = {};

    joueurs.forEach(joueur => {
        if (!rosters[joueur.roster]) {
            rosters[joueur.roster] = [];
        }
        if (rosters[joueur.roster].length < 3) { // Limite à 3 joueurs par roster
            rosters[joueur.roster].push(joueur);
        }
    });

    res.json(rosters);
});

// Route pour mettre à jour un joueur
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

// Route pour supprimer un joueur
app.delete("/api/joueurs/:id", (req, res) => {
    const joueurId = parseInt(req.params.id);
    joueurs = joueurs.filter(j => j.id !== joueurId);

    res.json({ message: "Joueur supprimé !" });
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
