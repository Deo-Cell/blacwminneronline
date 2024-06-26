const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { DateTime } = require('luxon');
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

// Fonction pour récupérer les tests d'un utilisateur par son ID
exports.getUserTestResultById = async (req, res) => {
  const { userId } = req.params;
  console.log('userId:', userId);
  try {
    // Recherche de l'utilisateur dans la base de données
    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        UserTestResult: true // Inclure les résultats des tests associés à l'utilisateur
      }
    });

    // Vérifier si l'utilisateur existe
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.UserTestResult.length === 0) {
      return res.status(404).json({ Message: 'User dont have test yet' });
    }

    // Récupérer les résultats des tests de l'utilisateur
    const userTests = user.UserTestResult;

    res.status(200).json(userTests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user tests' });
  }
};

// Fonction pour créer un nouveau résultat de test utilisateur
exports.createUserTestResult = async (req, res) => {
  const { userId, testId, note, date } = req.body;
  console.log('date:', date);
  // Retirer les millisecondes de la date
  const dateWithoutMilliseconds = date.replace(/\.\d{6}/, '');
  
  // Convertir la date en format Luxon DateTime
  const luxonDate = DateTime.fromISO(dateWithoutMilliseconds);

  // Formater la date en français
  const formattedDate = luxonDate.setLocale('fr').toFormat('cccc d LLLL yyyy');

  console.log('formattedDate:', formattedDate);
  
  try {
    const newUserTestResult = await prisma.userTestResult.create({
      data: {
        user: { connect: { id: userId } },
        test: { connect: { id: testId } },
        date: formattedDate,
        note,
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
