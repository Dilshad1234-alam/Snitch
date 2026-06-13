import express from 'express'

import { authenticateUser }  from '../middlewares/auth.middleware.js'
import { addWishlistItem, getWishlist, removeWishlistItem } from '../controllers/wishlist.controller.js'

const router = express.Router()

router.post("/add", authenticateUser, addWishlistItem)

router.get("/", authenticateUser, getWishlist)

router.delete("/remove", authenticateUser, removeWishlistItem)


export default router;