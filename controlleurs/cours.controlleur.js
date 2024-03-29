const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Contrôleur pour gérer les cours
const CourseController = {
  // Récupérer tous les cours
  getAllCourses: async (req, res) => {
    try {
      const courses = await prisma.course.findMany();
      res.status(200).json({ message: 'All courses retrieved successfully', data: courses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve courses' });
    }
  },

  // Récupérer un cours par son ID
  getCourseById: async (req, res) => {
    const { courseId } = req.params;
    try {
      const course = await prisma.course.findUnique({ where: { id: courseId } });
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.status(200).json({ message: 'Course retrieved successfully', data: course });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve course' });
    }
  },

  // Créer un nouveau cours
  createCourse: async (req, res) => {
    const { title, subtitle, description, chapter, category, url } = req.body;
    try {
      const newCourse = await prisma.course.create({
        data: {
          title,
          subtitle,
          description,
          category,
          chapter,
          url
        },
      });
      res.status(201).json({ message: 'Course created successfully', data: newCourse });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create course' });
    }
  },

  // Mettre à jour un cours
  updateCourse: async (req, res) => {
    const { courseId } = req.params;
    const { title, subtitle, description, chapter, category, url } = req.body;
    try {
      const updatedCourse = await prisma.course.update({
        where: { id: courseId },
        data: {
          title,
          subtitle,
          description,
          chapter,
          category,
          url
        },
      });
      res.status(200).json({ message: 'Course updated successfully', data: updatedCourse });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update course' });
    }
  },

  // Supprimer un cours
  deleteCourse: async (req, res) => {
    const { courseId } = req.params;
    try {
      await prisma.course.delete({ where: { id: courseId } });
      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete course' });
    }
  },

};

module.exports = CourseController;
