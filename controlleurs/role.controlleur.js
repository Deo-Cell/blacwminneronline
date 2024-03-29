const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getAllRole = async (req, res) => {
    try {
        const Roles = await prisma.roles.findMany();
        res.statuts(200).json(Roles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve role type' });
    }
}

exports.createRole = async (req, res) => {
    const { role } = req.body;
  
    try {    
      const existingRole = await prisma.roles.findUnique({
        where: {
          role: role,
        },
      });

      if (existingRole) {
        return res.status(400).json({ error: 'Role already exists' });
      }

      const newRole = await prisma.roles.create({
        data: {
          role,
        },
      });
  
      res.status(201).json({ message: 'Role type created successfully', user: newRole });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create a new role type' });
    }
};
  
exports.updateRole = async (req, res) => {
    const { RoleId } = req.params;
    const { role } = req.body;
  
    try {
      const updatedRole = await prisma.roles.update({
        where: { id: RoleId },
        data: {
            role
          },
      });
  
      res.status(200).json({ message: 'Role type updated successfully', user: updatedRole });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update Role type' });
    }
};

exports.deleteRole = async (req, res) => {
    const { RoleId } = req.params;
    try {
      await prisma.roles.delete({
        where: { id: RoleId },
      });
  
      res.status(200).json({ message: 'Role type deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete Role type' });
    }
};
  