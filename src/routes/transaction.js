/**
 * @swagger
 * tags:
 *   - name: Transaction
 *     description: Transactions
 * 
 * definitions:
 *   Transaction:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 * 
 * /api/transaction:
 *   post:
 *     tags:
 *       - Transaction
 *     summary: Creates a new transaction.
 *     requestBody:
 *       description: New transaction data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Transaction'
 *     responses:
 *       201:
 *         description: Transaction created successfully
 * 
 *   get:
 *     tags:
 *       - Transaction
 *     summary: Returns all transactions.
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
 * /api/transaction/{transactionId}:
 *   get:
 *     tags:
 *       - Transaction
 *     summary: Get a specific transaction.
 *     parameters:
 *       - name: transactionId
 *         description: Transaction ID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           $ref: '#/definitions/Transaction'
 * 
 *   put:
 *     tags:
 *       - Transaction
 *     summary: Updates a specific transaction.
 *     parameters:
 *       - name: transactionId
 *         description: Transaction ID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: transaction
 *         description: Updated transaction data
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Transaction'
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 * 
 *   delete:
 *     tags:
 *       - Transaction
 *     summary: Deletes a specific transaction.
 *     parameters:
 *       - name: transactionId
 *         description: Transaction ID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Transaction deleted successfully
 */



const router = require('express').Router();
const TransactionController = require('../controllers/transaction');

router.post('/',TransactionController.createTransaction);
router.get('/', TransactionController.readTransactions);
router.get('/:transactionId', TransactionController.readTransaction);
// router.get('/:userId', TransactionController.readUserTransactions);
router.put('/:transactionId/update', TransactionController.updateTransaction);
router.delete('/:transactionId/delete', TransactionController.deleteTransaction);

module.exports = router;