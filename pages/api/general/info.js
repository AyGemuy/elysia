/**
 * @swagger
 * /api/general/info:
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

export default function handler(req, res) {
  try {
    const stats = {
      platform: process.platform, // Platform OS (contoh: 'linux', 'darwin', 'win32')
      arch: process.arch, // Arsitektur sistem (contoh: 'x64')
      memoryUsage: process.memoryUsage(), // Penggunaan memori dalam objek (heapTotal, heapUsed, rss)
      uptime: process.uptime(), // Waktu uptime aplikasi dalam detik
      nodeVersion: process.version, // Versi Node.js
      framework: "Next.js", // Framework yang digunakan
    };

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch system statistics" });
  }
}
