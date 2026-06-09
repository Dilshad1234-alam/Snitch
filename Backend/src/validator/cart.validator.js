import { param, body, validationResult } from 'express-validator'

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next();
    
}

export const validateAddToCart = [
    param("productId").isMongoId().withMessage("Invalid product ID"),
    param("variantId").optional().isMongoId().withMessage("Invalid varaint ID"),
    body("quantity").optional().isInt({ min: 1 }).withMessage("Quantitu must be at" ),
    validateRequest
]

export const validateIncrementCartQuantity = [
    param("productId").isMongoId().withMessage("Invalid product ID"),
    param("variantId").optional().isMongoId().withMessage("Invalid variant ID"),
    validateRequest
]

