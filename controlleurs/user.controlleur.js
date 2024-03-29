const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Fonction pour récupérer la liste des utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

// Fonction pour créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  const { name, surname, email, roleId, phone_number, password } = req.body;

  try {
    const checking = await prisma.users.findUnique({ where: { email } });

    if (checking) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.users.create({
      data: {
        name,
        surname,
        email,
        phone_number,
        role:  { connect: { id: roleId } },
        password: hashedPassword
      },
    });
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Fonction pour mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, surname, email, phone_number, roleId, password } = req.body;

  try {
    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: {
        name,
        surname,
        email,
        phone_number,
        role:  { connect: { id: roleId } },
        password: await bcrypt.hash(password, 10),
      },
    });

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Fonction pour supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await prisma.users.delete({
      where: { id: userId },
    });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete users' });
  }
};
