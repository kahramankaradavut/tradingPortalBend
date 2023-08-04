/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User operations
 * 
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       email:
 *         type: string
 * 
 * /api/user:
 *   get:
 *     tags:
 *       - User
 *     summary: Brings all users.
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *           properties:
 *             users:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/User'
 * 
 *   post:
 *     tags:
 *       - User
 *     summary: Creates a new user.
 *     requestBody:
 *       description: New user data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/User'
 *     responses:
 *       201:
 *         description: User created successfully
 * 
 * /api/user/{userId}:
 *   get:
 *     tags:
 *       - User
 *     summary: Returns a specific user.
 *     parameters:
 *       - name: userId
 *         description: User ID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           $ref: '#/definitions/User'
 * 
 *   put:
 *     tags:
 *       - User
 *     summary: Updates a specific user.
 *     parameters:
 *       - name: userId
 *         description: User ID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: user
 *         description: Updated user data
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 * 
 *   delete:
 *     tags:
 *       - User
 *     summary: Deletes a specific user.
 *     parameters:
 *       - name: userId
 *         description: User ID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 * 
 * /api/user/{userId}/products:
 *   get:
 *     tags:
 *       - User
 *     summary: Returns products for a specific user.
 *     parameters:
 *       - name: userId
 *         description: User ID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *           properties:
 *             products:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Product'
 * 
 * /api/user/{userId}/transactions:
 *   get:
 *     tags:
 *       - User
 *     summary: Retrieves the actions of a particular user.
 *     parameters:
 *       - name: userId
 *         description: User ID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *           properties:
 *             transactions:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Transaction'
 * 
 * /api/user/{userId}/offers:
 *   get:
 *     tags:
 *       - User
 *     summary: Returns offers from a specific user.
 *     parameters:
 *       - name: userId
 *         description: User ID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *           properties:
 *             offers:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Product'
 * 
 * /api/user/{userId}/offers/reply-to-offer:
 *   post:
 *     tags:
 *       - User
 *     summary: Responds to an offer.
 *     parameters:
 *       - name: userId
 *         description: User ID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: offerId
 *         description: Offer ID
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: response
 *         description: Response (accept, reject, etc.)
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Response sent successfully
 * 
 * /api/user/{userId}/favorites:
 *   get:
 *     tags:
 *       - User
 *     summary: Brings a particular user's favorite products.
 *     parameters:
 *       - name: userId
 *         description: User ID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *           properties:
 *             products:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Product'
 *             $ref: '#/definitions/Product'
 * 
 * /api/user/{userId}/offers/history:
 *   get:
 *     tags:
 *       - User
 *     summary: Returns offer history of a specific user.
 *     parameters:
 *       - name: userId
 *         description: User ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           type: object
 *           properties:
 *             offers:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Product'
 */

const router = require('express').Router();
const UserController = require('../controllers/user');
const ProductController = require('../controllers/product');
const TransactionController = require('../controllers/transaction');

router.get('/', UserController.readUsers);
router.get('/:userId', UserController.readUser);
router.get('/:userId/products', ProductController.readUserProducts);
router.get('/:userId/transactions', TransactionController.readUserTransactions);
router.get('/:userId/offers', ProductController.readUserOffers);
router.get('/:userId/offers/history', ProductController.readUserOfferHistory);
router.post('/:userId/offers/reply-to-offer', ProductController.replyToOffer);
router.get('/:userId/favorites', ProductController.readUserFavoriteProducts);
router.put('/:userId/update', UserController.updateUser);
router.delete('/:userId/delete', UserController.deleteUser);

module.exports = router;
