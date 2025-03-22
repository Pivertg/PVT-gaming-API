const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(express.json());
app.use(cors()); // Autoriser les requêtes CORS

// Connexion à SQLite (créera un fichier "database.db" si inexistant)
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
        FOREIGN KEY (rosterId) REFERENCES rosters(id)
    )`);
});

// 🔹 Récupérer tous les rosters
app.get("/api/rosters", (req, res) => {
    db.all(`SELECT * FROM rosters`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// 🔹 Ajouter un roster
app.post("/api/rosters", (req, res) => {
    const { nom } = req.body;
    db.run(`INSERT INTO rosters (nom) VALUES (?)`, [nom], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ id: this.lastID, nom });
        }
    });
});

// 🔹 Modifier un roster
app.put("/api/rosters/:id", (req, res) => {
    const { nom } = req.body;
    const { id } = req.params;
    db.run(`UPDATE rosters SET nom = ? WHERE id = ?`, [nom, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: "Roster mis à jour" });
        }
    });
});

// 🔹 Supprimer un roster
app.delete("/api/rosters/:id", (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM rosters WHERE id = ?`, [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: "Roster supprimé" });
        }
    });
});

// 🔹 Récupérer les joueurs d'un roster
app.get("/api/rosters/:id/joueurs", (req, res) => {
    const { id } = req.params;
    db.all(`SELECT * FROM joueurs WHERE rosterId = ?`, [id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// 🔹 Ajouter un joueur à un roster
app.post("/api/rosters/:id/joueurs", (req, res) => {
    const { pseudo, trophies, win3v3, classement, rangMax } = req.body;
    const { id } = req.params;

    db.run(
        `INSERT INTO joueurs (pseudo, trophies, win3v3, classement, rangMax, rosterId) VALUES (?, ?, ?, ?, ?, ?)`,
        [pseudo, trophies, win3v3, classement, rangMax, id],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ id: this.lastID, pseudo, trophies, win3v3, classement, rangMax, rosterId: id });
            }
        }
    );
});

// 🔹 Modifier un joueur
app.put("/api/rosters/:rosterId/joueurs/:joueurId", (req, res) => {
    const { rosterId, joueurId } = req.params;
    const { pseudo, trophies, win3v3, classement, rangMax } = req.body;

    db.run(
        `UPDATE joueurs SET pseudo = ?, trophies = ?, win3v3 = ?, classement = ?, rangMax = ? WHERE id = ? AND rosterId = ?`,
        [pseudo, trophies, win3v3, classement, rangMax, joueurId, rosterId],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ message: "Joueur mis à jour" });
            }
        }
    );
});

// 🔹 Supprimer un joueur
app.delete("/api/rosters/:rosterId/joueurs/:joueurId", (req, res) => {
    const { rosterId, joueurId } = req.params;
    db.run(`DELETE FROM joueurs WHERE id = ? AND rosterId = ?`, [joueurId, rosterId], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: "Joueur supprimé" });
        }
    });
});

// Lancement du serveur
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));
