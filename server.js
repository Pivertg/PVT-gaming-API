// ✅ Correction API (Node.js / Express)
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database("database.db", (err) => {
    if (err) {
        console.error("❌ Erreur lors de l'ouverture de la base de données", err.message);
    } else {
        console.log("✅ Base de données SQLite connectée !");
    }
});

// Création des tables si elles n'existent pas
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS rosters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS joueurs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pseudo TEXT,
        trophies INTEGER,
        win3v3 INTEGER,
        classement TEXT,
        rangMax INTEGER,
        rosterId INTEGER,
        FOREIGN KEY (rosterId) REFERENCES rosters(id) ON DELETE CASCADE
    )`);
});

// 🔹 Route de test API
app.get("/api/ping", (req, res) => res.json({ message: "API en ligne !" }));

// 🔹 Récupérer tous les rosters
app.get("/api/rosters", (req, res) => {
    db.all(`SELECT * FROM rosters`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// 🔹 Ajouter un roster
app.post("/api/rosters", (req, res) => {
    const { nom } = req.body;
    if (!nom) return res.status(400).json({ error: "Le nom est requis" });

    db.run(`INSERT INTO rosters (nom) VALUES (?)`, [nom], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, nom });
    });
});

// 🔹 Récupérer les joueurs d'un roster
app.get("/api/rosters/:id/joueurs", (req, res) => {
    const { id } = req.params;
    db.all(`SELECT * FROM joueurs WHERE rosterId = ?`, [id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// 🔹 Ajouter un joueur
app.post("/api/rosters/:id/joueurs", (req, res) => {
    const { pseudo, trophies, win3v3, classement, rangMax } = req.body;
    const { id } = req.params;
    if (!pseudo || !trophies) return res.status(400).json({ error: "Champs requis" });

    db.run(
        `INSERT INTO joueurs (pseudo, trophies, win3v3, classement, rangMax, rosterId) VALUES (?, ?, ?, ?, ?, ?)`,
        [pseudo, trophies, win3v3, classement, rangMax, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, pseudo, trophies, win3v3, classement, rangMax, rosterId: id });
        }
    );
});

// Lancement du serveur
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));
