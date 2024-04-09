const express = require('express');
const router = express.Router();

const userTestResultCtrl = require('../controlleurs/userResultTest.controlleur');

/**
 * @swagger
 * tags:
 *   name: UserTestResults
 *   description: Routes liées à la gestion des résultats de tests d'utilisateurs
*/

/**
 * @swagger
 * /user-test-results:
 *   get:
 *     summary: Récupérer tous les résultats de tests d'utilisateurs
 *     tags: [UserTestResults]
 *     description: Récupère tous les résultats de tests d'utilisateurs.
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/user-test-results', userTestResultCtrl.getAllUserTestResults);

/**
 * @swagger
 * /user-test-results/{userTestResultId}:
 *   get:
 *     summary: Récupérer un résultat de test utilisateur par son ID
 *     tags: [UserTestResults]
 *     description: Récupère un résultat de test utilisateur en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: userTestResultId
 *         required: true
 *         description: ID du résultat de test utilisateur à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: User test result not found
 */
router.get('/user-test-results/:userTestResultId', userTestResultCtrl.getUserTestResultById);

/**
 * @swagger
 * /user-test-results:
 *   post:
 *     summary: Créer un nouveau résultat de test utilisateur
 *     tags: [UserTestResults]
 *     description: Crée un nouveau résultat de test utilisateur avec les détails fournis.
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
 *               testId:
 *                 type: string
 *                 description: ID du test
 *               note:
 *                 type: float
 *                 description: Note du test
 *               date:
 *                 type: Datetime
 *                 description: Date de composition
 *               result:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Résultat du test
 *     responses:
 *       201:
 *         description: User test result created successfully
 *       500:
 *         description: Failed to create user test result
 */
router.post('/user-test-results', userTestResultCtrl.createUserTestResult);

/**
 * @swagger
 * /user-test-results/{userTestResultId}:
 *   put:
 *     summary: Mettre à jour un résultat de test utilisateur existant
 *     tags: [UserTestResults]
 *     description: Met à jour un résultat de test utilisateur existant en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: userTestResultId
 *         required: true
 *         description: ID du résultat de test utilisateur à mettre à jour
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
 *                 type: float
 *                 description: Nouvelle note du test
 
 *     responses:
 *       200:
 *         description: User test result updated successfully
 *       500:
 *         description: Failed to update user test result
 */
router.put('/user-test-results/:userTestResultId', userTestResultCtrl.updateUserTestResult);

/**
 * @swagger
 * /user-test-results/{userTestResultId}:
 *   delete:
 *     summary: Supprimer un résultat de test utilisateur
 *     tags: [UserTestResults]
 *     description: Supprime un résultat de test utilisateur en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: userTestResultId
 *         required: true
 *         description: ID du résultat de test utilisateur à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User test result deleted successfully
 *       500:
 *         description: Failed to delete user test result
 */
router.delete('/user-test-results/:userTestResultId', userTestResultCtrl.deleteUserTestResult);

module.exports = router;
