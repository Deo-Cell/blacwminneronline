const express = require("express");
const router = express.Router();

const userCtrl = require("../controlleurs/user.controlleur");

/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: Routes liées à la gestion des utilisateurs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer la liste des utilisateurs.
 *     tags: [Utilisateurs]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès.
 *       500:
 *         description: Erreur lors de la récupération de la liste des utilisateurs.
 */
router.get('/users', userCtrl.getAllUsers)

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Créer un nouvel utilisateur.
 *     tags: [Utilisateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom de l'utilisateur.
 *               email:
 *                 type: string
 *                 description: Adresse e-mail de l'utilisateur.
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur.
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès.
 *       400:
 *         description: Les données d'entrée sont invalides.
 *       500:
 *         description: Erreur lors de la création de l'utilisateur.
 */
router.post('/users', userCtrl.createUser);

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Mettre à jour un utilisateur.
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID de l'utilisateur à mettre à jour.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nouveau nom de l'utilisateur.
 *               email:
 *                 type: string
 *                 description: Nouvelle adresse e-mail de l'utilisateur.
 *               password:
 *                 type: string
 *                 description: Nouveau mot de passe de l'utilisateur.
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès.
 *       400:
 *         description: Les données d'entrée sont invalides.
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur lors de la mise à jour de l'utilisateur.
 */
router.put('/users/:userId', userCtrl.updateUser);


/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Supprimer un utilisateur.
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID de l'utilisateur à supprimer.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Utilisateur supprimé avec succès.
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur lors de la suppression de l'utilisateur.
 */
router.delete('/users/:userId', userCtrl.deleteUser);


module.exports = router;
