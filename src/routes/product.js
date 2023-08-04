/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: Product operations
 * 
 * definitions:
 *   Product:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *   
 * 
 *   Offer:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *      
 * 
 *   Comment:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *      
 * 
 * /api/product:
 *   post:
 *     tags:
 *       - Product
 *     summary: Creates a new product.
 *     requestBody:
 *       description: New product data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 * 
 *   get:
 *     tags:
 *       - Product
 *     summary: Returns all products.
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
 * /api/product/{productId}:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get a specific product.
 *     parameters:
 *       - name: productId
 *         description: Product ID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           $ref: '#/definitions/Product'
 * 
 *   put:
 *     tags:
 *       - Product
 *     summary: Updates a specific product.
 *     parameters:
 *       - name: productId
 *         description: Product ID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: product
 *         description: Updated product data
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 * 
 *   delete:
 *     tags:
 *       - Product
 *     summary: Deletes a specific product.
 *     parameters:
 *       - name: productId
 *         description: Product ID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product deleted successfully
 * 
 * /api/product/{productId}/create-offer:
 *   post:
 *     tags:
 *       - Product
 *     summary: Creates an offer for a product.
 *     parameters:
 *       - name: productId
 *         description: Product ID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: offer
 *         description: New offer data
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Offer'
 *     responses:
 *       201:
 *         description: Offer created successfully
 * 
 * /api/product/{productId}/like:
 *   post:
 *     tags:
 *       - Product
 *     summary: Likes a product.
 *     parameters:
 *       - name: productId
 *         description: Product ID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product liked successfully
 * 
 * /api/product/{productId}/unlike:
 *   delete:
 *     tags:
 *       - Product
 *     summary: Removes the likes of a product.
 *     parameters:
 *       - name: productId
 *         description: Product ID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product like removed successfully
 * 
 * /api/product/{productId}/comment:
 *   post:
 *     tags:
 *       - Product
 *     summary: Comments on a product.
 *     parameters:
 *       - name: productId
 *         description: Product ID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: comment
 *         description: New comment data
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Comment'
 *     responses:
 *       201:
 *         description: Comment added successfully
 * 
 * /api/product/{productId}/comments/{commentId}/delete:
 *   delete:
 *     tags:
 *       - Product
 *     summary: Deletes a product's comment.
 *     parameters:
 *       - name: productId
 *         description: Product ID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: commentId
 *         description: Comment ID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Comment deleted successfully
 */



const router = require('express').Router();
const ProductController = require('../controllers/product');

router.post('/', ProductController.createProduct);
router.get('/', ProductController.readProducts);
router.get('/:productId', ProductController.readProduct);
router.post('/:productId/create-offer', ProductController.createProductOffer);
router.put('/:productId/update', ProductController.updateProduct);
router.post('/:productId/like', ProductController.likeProduct);
router.delete('/:productId/unlike', ProductController.unlikeProduct);
router.post('/:productId/comment', ProductController.commentProduct);
router.delete('/:productId/comments/:commentId/delete', ProductController.deleteCommentProduct);
router.delete('/:productId/delete', ProductController.deleteProduct);

module.exports = router;
