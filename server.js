const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔥 Configuration correcte de CORS
const corsOptions = {
    origin: "*", // Met "*" pour autoriser tout ou "https://pivertg.github.io" uniquement
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization"
};
app.use(cors(corsOptions));
app.use(express.json());

// 🚀 ROUTES
app.get("/", (req, res) => {
    res.send("🚀 API PVT Gaming est en ligne !");
});

// 🟢 Récupérer tous les rosters
app.get("/api/rosters", (req, res) => {
    const rosters = [
        { id: 1, nom: "Roster 1" },
        { id: 2, nom: "Roster 2" },
        { id: 3, nom: "Roster 3" }
    ];
    res.json(rosters);
});

// 🟢 Récupérer les joueurs par roster
app.get("/api/rosters/:rosterId", (req, res) => {
    const rosterId = req.params.rosterId;
    const joueursRoster = joueurs.filter(j => j.roster === rosterId);
    res.json(joueursRoster);
});

// 🚀 Lancer le serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
