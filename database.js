const sqlite3 = require("sqlite3").verbose();

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

module.exports = db;
