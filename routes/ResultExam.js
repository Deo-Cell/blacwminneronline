const express = require('express');
const router = express.Router();

const userExamResultCtrl = require('../controllers/userExamResultController');

/**
 * @swagger
 * tags:
 *   name: UserExamResults
 *   description: Routes liées à la gestion des résultats d'examens utilisateur
 */

/**
 * @swagger
 * /userExamResults:
 *   get:
 *     summary: Récupérer tous les résultats d'examens utilisateur
 *     tags: [UserExamResults]
 *     description: Récupère tous les résultats d'examens utilisateur.
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/userExamResults', userExamResultCtrl.getAllUserExamResults);

/**
 * @swagger
 * /userExamResults/{userExamResultId}:
 *   get:
 *     summary: Récupérer un résultat d'examen utilisateur par son ID
 *     tags: [UserExamResults]
 *     description: Récupère un résultat d'examen utilisateur en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: userExamResultId
 *         required: true
 *         description: ID du résultat d'examen utilisateur à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: User exam result not found
 */
router.get('/userExamResults/:userExamResultId', userExamResultCtrl.getUserExamResultById);

/**
 * @swagger
 * /userExamResults:
 *   post:
 *     summary: Créer un nouveau résultat d'examen utilisateur
 *     tags: [UserExamResults]
 *     description: Crée un nouveau résultat d'examen utilisateur avec les détails fournis.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID de l'utilisateur
 *               examId:
 *                 type: string
 *                 description: ID de l'examen
 *               note:
 *                 type: number
 *                 description: Note de l'examen
 *               result:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Résultats détaillés de l'examen
 *     responses:
 *       201:
 *         description: User exam result created successfully
 *       500:
 *         description: Failed to create user exam result
 */
router.post('/userExamResults', userExamResultCtrl.createUserExamResult);

/**
 * @swagger
 * /userExamResults/{userExamResultId}:
 *   put:
 *     summary: Mettre à jour un résultat d'examen utilisateur existant
 *     tags: [UserExamResults]
 *     description: Met à jour un résultat d'examen utilisateur existant en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: userExamResultId
 *         required: true
 *         description: ID du résultat d'examen utilisateur à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               note:
 *                 type: number
 *                 description: Nouvelle note de l'examen
 *               result:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Nouveaux résultats détaillés de l'examen
 *     responses:
 *       200:
 *         description: User exam result updated successfully
 *       500:
 *         description: Failed to update user exam result
 */
router.put('/userExamResults/:userExamResultId', userExamResultCtrl.updateUserExamResult);

/**
 * @swagger
 * /userExamResults/{userExamResultId}:
 *   delete:
 *     summary: Supprimer un résultat d'examen utilisateur
 *     tags: [UserExamResults]
 *     description: Supprime un résultat d'examen utilisateur en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: userExamResultId
 *         required: true
 *         description: ID du résultat d'examen utilisateur à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User exam result deleted successfully
 *       500:
 *         description: Failed to delete user exam result
 */
router.delete('/userExamResults/:userExamResultId', userExamResultCtrl.deleteUserExamResult);

module.exports = router;
