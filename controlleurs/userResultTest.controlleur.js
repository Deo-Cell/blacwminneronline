const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fonction pour récupérer tous les résultats des tests des utilisateurs
exports.getAllUserTestResults = async (req, res) => {
  try {
    const userTestResults = await prisma.userTestResult.findMany();
    res.status(200).json(userTestResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user test results' });
  }
};

// Fonction pour récupérer les résultats d'un test d'utilisateur par son ID
exports.getUserTestResultById = async (req, res) => {
  const { userTestResultId } = req.params;
  try {
    const userTestResult = await prisma.userTestResult.findUnique({ where: { id: userTestResultId } });
    if (!userTestResult) {
      return res.status(404).json({ error: 'User test result not found' });
    }
    res.status(200).json(userTestResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user test result' });
  }
};

// Fonction pour créer un nouveau résultat de test utilisateur
exports.createUserTestResult = async (req, res) => {
  const { userId, testId, note, result } = req.body;
  try {
    const newUserTestResult = await prisma.userTestResult.create({
      data: {
        user: { connect: { id: userId } },
        test: { connect: { id: testId } },
        note,
        result,
      },
    });
    res.status(201).json(newUserTestResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user test result' });
  }
};

// Fonction pour mettre à jour un résultat de test utilisateur
exports.updateUserTestResult = async (req, res) => {
  const { userTestResultId } = req.params;
  const { note, result } = req.body;
  try {
    const updatedUserTestResult = await prisma.userTestResult.update({
      where: { id: userTestResultId },
      data: {
        note,
        result,
      },
    });
    res.status(200).json(updatedUserTestResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user test result' });
  }
};

// Fonction pour supprimer un résultat de test utilisateur
exports.deleteUserTestResult = async (req, res) => {
  const { userTestResultId } = req.params;
  try {
    await prisma.userTestResult.delete({ where: { id: userTestResultId } });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete user test result' });
  }
};
