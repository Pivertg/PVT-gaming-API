const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour gérer CORS et JSON
app.use(cors({ origin: "*" })); // 🔥 Autorise toutes les requêtes (À sécuriser plus tard)
app.use(express.json());

// 📌 Route principale (Test rapide)
app.get("/", (req, res) => {
    res.send("🚀 API PVT Gaming est en ligne !");
});

// Base de données fictive (À remplacer par une vraie DB)
let joueurs = [
    { id: 1, pseudo: "Joueur1", idBrawlStars: "1234", trophies: 5000, roster: "Tank" },
    { id: 2, pseudo: "Joueur2", idBrawlStars: "5678", trophies: 6000, roster: "DPS" },
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
        return res.status(404).json({ message: "❌ Joueur non trouvé !" });
    }

    res.json(joueur);
});

// 🟠 Modifier un joueur
app.put("/api/joueurs/:id", (req, res) => {
    const joueurId = parseInt(req.params.id);
    const { pseudo, idBrawlStars, trophies, roster } = req.body;

    let joueur = joueurs.find(j => j.id === joueurId);
    if (!joueur) {
        return res.status(404).json({ message: "❌ Joueur non trouvé !" });
    }

    // Mise à jour des données
    joueur.pseudo = pseudo || joueur.pseudo;
    joueur.idBrawlStars = idBrawlStars || joueur.idBrawlStars;
    joueur.trophies = trophies || joueur.trophies;
    joueur.roster = roster || joueur.roster;

    res.json({ message: "✅ Joueur mis à jour !", joueur });
});

// 🔴 Supprimer un joueur
app.delete("/api/joueurs/:id", (req, res) => {
    const joueurId = parseInt(req.params.id);
    joueurs = joueurs.filter(j => j.id !== joueurId);

    res.json({ message: "🗑 Joueur supprimé !" });
});

// 🚀 Lancer le serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
