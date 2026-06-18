import express from 'express'
import { authenticateSeller } from '../middlewares/auth.middleware.js'
import { createProduct, getAllProducts, getSellerProducts, getProductDetails, addProductVariant, getProductsByCategory, bulkUploadProducts, searchProducts } from '../controllers/product.controller.js'
import multer from 'multer'
import { createProductValidator } from '../validator/product.validator.js'
// import { bulkUploadProducts } from '../../../Frontend/Frontend/src/app/features/products/services/product.api.js'


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024  // 5 MB
    }
})


const router = express.Router();


/**
 * @route POST /api/products
 * @description Create a new product
 * @access Private (Seller only)
 */
router.post("/", authenticateSeller, upload.array('images', 7), createProductValidator, createProduct)


/**
 * @route GET /api/proudcts/seller
 * @description Get all product of the authentical seller
 * @access Private (Seller only)
 */
router.get("/seller", authenticateSeller, getSellerProducts)


/**
 * @route GET /api/products
 * @description Get all products
 * @access Public
 */
router.get("/", getAllProducts )


router.get("/category/:category", getProductsByCategory)

router.get("/search", searchProducts)

/**
 * @route GET /api/products/detail/:id
 * @description Get product deatils by ID
 * @access Public
 */
router.get("/detail/:id", getProductDetails)


/**
 * @route post /api/products/:productId/variants
 * @description Add a new variant to a product
 * @access Private (Seller only)
 */
router.post("/:productId/variants", authenticateSeller, upload.array('image', 7), addProductVariant )


router.post("/bulk-upload", authenticateSeller, upload.single("file"), bulkUploadProducts)


export default router;


