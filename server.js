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
    { id: 1, pseudo: "Joueur1", idBrawlStars: "1234", trophies: 5000, roster: "Tank" },
    { id: 2, pseudo: "Joueur2", idBrawlStars: "5678", trophies: 6000, roster: "DPS" },
];

// 🟢 Route pour récupérer un seul joueur par ID
app.get("/api/joueurs/:id", (req, res) => { 
    const id = parseInt(req.params.id);
    const joueur = joueurs.find(j => j.id === id);

    if (!joueur) {
        return res.status(404).json({ message: "Joueur non trouvé !" });
    }

    res.json(joueur);
});
// pour récupéré tous le joueuer
app.get("/api/joueurs", (req, res) => { 
    res.json(joueurs); // Renvoie tous les joueurs
});


// 🟠 Route pour modifier un joueur
app.put("/api/joueurs/:id", (req, res) => {
    const joueurId = parseInt(req.params.id);
    const { pseudo, idBrawlStars, trophies, roster } = req.body;

    let joueur = joueurs.find(j => j.id === joueurId);
    if (!joueur) {
        return res.status(404).json({ message: "Joueur non trouvé !" });
    }

    // Mettre à jour les données du joueur
    joueur.pseudo = pseudo || joueur.pseudo;
    joueur.idBrawlStars = idBrawlStars || joueur.idBrawlStars;
    joueur.trophies = trophies || joueur.trophies;
    joueur.roster = roster || joueur.roster;

    res.json({ message: "Joueur mis à jour !", joueur });
});

// 🔴 Route pour supprimer un joueur
app.delete("/api/joueurs/:id", (req, res) => {
    const joueurId = parseInt(req.params.id);
    joueurs = joueurs.filter(j => j.id !== joueurId);

    res.json({ message: "Joueur supprimé !" });
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
