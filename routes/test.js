const express = require('express');
const router = express.Router();
const testController = require('../controlleurs/test.controlleur');

/**
 * @swagger
 * tags:
 *   name: Tests
 *   description: Routes liées à la gestion des tests
*/

/**
 * @swagger
 * /tests:
 *   get:
 *     summary: Récupérer tous les tests
 *     tags: [Tests]
 *     description: Récupère tous les tests disponibles.
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/tests', testController.getAllTests);

/**
 * @swagger
 * /tests/{testId}:
 *   get:
 *     summary: Récupérer un test par son ID
 *     tags: [Tests]
 *     description: Récupère un test en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: testId
 *         required: true
 *         description: ID du test à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Test not found
 */
router.get('/tests/:testId', testController.getTestById);

/**
 * @swagger
 * /tests:
 *   post:
 *     summary: Créer un nouveau test
 *     tags: [Tests]
 *     description: Crée un nouveau test avec les détails fournis.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 example: Mathématiques
 *                 description: Catégorie du test
 *               chapter:
 *                 type: string
 *                 example: Addition
 *                 description: Chapitre du test
 *     responses:
 *       201:
 *         description: Test créé avec succès
 *       404:
 *         description: No question IDs found
 *       500:
 *         description: Échec de la création du test
 */
router.post('/tests', testController.createTest);

/**
 * @swagger
 * /tests/{testId}:
 *   put:
 *     summary: Mettre à jour un test existant
 *     tags: [Tests]
 *     description: Met à jour un test existant en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: testId
 *         required: true
 *         description: ID du test à mettre à jour
 *         schema:
 *           type: string
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 example: Mathématiques
 *                 description: Catégorie du test
 *               chapter:
 *                 type: string
 *                 example: Soustraction
 *                 description: Chapitre du test
 *     responses:
 *       200:
 *         description: Test mis à jour avec succès
 *       404:
 *         description: No question IDs found
 *       500:
 *         description: Failed to update test
 */
router.put('/tests/:testId', testController.updateTest);

/**
 * @swagger
 * /tests/{testId}:
 *   delete:
 *     summary: Supprimer un test
 *     tags: [Tests]
 *     description: Supprime un test en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: testId
 *         required: true
 *         description: ID du test à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Test supprimé avec succès
 *       500:
 *         description: Échec de la suppression du test
 */
router.delete('/tests/:testId', testController.deleteTest);

module.exports = router;
