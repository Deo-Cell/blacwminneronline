const express = require("express");
const router = express.Router();

const authCtrl = require("../controlleurs/auth.controlleur");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Routes related to user authentication
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User Signup
 *     tags: [Authentication]
 *     requestBody:
 *       description: User signup information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Success - User signed up successfully.
 *       '400':
 *         description: Bad Request - Data already exists.
 *       '500':
 *         description: Server Error - An error occurred while signing up the user.
 */
router.post("/signup", authCtrl.signup);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User Login
 *     tags: [Authentication]
 *     requestBody:
 *       description: User login information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Success - User logged in successfully.
 *       '400':
 *         description: Bad Request - Malformed request body or missing required information.
 *       '401':
 *         description: Unauthorized - Incorrect login credentials.
 *       '500':
 *         description: Server Error - An error occurred while logging in the user.
 */
router.post("/login", authCtrl.login);

/**
 * @swagger
 * /verifyOtp/{userId}:
 *   post:
 *     summary: Verify OTP code for specified user
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to verify.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Object containing OTP code to verify and verification type.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               typeOfVerification:
 *                 type: string
 *                 enum: [email, phone]
 *               code:
 *                 type: string
 *     responses:
 *       '200':
 *         description: OTP code verified successfully.
 *       '400':
 *         description: Incorrect code or invalid verification type.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: An error occurred while verifying OTP code.
 */
router.post("/verifyOtp/:userId", authCtrl.verifyOtp);

/**
 * @swagger
 * /verifyMail/{userId}:
 *   post:
 *     summary: Send OTP code via email for verification
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to verify.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User's email address.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               toEmail:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Success - OTP code sent via email.
 *       '500':
 *         description: Server Error - An error occurred while sending OTP code via email.
 */
router.post("/verifyMail/:userId", authCtrl.sendOtpByEmail);

/**
 * @swagger
 * /verifyPhone/{userId}:
 *   post:
 *     summary: Send OTP code via SMS for verification
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to verify.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User's phone number.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               toNumber:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Success - OTP code sent via SMS.
 *       '500':
 *         description: Server Error - An error occurred while sending OTP code via SMS.
 */
router.post("/verifyPhone/:userId", authCtrl.sendOtpByPhone);

module.exports = router;
