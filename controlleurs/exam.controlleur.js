const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Fonction pour récupérer tous les examens
exports.getAllExams = async (req, res) => {
  try {
    const exams = await prisma.exam.findMany();
    res.status(200).json(exams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch exams' });
  }
};

// Fonction pour récupérer un examen par son ID
exports.getExamById = async (req, res) => {
  const { examId } = req.params;
  try {
    const exam = await prisma.exam.findUnique({ where: { id: examId } });
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.status(200).json(exam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch exam' });
  }
};

// Fonction pour créer un nouvel examen
exports.createExam = async (req, res) => {
    try {
      const { category, chapter } = req.body; // Extraire le type de test de la requête
      // Recherche des questions correspondantes
      const allQuestionIds = await prisma.question.findMany({
          where: {
            category,
            chapter,
          },
          select: {
            id: true,
          },
      });
  
      if (!allQuestionIds || allQuestionIds.length === 0) {
          return res.status(404).json({ error: 'No question IDs found' });
      }
  
      const randomQuestionIds = getRandomQuestionIds(allQuestionIds, 20);
    
      const newExam = await prisma.exam.create({
        data: {
          questions: { set: randomQuestionIds },
          category,
          chapter,
        },
      });
  
      res.status(201).json(newExam);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create exam' });
    }
  };

// Fonction pour sélectionner aléatoirement un nombre donné d'IDs parmi toutes les IDs disponibles
function getRandomQuestionIds(allQuestionIds, count) {
  const randomIds = [];
  const totalQuestions = allQuestionIds.length;

  while (randomIds.length < count) {
    const randomIndex = Math.floor(Math.random() * totalQuestions);
    const randomId = allQuestionIds[randomIndex].id;

    if (!randomIds.includes(randomId)) {
      randomIds.push(randomId);
    }
  }

  return randomIds;
}

// Fonction pour mettre à jour un examen existant
exports.updateExam = async (req, res) => {
  const { examId } = req.params;
  const { category, chapter } = req.body; // Extraire le type de test de la requête
  // Recherche des questions correspondantes
  const allQuestionIds = await prisma.question.findMany({
      where: {
        category,
        chapter,
      },
      select: {
        id: true,
      },
  });

  if (!allQuestionIds || allQuestionIds.length === 0) {
      return res.status(404).json({ error: 'No question IDs found' });
  }

  const randomQuestionIds = getRandomQuestionIds(allQuestionIds, 20);

  try {
    const updatedExam = await prisma.exam.update({
      where: { id: examId },
      data: {
        questions: { set: randomQuestionIds },
        category,
        chapter,
      },
    });
    res.status(200).json(updatedExam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update exam' });
  }
};
// Fonction pour supprimer un examen
exports.deleteExam = async (req, res) => {
  const { examId } = req.params;
  try {
    await prisma.exam.delete({ where: { id: examId } });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete exam' });
  }
};
