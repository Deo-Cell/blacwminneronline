const express = require('express');
const router = express.Router();
const examController = require('../controlleurs/exam.controlleur');

/**
 * @swagger
 * tags:
 *   name: Exams
 *   description: Routes liées à la gestion des examens
*/

/**
 * @swagger
 * /exams:
 *   get:
 *     summary: Récupérer tous les examens
 *     tags: [Exams]
 *     description: Récupère tous les examens disponibles.
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/exams', examController.getAllExams);

/**
 * @swagger
 * /exams/{examId}:
 *   get:
 *     summary: Récupérer un examen par son ID
 *     tags: [Exams]
 *     description: Récupère un examen en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         description: ID de l'examen à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Exam not found
 */
router.get('/exams/:examId', examController.getExamById);

/**
 * @swagger
 * /exams:
 *   post:
 *     summary: Créer un nouvel examen
 *     tags: [Exams]
 *     description: Crée un nouvel examen avec les détails fournis.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 example: PERMIS_B
 *                 description: Catégorie de l'examen
 *               chapter:
 *                 type: string
 *                 example: Signalisation
 *                 description: Chapitre de l'examen
 *     responses:
 *       201:
 *         description: Examen créé avec succès
 *       404:
 *         description: No question IDs found
 *       500:
 *         description: Échec de la création de l'examen
 */
router.post('/exams', examController.createExam);

/**
 * @swagger
 * /exams/{examId}:
 *   put:
 *     summary: Mettre à jour un examen existant
 *     tags: [Exams]
 *     description: Met à jour un examen existant en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         description: ID de l'examen à mettre à jour
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
 *                 example: PERMIS_B
 *                 description: Catégorie de l'examen
 *               chapter:
 *                 type: string
 *                 example: Signalisation
 *                 description: Chapitre de l'examen
 *     responses:
 *       200:
 *         description: Examen mis à jour avec succès
 *       404:
 *         description: No question IDs found
 *       500:
 *         description: Failed to update exam
 */
router.put('/exams/:examId', examController.updateExam);

/**
 * @swagger
 * /exams/{examId}:
 *   delete:
 *     summary: Supprimer un examen
 *     tags: [Exams]
 *     description: Supprime un examen en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         description: ID de l'examen à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Examen supprimé avec succès
 *       500:
 *         description: Échec de la suppression de l'examen
 */
router.delete('/exams/:examId', examController.deleteExam);

module.exports = router;
