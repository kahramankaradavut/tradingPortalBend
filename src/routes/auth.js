/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: User authorization processes
 * 
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *      
 * 
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Creates a new user record.
 *     requestBody:
 *       description: New user data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/User'
 *     responses:
 *       201:
 *         description: User registration successful
 * 
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: The user logs in.
 *     requestBody:
 *       description: User login credentials
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
 *                 format: password
 *     responses:
 *       200:
 *         description: User login successful, token received
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 */



const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.post('/register', UserController.register);
router.post('/login', UserController.login);

module.exports = router;
