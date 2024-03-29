const express = require('express');
const router = express.Router();
const qcmController = require('../controlleurs/qcm.controlleur');

/**
 * @swagger
 * tags:
 *   name: QCM
 *   description: Gestion des questions QCM
 */

/**
 * @swagger
 * /qcm:
 *   get:
 *     summary: Récupérer toutes les questions QCM
 *     tags: [QCM]
 *     responses:
 *       200:
 *         description: Liste des questions QCM récupérées avec succès
 *       500:
 *         description: Échec de la récupération des questions QCM
 */
router.get('/qcm', qcmController.getAllQuestions);

/**
 * @swagger
 * /qcm/{questionId}:
 *   get:
 *     summary: Récupérer une question QCM par son ID
 *     tags: [QCM]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la question QCM à récupérer
 *     responses:
 *       200:
 *         description: Question QCM récupérée avec succès
 *       404:
 *         description: Question QCM non trouvée
 *       500:
 *         description: Échec de la récupération de la question QCM
 */
router.get('/qcm/:questionId', qcmController.getQuestionById);

/**
 * @swagger
 * /qcm:
 *   post:
 *     summary: Créer une nouvelle question QCM
 *     tags: [QCM]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Option de question
 *               imageUrl:
 *                 type: string
 *                 description: URL de l'image associée à la question
 *               chapter:
 *                 type: string
 *                 description: URL de l'image associée à la question
 *               category:
 *                 type: string
 *                 example: PERMIS_B
 *                 description: Category de la question
 *               correct:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Option correcte parmi les options (a, b, c, etc.)
 *               title:
 *                 type: string
 *                 example: Les feux tricolors
 *                 description: Titre de la question
 *     responses:
 *       201:
 *         description: Question QCM créée avec succès
 *       500:
 *         description: Échec de la création de la question QCM
 */
router.post('/qcm', qcmController.createQuestion);

/**
 * @swagger
 * /qcm/{questionId}:
 *   put:
 *     summary: Mettre à jour une question QCM existante
 *     tags: [QCM]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la question QCM à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Option de question
 *               imageUrl:
 *                 type: string
 *                 description: URL de l'image associée à la question
 *               chapter:
 *                 type: string
 *                 description: URL de l'image associée à la question
 *               category:
 *                 type: string
 *                 example: PERMIS_B
 *                 description: Category de la question
 *               correct:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Option correcte parmi les options (a, b, c, etc.)
 *               title:
 *                 type: string
 *                 example: Les feux tricolors
 *                 description: Titre de la question
 *     responses:
 *       200:
 *         description: Question QCM mise à jour avec succès
 *       404:
 *         description: Question QCM non trouvée
 *       500:
 *         description: Échec de la mise à jour de la question QCM
 */
router.put('/qcm/:questionId', qcmController.updateQuestion);

/**
 * @swagger
 * /qcm/{questionId}:
 *   delete:
 *     summary: Supprimer une question QCM
 *     tags: [QCM]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la question QCM à supprimer
 *     responses:
 *       204:
 *         description: Question QCM supprimée avec succès
 *       404:
 *         description: Question QCM non trouvée
 *       500:
 *         description: Échec de la suppression de la question QCM
 */
router.delete('/qcm/:questionId', qcmController.deleteQuestion);

module.exports = router;
