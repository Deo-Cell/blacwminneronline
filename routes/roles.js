const express = require('express');
const router = express.Router();
const roleController = require('../controlleurs/role.controlleur');

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Routes liées à la gestion des rôles
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Récupère tous les types de rôles
 *     tags: [Roles]
 *     responses:
 *       '200':
 *         description: Succès - Récupère tous les types de rôles.
 *       '500':
 *         description: Erreur du serveur - Une erreur s'est produite lors de la récupération des types de rôles.
 */
router.get('/roles', roleController.getAllRole);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Crée un nouveau type de rôle
 *     tags: [Roles]
 *     requestBody:
 *       description: Nom du rôle à créer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 example: "USER"
 *     responses:
 *       '201':
 *         description: Succès - Type de rôle créé avec succès.
 *       '400':
 *         description: Requête invalide - Le nom du rôle est déjà utilisé.
 *       '500':
 *         description: Erreur du serveur - Une erreur s'est produite lors de la création du type de rôle.
 */
router.post('/roles', roleController.createRole);

/**
 * @swagger
 * /roles/{roleId}:
 *   put:
 *     summary: Met à jour un type de rôle existant
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         description: ID du rôle à mettre à jour.
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Nouveau nom du rôle
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 example: "Editor"
 *     responses:
 *       '200':
 *         description: Succès - Type de rôle mis à jour avec succès.
 *       '500':
 *         description: Erreur du serveur - Une erreur s'est produite lors de la mise à jour du type de rôle.
 */
router.put('/roles/:RoleId', roleController.updateRole);

/**
 * @swagger
 * /roles/{roleId}:
 *   delete:
 *     summary: Supprime un type de rôle existant
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         description: ID du rôle à supprimer.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Succès - Type de rôle supprimé avec succès.
 *       '500':
 *         description: Erreur du serveur - Une erreur s'est produite lors de la suppression du type de rôle.
 */
router.delete('/roles/:RoleId', roleController.deleteRole);

module.exports = router;
