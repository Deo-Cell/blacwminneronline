const express = require('express');
const router = express.Router();

const courseCtrl = require('../controlleurs/cours.controlleur');

/**
 * @swagger
 * tags:
 *   name: Cours
 *   description: Routes liées à la gestion des cours
*/

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Récupérer tous les cours
 *     tags: [Cours]
 *     description: Récupère tous les cours disponibles.
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/courses', courseCtrl.getAllCourses);

/**
 * @swagger
 * /courses/{courseId}:
 *   get:
 *     summary: Récupérer un cours par son ID
 *     tags: [Cours]
 *     description: Récupère un cours en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID du cours à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Course not found
 */
router.get('/courses/:courseId', courseCtrl.getCourseById);

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Créer un nouveau cours
 *     tags: [Cours]
 *     description: Crée un nouveau cours avec les détails fournis.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Cours de conduites
 *                 description: Titre du cours
 *               subtitle:
 *                 type: string
 *                 example: Gestion de la vitesse
 *                 description: Sous-titre du cours
 *               description:
 *                 type: string
 *                 example: Apprendre à gérer la vitesse en conduisant
 *                 description: Description du cours
 *               category:
 *                 type: string
 *                 example: PERMIS_B
 *                 description: Catégorie du cours
 *               chapter:
 *                 type: string
 *                 example: Chapitre 1
 *                 description: Chapitre auquel le cours est associé
 *               url:
 *                 type: string
 *                 example: https://www.youtube.com/watch?v=123456
 *                 description: URL de la vidéo associée au cours
 *     responses:
 *       201:
 *         description: Cours créé avec succès
 *       500:
 *         description: Échec de la création du cours
 */
router.post('/courses', courseCtrl.createCourse);

/**
 * @swagger
 * /courses/{courseId}:
 *   put:
 *     summary: Mettre à jour un cours existant
 *     tags: [Cours]
 *     description: Met à jour un cours existant en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID du cours à mettre à jour
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Failed to update course
 */
router.put('/courses/:courseId', courseCtrl.updateCourse);

/**
 * @swagger
 * /courses/{courseId}:
 *   delete:
 *     summary: Supprimer un cours
 *     tags: [Cours]
 *     description: Supprime un cours en fonction de son ID.
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID du cours à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Failed to delete course
 */
router.delete('/courses/:courseId', courseCtrl.deleteCourse);

module.exports = router;
