/**
 * @swagger
 * /api/info/cuaca:
 *   get:
 *     summary: Get API status
 *     description: Returns the status of the API.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 */

import fetch from "node-fetch";
const latLonToTile = (lat, lon, zoom) => {
  const x = Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) *
      Math.pow(2, zoom),
  );
  return `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`;
};
const weather = async (text) => {
  try {
    const weatherParams = new URLSearchParams({
      key: "897dba35c1d94f4cbea134758220207",
      q: text,
    });
    const weatherUrl = `https://api.weatherapi.com/v1/current.json?${weatherParams.toString()}`;
    const response = await fetch(weatherUrl);
    const res = await response.json();
    if (res.error) throw res.error.message;
    const {
      location: { name, region, country, lat, lon, tz_id, localtime } = {},
      current: {
        last_updated,
        temp_c,
        temp_f,
        is_day,
        wind_mph,
        wind_kph,
        wind_dir,
        pressure_mb,
        pressure_in,
        precip_mm,
        precip_in,
        humidity,
        cloud,
        feelslike_c,
        feelslike_f,
        vis_km,
        vis_miles,
        uv,
        gust_mph,
        gust_kph,
        condition,
      } = {},
    } = res;
    const iconUrl = condition?.icon
      ? /^https?:/.test(condition.icon)
        ? condition.icon
        : `https:${condition.icon}`
      : condition.icon;
    const tileUrl = latLonToTile(lat, lon, 12);
    const caption = `
🌦️ *Cuaca saat ini: ${condition?.text ?? ""}* 🌦️

📌 *Nama:* ${name ?? ""}
🗺️ *Region:* ${region ?? ""}
🌍 *Negara:* ${country ?? ""}
🌐 *Lintang:* ${lat ?? ""}
🌐 *Bujur:* ${lon ?? ""}
🕰️ *Zona Waktu:* ${tz_id ?? ""}
🕰️ *Waktu Lokal:* ${localtime ?? ""}

📅 *Terakhir Diperbarui:* ${last_updated ?? ""}
🌡️ *Suhu (C):* ${temp_c ?? ""}
🌡️ *Suhu (F):* ${temp_f ?? ""}
☀️ *Hari:* ${is_day ? "Ya" : "Tidak"}
🌬️ *Kecepatan Angin (mph):* ${wind_mph ?? ""}
🌬️ *Kecepatan Angin (kph):* ${wind_kph ?? ""}
🧭 *Arah Angin:* ${wind_dir ?? ""}
🌡️ *Tekanan (mb):* ${pressure_mb ?? ""}
🌡️ *Tekanan (in):* ${pressure_in ?? ""}
💧 *Curah Hujan (mm):* ${precip_mm ?? ""}
💧 *Curah Hujan (in):* ${precip_in ?? ""}
💦 *Kelembaban:* ${humidity ?? ""}
☁️ *Awan:* ${cloud ?? ""}
🌡️ *Terasa Seperti (C):* ${feelslike_c ?? ""}
🌡️ *Terasa Seperti (F):* ${feelslike_f ?? ""}
👁️ *Jarak Pandang (km):* ${vis_km ?? ""}
👁️ *Jarak Pandang (mil):* ${vis_miles ?? ""}
☀️ *UV:* ${uv ?? ""}
💨 *Gust (mph):* ${gust_mph ?? ""}
💨 *Gust (kph):* ${gust_kph ?? ""}
`.trim();
    return {
      caption: caption,
      iconUrl: iconUrl,
      tileUrl: tileUrl,
    };
  } catch (e) {
    throw e;
  }
};
export default async function handler(req, res) {
  const { kota } = req.query;

  if (!kota) return res.status(400).json({ message: "No kota provided" });

  const result = await weather(kota);
  return res.status(200).json(typeof result === "object" ? result : result);
}
