import express from 'express'
import { authenticateUser } from '../middlewares/auth.middleware.js'
import { validateAddToCart, validateIncrementCartQuantity, validateDecrementCartQuantity, validateRemoveCartItem } from '../validator/cart.validator.js';
import { addToCart, createOrderController, getCart, incrementCartItemQuantity, verifyOrderController, decrementCartItemQuantity, removeCartItem } from '../controllers/cart.controller.js';

const router = express.Router();

console.log("CART ROUTES FILE LOADED");

/**
 * @route POST /api/cart/payment/create/order
 */

router.post("/payment/create/order", authenticateUser, (req, res, next) => {
    console.log("PAYMENT CREATE ROUTE HIT")
    next()
}, createOrderController)


router.post("/payment/verify/order", authenticateUser, verifyOrderController)

/**
 * @route POST /api/cart/add/:productId/:variantId
 * @desc Add item to cart 
 * @access Private
 * @argument productId - ID if the product to add 
 * @argument variantId - ID of the variant to add 
 * @argument quantity - Quantity of the item to add (optional, deafult: 1)
 */
router.post("/add/:productId/:variantId", authenticateUser, validateAddToCart, addToCart )


/**
 * @route GET /api/cart
 * @desc Get user's cart
 * @access Private
 */
router.get('/', authenticateUser, getCart)


/**
 * @route PATCH /api/cart/quantity/increment/:productId/:variantId
 * @desc Increment item quantity in cart by one
 * @access Private
 */
router.patch('/quantity/increment/:productId/:variantId', authenticateUser, validateIncrementCartQuantity, incrementCartItemQuantity);


/**
 * @route PATCH /api/cart/quantity/decrement/:productId/:variantId
 * @desc Decrement item quantity in cart by one
 * @access Private
 */
router.patch('/quantity/decrement/:productId/:variantId', authenticateUser, validateDecrementCartQuantity, decrementCartItemQuantity );


router.delete("/remove/:productId/:variantId", authenticateUser, validateRemoveCartItem, removeCartItem)


export default router