export default async function handler(req, res) {
  const response = await fetch('https://api.brawlstars.com/v1/players/%23playerID', {
    headers: {
      "Authorization": `Bearer YOUR_API_KEY`
    }
  });

  if (!response.ok) {
    return res.status(500).json({ error: "Erreur lors de l'appel API" });
  }

  const data = await response.json();
  res.status(200).json(data);
}
