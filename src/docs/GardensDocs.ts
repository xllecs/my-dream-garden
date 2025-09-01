/**
 * @swagger
 * /gardens/view:
 *   get:
 *     description: Lists a specific garden that belongs to the logged in user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gardenId
 *             properties:
 *               gardenId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Garden fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 gardenId:
 *                   type: string
 *       400:
 *         description: Missing gardenId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "gardenId not provided"
 *       401:
 *         description: User is not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Forbidden"
 *       404:
 *         description: Garden not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "garden not found"
 */

/**
 * @swagger
 * /gardens/list:
 *   get:
 *     description: Lists gardens that belong to the logged in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Gardens fetched successfully
 *       401:
 *         description: User is not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Forbidden"
 *       404:
 *         description: User does not have any gardens
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "user doesn't have any gardens"
 */

/**
 * @swagger
 * /gardens/create:
 *   post:
 *     description: Creates a garden for the logged in user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gardenName
 *               - totalSurfaceArea
 *               - locationDescription
 *             properties:
 *               gardenName:
 *                 type: string
 *               totalSurfaceArea:
 *                 type: number
 *               locationDescription:
 *                 type: string
 *               targetHumidityLevel:
 *                 type: number
 *     responses:
 *       201:
 *         description: Garden created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 gardenName:
 *                   type: string
 *                 totalSurfaceArea:
 *                   type: number
 *                 locationDescription:
 *                   type: string
 *                 targetHumidityLevel:
 *                   type: number
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             examples:
 *               missingFields:
 *                 summary: Missing fields
 *                 value:
 *                   error: "the following credentials were not provided: gardenName, totalSurfaceArea, locationDescription"
 *               outOfBoundsHumidity:
 *                 summary: Humidity out of bounds
 *                 value:
 *                   error: "your humidity (101) is out of bounds (0-100)"
 *       401:
 *         description: User is not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Forbidden"
 */

/**
 * @swagger
 * /gardens/update:
 *   post:
 *     description: Updates a garden that belongs to the logged in user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gardenName:
 *                 type: string
 *               totalSurfaceArea:
 *                 type: number
 *               locationDescription:
 *                 type: string
 *               targetHumidityLevel:
 *                 type: number
 *     responses:
 *       200:
 *         description: Garden updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 gardenName:
 *                   type: string
 *                 totalSurfaceArea:
 *                   type: number
 *                 locationDescription:
 *                   type: string
 *                 targetHumidityLevel:
 *                   type: number
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             examples:
 *               missingGardenId:
 *                 summary: Missing gardenId
 *                 value:
 *                   error: "gardenId not provided"
 *               outOfBoundsHumidity:
 *                 summary: Humidity out of bounds
 *                 value:
 *                   error: "your humidity (101) is out of bounds (0-100)"
 *       401:
 *         description: User is not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             examples:
 *               forbidden:
 *                 summary: Forbidden
 *                 value:
 *                   error: "Forbidden"
 *               notOwnedGarden:
 *                 summary: Garden is not owned by current user
 *                 value:
 *                   error: "you cannot update this garden as it does not belong to you"
 *       404:
 *         description: Garden not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "garden not found"
 */

/**
 * @swagger
 * /gardens/delete:
 *   post:
 *     description: Deletes a garden that belongs to the logged in user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gardenId
 *             properties:
 *               gardenId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Garden deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 gardenName:
 *                   type: string
 *                 totalSurfaceArea:
 *                   type: number
 *                 locationDescription:
 *                   type: string
 *                 targetHumidityLevel:
 *                   type: number
 *       400:
 *         description: Missing gardenId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "gardenId not provided"
 *       401:
 *         description: User is not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             examples:
 *               forbidden:
 *                 summary: Forbidden
 *                 value:
 *                   error: "Forbidden"
 *               notOwnedGarden:
 *                 summary: Garden not owned
 *                 value:
 *                   error: "you cannot delete this garden as it does not belong to you"
 *       404:
 *         description: Garden not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "garden not found"
 */
