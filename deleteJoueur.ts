import { readFile, writeFile } from "fs/promises";
import { join } from "path";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Méthode non autorisée" });
    }

    try {
        const filePath = join(process.cwd(), "api/joueurs.json");
        const joueurs = JSON.parse(await readFile(filePath, "utf-8"));

        const { id } = req.body;
        const newJoueurs = joueurs.filter(joueur => joueur.id !== id);

        if (newJoueurs.length === joueurs.length) {
            return res.status(404).json({ error: "Joueur non trouvé" });
        }

        await writeFile(filePath, JSON.stringify(newJoueurs, null, 2));
        res.status(200).json({ message: "Joueur supprimé" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression du joueur." });
    }
}
