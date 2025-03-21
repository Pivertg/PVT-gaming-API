import { readFile, writeFile } from "fs/promises";
import { join } from "path";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Méthode non autorisée" });
    }

    try {
        const filePath = join(process.cwd(), "api/joueurs.json");
        const joueurs = JSON.parse(await readFile(filePath, "utf-8"));

        const { id, pseudo, idBrawlStars, trophies, roster } = req.body;
        const joueurIndex = joueurs.findIndex(j => j.id === id);

        if (joueurIndex === -1) {
            return res.status(404).json({ error: "Joueur non trouvé" });
        }

        joueurs[joueurIndex] = { id, pseudo, idBrawlStars, trophies, roster };
        await writeFile(filePath, JSON.stringify(joueurs, null, 2));

        res.status(200).json({ message: "Joueur mis à jour", joueur: joueurs[joueurIndex] });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour du joueur." });
    }
}
