const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Fonction pour récupérer tous les tests
exports.getAllTests = async (req, res) => {
  try {
    const tests = await prisma.test.findMany();
    res.status(200).json(tests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tests' });
  }
};

// Fonction pour récupérer un test par son ID
exports.getTestById = async (req, res) => {
  const { testId } = req.params;
  try {
    const test = await prisma.test.findUnique({ where: { id: testId } });
    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }
    res.status(200).json(test);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch test' });
  }
};

// Fonction pour créer un nouveau test
exports.createTest = async (req, res) => {
  try {
    const { category, chapter } = req.body; // Extraire le type de test de la requête
    // Recherche des questions correspondantes
    const allQuestions = await prisma.question.findMany({
        where: {
          category,
          chapter,
        },
    });

    if (!allQuestions || allQuestions.length === 0) {
        return res.status(404).json({ error: 'No question IDs found' });
    }

    const randomQuestions = getRandomQuestions(allQuestions, 20);
  
    const newTest = await prisma.test.create({
      data: {
        questions: { set: randomQuestions },
        category,
        chapter,
      },
    });

    res.status(201).json(newTest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create test' });
  }
};

// Fonction pour sélectionner aléatoirement un nombre donné d'IDs parmi toutes les IDs disponibles
function getRandomQuestions(allQuestions, count) {
    const randomIds = [];
    const totalQuestions = allQuestions.length;
  
    while (randomIds.length < count) {
      const randomIndex = Math.floor(Math.random() * totalQuestions);
      const randomId = allQuestions[randomIndex];
  
      if (!randomIds.includes(randomId)) {
        randomIds.push(randomId);
      }
    }
  
    return randomIds;
}
  
// Fonction pour mettre à jour un test existant
exports.updateTest = async (req, res) => {
  const { testId } = req.params;
  const { category, chapter } = req.body; // Extraire le type de test de la requête
  // Recherche des questions correspondantes
  const allQuestions = await prisma.question.findMany({
      where: {
        category,
        chapter,
      },
      select: {
        id: true,
      },
  });

  if (!allQuestions || allQuestions.length === 0) {
      return res.status(404).json({ error: 'No question IDs found' });
  }

  const getRandomQuestions = getRandomQuestions(allQuestions, 20);

  try {
    const updatedTest = await prisma.test.update({
      where: { id: testId },
      data: {
        questions: { set: getRandomQuestions },
        category,
        chapter,
      },
    });
    res.status(200).json(updatedTest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update test' });
  }
};

// Fonction pour supprimer un test
exports.deleteTest = async (req, res) => {
  const { testId } = req.params;
  try {
    await prisma.test.delete({ where: { id: testId } });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete test' });
  }
};
