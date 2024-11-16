/**
 * @swagger
 * /api/info/hari-libur:
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
import * as cheerio from "cheerio";
async function HariLibur() {
  try {
    const response = await fetch("https://www.liburnasional.com/");
    const html = await response.text();
    const $ = cheerio.load(html);
    const nextLibur = $("div.row.row-alert > div")
      .text()
      .split("Hari libur")[1]
      .trim();
    const libnas_content = $("tbody > tr > td > span > div")
      .map((index, element) => {
        const summary = $(element).find("span > strong > a").text();
        const days = $(element)
          .find("div.libnas-calendar-holiday-weekday")
          .text();
        const dateMonth = $(element)
          .find("time.libnas-calendar-holiday-datemonth")
          .text();
        return {
          summary: summary,
          days: days,
          dateMonth: dateMonth,
        };
      })
      .get();
    return {
      nextLibur: nextLibur,
      libnas_content: libnas_content,
    };
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
    throw error;
  }
}
export default async function handler(req, res) {
  const result = await HariLibur();
  return res.status(200).json(typeof result === "object" ? result : result);
}
