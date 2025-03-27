// ✅ API avec stockage en JSON
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

const DATA_FILE = path.join(__dirname, "data.json");

// 🔹 Lire les données depuis data.json
function lireDonnees() {
    if (!fs.existsSync(DATA_FILE)) return { rosters: [] };
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

// 🔹 Sauvegarder les données dans data.json
function sauvegarderDonnees(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// 🔹 Récupérer tous les rosters
app.get("/api/rosters", (req, res) => {
    const data = lireDonnees();
    res.json(data.rosters);
});

// 🔹 Ajouter un roster
app.post("/api/rosters", (req, res) => {
    const { nom } = req.body;
    if (!nom) return res.status(400).json({ error: "Le nom est requis" });

    const data = lireDonnees();
    const newRoster = { id: Date.now(), nom, joueurs: [] };
    data.rosters.push(newRoster);
    sauvegarderDonnees(data);
    res.json(newRoster);
});

// 🔹 Ajouter un joueur à un roster
app.post("/api/rosters/:id/joueurs", (req, res) => {
    const { pseudo, trophies, win3v3, classement, rangMax } = req.body;
    const { id } = req.params;

    const data = lireDonnees();
    const roster = data.rosters.find(r => r.id == id);
    if (!roster) return res.status(404).json({ error: "Roster non trouvé" });

    const newJoueur = { id: Date.now(), pseudo, trophies, win3v3, classement, rangMax };
    roster.joueurs.push(newJoueur);
    sauvegarderDonnees(data);
    res.json(newJoueur);
});

// 🔹 Récupérer les joueurs d'un roster
app.get("/api/rosters/:id/joueurs", (req, res) => {
    const { id } = req.params;
    const data = lireDonnees();
    const roster = data.rosters.find(r => r.id == id);
    if (!roster) return res.status(404).json({ error: "Roster non trouvé" });
    res.json(roster.joueurs);
});

// 🔹 Supprimer un joueur
app.delete("/api/rosters/:rosterId/joueurs/:joueurId", (req, res) => {
    const { rosterId, joueurId } = req.params;
    const data = lireDonnees();
    const roster = data.rosters.find(r => r.id == rosterId);
    if (!roster) return res.status(404).json({ error: "Roster non trouvé" });

    roster.joueurs = roster.joueurs.filter(j => j.id != joueurId);
    sauvegarderDonnees(data);
    res.json({ message: "Joueur supprimé" });
});

// 🔹 Supprimer un roster
app.delete("/api/rosters/:id", (req, res) => {
    const { id } = req.params;
    const data = lireDonnees();
    data.rosters = data.rosters.filter(r => r.id != id);
    sauvegarderDonnees(data);
    res.json({ message: "Roster supprimé" });
});

// Lancement du serveur
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));
