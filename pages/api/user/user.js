/**
 * @swagger
 * /api/user/user:
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
  const { username } = req.body;

  if (!username) {
    res.status(400).json({ message: "No username provided" });
  } else {
    res.status(200).json({ message: `Hello, ${username}` });
  }
}
