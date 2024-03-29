const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const nodemailer = require('nodemailer');

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const generateOtp = async () => {
  const code = Math.floor(1000 + Math.random() * 9000).toString();
  try {
    const newOtp = await prisma.otp.create({ data: { code } });

    return newOtp;
  } catch (error) {
    console.error("Erreur lors de la génération de l'OTP :", error);
    throw error;
  }
};

exports.sendOtpByPhone = async (req, res) => {
  const { toNumber } = req.body;
  const { userId } = req.params;
  const newOtp = await generateOtp();

  try {
    await prisma.userOtp.create({
      data: {
        otp: { connect: { id: newOtp.id } },
        user: { connect: { id: userId } }
      }
    });
  
    const message = await client.messages.create({
          body: newOtp.code,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: toNumber
      });
      console.log(`Message SID: ${message.sid}`);
      res.status(200).json({ message: 'Message envoyé !', sid: message.sid });
  } catch (error) {
      console.error(`Erreur lors de l'envoi du SMS: ${error}`);
      res.status(500).json({ message: 'Problème lors de l\'envoi du SMS'});
      throw error;
  }
}

exports.sendOtpByEmail = async (req, res) => {
  const { toEmail } = req.body;
  const { userId } = req.params;

  const newOtp = await generateOtp();
  await prisma.userOtp.create({
    data: {
      otp: { connect: { id: newOtp.id } },
      user: { connect: { id: userId } }
    }
  });

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "halidonfd13@gmail.com",
        pass: "yrwimfzjywzhxsev",
    },
  });

  const mailOptions = {
    from: 'ENDXEND@gmail.com', 
    to: toEmail, 
    subject: 'Vérification de l\'e-mail', 
    text: `Votre code OTP est : ${newOtp.code}`, 
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail envoyé :', info.messageId);
    res.status(200).json({ message: `E-mail envoyé ${newOtp.code}`});
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    res.status(500).json({ message: 'Problème lors de l\'envoi de l\'e-mail '});
    throw error;
  }
};

exports.signup = async (req, res) => {
  const { name, surname, email, phone_number, password } = req.body;

  try {
    const checking = await prisma.users.findUnique({ where: { email } });

    if (checking) {
      return res.status(400).send('User details already exist');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const role = await prisma.roles.findFirst({ where: { role: "USER" } });

      if (!role) {
        return res.status(500).send("Role 'USER' not found. Please make sure it exists in the database.");
      }
      const newUser = await prisma.users.create({
        data: {
          name,
          surname,
          email,
          phone_number,
          role:  { connect: { id: role.id } },
          password: hashedPassword
        },
      });
  
      res.status(200).json({ message: 'Utilisateur créé !', users: newUser });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send('wrong inputs');
  } finally {
    await prisma.$disconnect();
  }
};

exports.verifyOtp = async (req, res) => {
  const { typeOfVerification, code } = req.body;
  const { userId } = req.params;

  try {
    // Récupérer le dernier enregistrement UserOtp pour cet utilisateur
    const userOtp = await prisma.userOtp.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    
    if (!userOtp) {
      return res.status(404).send("Aucun OTP trouvé pour cet utilisateur !");
    }

    // Comparer le code fourni avec le code de l'OTP
    const otp = await prisma.otp.findUnique({
      where: { id: userOtp.otpId },
    });
    console.error('otp:', otp);
    if (otp.code !== code) {
      return res.status(400).send("Code incorrect !");
    } else {
      // Mettre à jour le champ correspondant en fonction du type de vérification
      let updateField = {};
      if (typeOfVerification === "email") {
        updateField = { isEmailVerified: true };
      } else if (typeOfVerification === "phone") {
        updateField = { isPhoneVerified: true };
      } else {
        return res.status(400).send("Type de vérification non valide !");
      }

      // Mettre à jour l'utilisateur avec le champ approprié
      await prisma.users.update({
        where: { id: userId },
        data: updateField,
      });

      res.status(200).send("Code vérifié avec succès !");
    }
  } catch (error) {
    console.error("Erreur lors de la vérification du code :", error);
    res.status(500).send("Une erreur s'est produite lors de la vérification du code.");
  } finally {
    await prisma.$disconnect();
  }
};

  exports.login = async (req, res) => {
    try {
      let check;


      // Vérifier si l'utilisateur se connecte avec un email ou un numéro de téléphone
      if (req.body.email) {
        check = await prisma.users.findUnique({ where: { email: req.body.email } });
        if (!check) {
          return res.status(401).send("Utilisateur non trouvé !");
        }
        if (!check.isEmailVerified) {
          return res.status(403).send("Veuillez vérifier votre compte !");
        }
      } else if (req.body.phone_number) {
        check = await prisma.users.findUnique({ where: { number: req.body.phone_number } });
        if (!check) {
          return res.status(401).send("Utilisateur non trouvé !");
        }
        if (!check.isPhoneVerified) {
          return res.status(403).send("Veuillez vérifier votre compte !");
        }
      }
      const passwordMatch = await bcrypt.compare(req.body.password, check.password);

      if (passwordMatch) {
        const token = jwt.sign(
          { userId: check.id, name: check.name, surname: check.surname, email: check.email, phone_number: check.phone_number},
          "RANDOM_TOKEN_SECRET",
          { expiresIn: "24h" }
        );

        req.users = {
          id: check.id,
          name: check.name,
          surname: check.surname,
          email: check.email,
          phone_number: check.phone_number,
          token: token,
        };

        res.status(200).json({
          message: "Connexion réussie !",
          token: token
        });
      } else {
        res.status(500).send("Mot de passe incorrect !");
      }
    } catch (e) {
      console.error(e);
      res.status(500).send("Une erreur s'est produite");
    } finally {
      await prisma.$disconnect();
    }
  };
