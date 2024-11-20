// pages/api/some.js

import fetch from "node-fetch";

const baseApiUrl = "https://some-random-api.com";

export default async function handler(req, res) {
  const { type, query, ...params } = req.query;

  if (!type || !query) {
    return res.status(400).json({ error: "Parameter 'type' dan 'query' wajib diisi" });
  }

  // Tentukan endpoint berdasarkan tipe dan query yang diberikan
  let endpoint = '';

  // Penanganan untuk berbagai kategori API
  switch (type) {
    case 'animal':
      const validAnimals = ['bird', 'cat', 'dog', 'fox', 'kangaroo', 'koala', 'panda', 'raccoon', 'red_panda'];
      if (validAnimals.includes(query)) {
        endpoint = `animal/${query}`;
      } else {
        return res.status(400).json({ error: "Jenis hewan tidak valid" });
      }
      break;

    case 'animu':
      const validAnimu = ['face-palm', 'hug', 'pat', 'quote', 'wink'];
      if (validAnimu.includes(query)) {
        endpoint = `animu/${query}`;
      } else {
        return res.status(400).json({ error: "Animasi tidak valid" });
      }
      break;

    case 'canvas':
      const validCanvasFilters = ['blue', 'blurple', 'blurple2', 'brightness', 'color', 'green', 'greyscale', 'invert', 'invertgreyscale', 'red', 'sepia', 'threshold'];
      const validCanvasMisc = ['bisexual', 'blur', 'circle', 'colorviewer', 'heart', 'hex', 'horny', 'its-so-stupid', 'jpg', 'lesbian', 'lgbt', 'lied', 'lolice', 'namecard', 'nobitches', 'nonbinary', 'oogway', 'oogway2', 'pansexual', 'pixelate', 'rgb', 'simpcard', 'spin', 'tonikawa', 'transgender', 'tweet', 'youtube-comment'];
      const validCanvasOverlays = ['comrade', 'gay', 'glass', 'jail', 'passed', 'triggered', 'wasted'];

      // Tentukan kategori canvas
      if (query.startsWith('filter/') && validCanvasFilters.includes(query.replace('filter/', ''))) {
        endpoint = `canvas/filter/${query.replace('filter/', '')}`;
      } else if (query.startsWith('misc/') && validCanvasMisc.includes(query.replace('misc/', ''))) {
        endpoint = `canvas/misc/${query.replace('misc/', '')}`;
      } else if (query.startsWith('overlay/') && validCanvasOverlays.includes(query.replace('overlay/', ''))) {
        endpoint = `canvas/overlay/${query.replace('overlay/', '')}`;
      } else {
        return res.status(400).json({ error: "Filter/misc/overlay canvas tidak valid" });
      }
      break;

    case 'facts':
      const validFacts = ['bird', 'cat', 'dog', 'fox', 'koala', 'panda'];
      if (validFacts.includes(query)) {
        endpoint = `facts/${query}`;
      } else {
        return res.status(400).json({ error: "Fakta tidak valid" });
      }
      break;

    case 'img':
      const validImgs = ['bird', 'cat', 'dog', 'fox', 'kangaroo', 'koala', 'panda', 'pikachu', 'raccoon', 'red_panda', 'whale'];
      if (validImgs.includes(query)) {
        endpoint = `img/${query}`;
      } else {
        return res.status(400).json({ error: "Gambar tidak valid" });
      }
      break;

    case 'others':
      const validOthers = ['base64', 'binary', 'bottoken', 'dictionary', 'joke', 'lyrics'];
      if (validOthers.includes(query)) {
        endpoint = `others/${query}`;
      } else {
        return res.status(400).json({ error: "Kategori lainnya tidak valid" });
      }
      break;

    case 'pokemon':
      const validPokemon = ['abilities', 'items', 'moves', 'pokedex'];
      if (validPokemon.includes(query)) {
        endpoint = `pokemon/${query}`;
      } else {
        return res.status(400).json({ error: "Kategori pokemon tidak valid" });
      }
      break;

    case 'welcome':
      endpoint = 'welcome';
      break;

    default:
      return res.status(400).json({ error: "Tipe tidak valid" });
  }

  // Buat query string dari parameter tambahan
  const queryString = new URLSearchParams(params).toString();
  const apiUrl = `${baseApiUrl}/${endpoint}${queryString ? `?${queryString}` : ""}`;

  try {
    const response = await fetch(apiUrl);
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      const jsonData = await response.json();
      return res.status(200).json(jsonData);
    }

    if (contentType?.includes("image")) {
      const buffer = await response.buffer();
      res.setHeader("Content-Type", contentType);
      return res.end(buffer);
    }

    return res.status(400).json({ error: "Unsupported content type" });
  } catch (error) {
    return res.status(500).json({ error: "Gagal mengambil data", details: error.message });
  }
}
