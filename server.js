const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔥 Active CORS pour toutes les origines
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// 🚀 Test API pour voir si elle fonctionne
app.get("/", (req, res) => {
    res.send("🚀 API PVT Gaming fonctionne !");
});

// 🟢 Route pour récupérer tous les rosters
app.get("/api/rosters", (req, res) => {
    const rosters = [
        { id: 1, nom: "Roster 1" },
        { id: 2, nom: "Roster 2" },
        { id: 3, nom: "Roster 3" }
    ];
    res.json(rosters);
});

// 🟢 Route pour récupérer les joueurs d’un roster
app.get("/api/rosters/:rosterId", (req, res) => {
    const rosterId = parseInt(req.params.rosterId);
    const joueurs = [
        { id: 1, pseudo: "Joueur A", roster: 1 },
        { id: 2, pseudo: "Joueur B", roster: 1 },
        { id: 3, pseudo: "Joueur C", roster: 2 },
        { id: 4, pseudo: "Joueur D", roster: 2 },
        { id: 5, pseudo: "Joueur E", roster: 3 },
        { id: 6, pseudo: "Joueur F", roster: 3 }
    ];
    const joueursFiltrés = joueurs.filter(j => j.roster === rosterId);
    res.json(joueursFiltrés);
});

// 🚀 Lancement 
