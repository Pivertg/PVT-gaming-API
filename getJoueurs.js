import { readFile } from "fs/promises";
import { join } from "path";

export default async function handler(req, res) {
    try {
        const filePath = join(process.cwd(), "api/joueurs.json");
        const data = await readFile(filePath, "utf-8");
        res.status(200).json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des joueurs." });
    }
}
