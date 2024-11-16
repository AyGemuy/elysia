/**
 * @swagger
 * /api/general/hello:
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
  res.status(200).json({ message: "Hello, world!" });
}
