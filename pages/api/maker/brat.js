import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { text } = req.query;
  if (!text) return res.status(400).json({ error: 'Parameter "text" diperlukan' });

  try {
    const url = `https://mxmxk-helper.hf.space/brat?text=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error();

    const arrayBuffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'image/png');
    return res.status(200).end(Buffer.from(arrayBuffer));
  } catch {
    const fallbackUrl = `https://api.ryzendesu.vip/api/sticker/brat?text=${encodeURIComponent(text)}`;
    const fallbackResponse = await fetch(fallbackUrl);
    if (!fallbackResponse.ok) return res.status(500).json({ error: 'Kedua API gagal' });

    const fallbackArrayBuffer = await fallbackResponse.arrayBuffer();
    res.setHeader('Content-Type', 'image/png');
    return res.status(200).end(Buffer.from(fallbackArrayBuffer));
  }
}
