/**
 * @swagger
 * /metrics/view:
 *   post:
 *     description: Lists realtime metrics for a given plant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plantId
 *             properties:
 *               plantId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Metrics for the given plant fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plantId:
 *                   type: string
 *                 lastIrrigationStartTime:
 *                   type: string
 *                 lastIrrigationEndTime:
 *                   type: string
 *                 currentHumidityLevel:
 *                   type: number
 *       400:
 *         description: Missing plantId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "plantId not provided"
 *       404:
 *         description: Metrics are not yet available
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "metrics not yet available"
 */
