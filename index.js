import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

app.get("/v1/api/:mangaId/:chapterId/:imageId", async (req, res) => {
  const { mangaId, chapterId, imageId } = req.params;

  try {
    const response = await fetch(
      `https://storage.shngm.id/chapter/manga_${mangaId}/chapter_${chapterId}/${imageId}`,
      {
        credentials: "omit",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.5",
          "Sec-GPC": "1",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "cross-site",
        },
        referrer: "https://app.shinigami.asia/",
        method: "GET",
        mode: "cors",
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "Gambar tidak ditemukan" });
    }

    const blob = await response.blob();
    res.set("Content-Type", blob.type);
    res.send(Buffer.from(await blob.arrayBuffer()));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil gambar" });
  }
});

module.exports = app
