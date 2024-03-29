const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fonction pour récupérer toutes les questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await prisma.question.findMany();
    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
};

// Fonction pour récupérer une question par son ID
const getQuestionById = async (req, res) => {
  const { questionId } = req.params;
  try {
    const question = await prisma.question.findUnique({ where: { id: questionId } });
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch question' });
  }
};

// Fonction pour créer une nouvelle question
const createQuestion = async (req, res) => {
  const { options, imageUrl, title, correct, category, chapter } = req.body;
  try {
    const newQuestion = await prisma.question.create({
      data: {
        options,
        imageUrl,
        title,
        correct,
        category,
        chapter
      },
    });
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create question' });
  }
};

// Fonction pour mettre à jour une question existante
const updateQuestion = async (req, res) => {
  const { questionId } = req.params;
  const { options, imageUrl, title, correct, category, chapter } = req.body;
  try {
    const updatedQuestion = await prisma.question.update({
      where: { id: questionId },
      data: {
        options,
        imageUrl,
        title,
        correct,
        category,
        chapter,
      },
    });
    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update question' });
  }
};

// Fonction pour supprimer une question
const deleteQuestion = async (req, res) => {
  const { questionId } = req.params;
  try {
    await prisma.question.delete({ where: { id: questionId } });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete question' });
  }
};

module.exports = {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
