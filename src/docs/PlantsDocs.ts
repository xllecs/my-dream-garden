/**
 * @swagger
 * /plants/view:
 *   get:
 *     description: Lists a plant of a garden that belongs to the logged in user
 *     security:
 *       - bearerAuth: []
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
 *         description: Plant fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - plantId
 *               properties:
 *                 plantId:
 *                   type: string
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
 *         description: Plant was not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "plant not found"
 */

/**
 * @swagger
 * /plants/list:
 *   get:
 *     description: Lists plants of a garden that belongs to the logged in user
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
 *         description: Plants fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - gardenId
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
 *         description: Garden was not found
 *         content:
 *           application/json:
 *             examples:
 *               gardenNotFound:
 *                 summary: Garden not found
 *                 value:
 *                   error: "garden not found"
 *               noPlantsInGarden:
 *                 summary: Requested garden doesn't have any plants
 *                 value:
 *                   error: "garden doesn't have any plants"
 */

/**
 * @swagger
 * /plants/create:
 *   post:
 *     description: Creates a plant in a garden that belongs to the logged in user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plantName
 *               - species
 *               - plantType
 *               - plantationDate
 *               - surfaceAreaRequired
 *               - idealHumidityLevel
 *               - gardenId
 *             properties:
 *               plantName:
 *                 type: string
 *               species:
 *                 type: string
 *               plantType:
 *                 type: string
 *               plantationDate:
 *                 type: string
 *               surfaceAreaRequired:
 *                 type: number
 *               idealHumidityLevel:
 *                 type: number
 *               gardenId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Plant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - plantName
 *                 - species
 *                 - plantType
 *                 - plantationDate
 *                 - surfaceAreaRequired
 *                 - idealHumidityLevel
 *                 - gardenId
 *               properties:
 *                 plantName:
 *                   type: string
 *                 species:
 *                   type: string
 *                 plantType:
 *                   type: string
 *                 plantationDate:
 *                   type: string
 *                 surfaceAreaRequired:
 *                   type: number
 *                 idealHumidityLevel:
 *                   type: number
 *                 gardenId:
 *                   type: string
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             examples:
 *               missingFields:
 *                 summary: Missing fields
 *                 value:
 *                   error: "the following fields were not provided: plantName, species, plantType, plantationDate, surfaceAreaRequired, idealHumidityLevel, gardenId"
 *               exceededSurface:
 *                 summary: Garden's surface exceeded
 *                 value:
 *                   error: "garden's surface (0 m2) exceeded. space occupied so far: 0 m2` })"
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
 *         description: Garden was not found
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
 * /plants/update:
 *   post:
 *     description: Updates a plant in a garden that belongs to the logged in user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plantName:
 *                 type: string
 *               species:
 *                 type: string
 *               plantType:
 *                 type: string
 *               plantationDate:
 *                 type: string
 *               surfaceAreaRequired:
 *                 type: number
 *               idealHumidityLevel:
 *                 type: number
 *               gardenId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Plant updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plantName:
 *                   type: string
 *                 species:
 *                   type: string
 *                 plantType:
 *                   type: string
 *                 plantationDate:
 *                   type: string
 *                 surfaceAreaRequired:
 *                   type: number
 *                 idealHumidityLevel:
 *                   type: number
 *                 gardenId:
 *                   type: string
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             examples:
 *               missingGardenId:
 *                 summary: Missing gardenId
 *                 value:
 *                   error: "gardenId not provided"
 *               exceededSurface:
 *                 summary: Garden's surface exceeded
 *                 value:
 *                   error: "garden's surface (0 m2) exceeded. space occupied so far: 0 m2"
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
 *               notOwnedPlant:
 *                 summary: Plant is not owned by current user
 *                 value:
 *                   error: "this is not your plant"
 *       404:
 *         description: Plant was not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "plant not found"
 */

/**
 * @swagger
 * /plants/delete:
 *   post:
 *     description: Deletes a plant in a garden that belongs to the logged in user
 *     security:
 *       - bearerAuth: []
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
 *         description: Plant deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plantName:
 *                   type: string
 *                 species:
 *                   type: string
 *                 plantType:
 *                   type: string
 *                 plantationDate:
 *                   type: string
 *                 surfaceAreaRequired:
 *                   type: number
 *                 idealHumidityLevel:
 *                   type: number
 *                 gardenId:
 *                   type: string
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             examples:
 *               missingPlantId:
 *                 summary: Missing plantId
 *                 value:
 *                   error: "plantId not provided"
 *               exceededSurface:
 *                 summary: Garden's surface exceeded
 *                 value:
 *                   error: "garden's surface (0 m2) exceeded. space occupied so far: 0 m2"
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
 *               notOwnedPlant:
 *                 summary: Plant is not owned by current user
 *                 value:
 *                   error: "this is not your plant"
 *       404:
 *         description: Plant was not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "plant not found"
 */
