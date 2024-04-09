const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Fonction pour récupérer tous les résultats d'examens utilisateur
exports.getAllUserExamResults = async (req, res) => {
  try {
    const userExamResults = await prisma.userExamResult.findMany();
    res.status(200).json(userExamResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user exam results' });
  }
};

// Fonction pour récupérer un résultat d'examen utilisateur par son ID
exports.getUserExamResultById = async (req, res) => {
  const { userExamResultId } = req.params;
  try {
    const userExamResult = await prisma.userExamResult.findUnique({ where: { id: userExamResultId } });
    if (!userExamResult) {
      return res.status(404).json({ error: 'User exam result not found' });
    }
    res.status(200).json(userExamResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user exam result' });
  }
};

// Fonction pour créer un nouveau résultat d'examen utilisateur
exports.createUserExamResult = async (req, res) => {
  try {
    const { userId, examId, note, date, result } = req.body;

    const newUserExamResult = await prisma.userExamResult.create({
      data: {
        user: { connect: { id: userId } },
        exam: { connect: { id: examId } },
        date,
        note,
        result,
      },
    });

    res.status(201).json(newUserExamResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user exam result' });
  }
};

// Fonction pour mettre à jour un résultat d'examen utilisateur existant
exports.updateUserExamResult = async (req, res) => {
  const { userExamResultId } = req.params;
  const { note, result } = req.body;

  try {
    const updatedUserExamResult = await prisma.userExamResult.update({
      where: { id: userExamResultId },
      data: {
        note,
        result,
      },
    });
    res.status(200).json(updatedUserExamResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user exam result' });
  }
};

// Fonction pour supprimer un résultat d'examen utilisateur
exports.deleteUserExamResult = async (req, res) => {
  const { userExamResultId } = req.params;
  try {
    await prisma.userExamResult.delete({ where: { id: userExamResultId } });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete user exam result' });
  }
};
