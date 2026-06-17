import Wishlist from '../models/wishlist.model.js'
import Product from '../models/product.model.js'

export const addWishlistItem = async (req, res) => {
    try {
        console.log("WISHLIST BODY:", req.body);
        const userId = req.user.id;
        const { productId, variantId } = req.body;

        let wishlist = await Wishlist.findOne({
          user: userId,
        });

        if (!wishlist) {
            wishlist = await Wishlist.create({
                user: userId,
                items: [],
            });
        }

        const exists = wishlist.items.find( item => item.product.toString() === productId && item.variant.toString() === variantId );

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Already in wishlist",
            });
        }

        wishlist.items.push({ product: productId, variant: variantId, });

        await wishlist.save();

        await wishlist.populate("items.product")

        const items = wishlist.items.map(item => {
            if (!item.product) {
                return {
                    ...item.toObject(),
                    selectedVariant: null,
                };
            }

            const variant = item.product.variants.find(
                v => v._id.toString() === item.variant.toString()
            );

            return {
                ...item.toObject(),
                selectedVariant: variant || null,
            };
        });

        res.json({
            success: true,
            message: "Added to wishlist",
            wishlist: {
                ...wishlist.toObject(),
                items,
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    
    }
};

export const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({
            user: req.user.id,
        }).populate("items.product");

        if (!wishlist) {
            return res.json({
                success: true,
                wishlist: {
                    items: [],
                },
            });
        }

        const items = wishlist.items.map(item => {
            if (!item.product) {
                return {
                    ...item.toObject(),
                    selectedVariant: null,
                };
            }

            const variant = item.product.variants?.find(
                v => v._id.toString() === item.variant.toString()
            );

            return {
                ...item.toObject(),
                selectedVariant: variant || null,
            };
        });

        res.json({
            success: true,
            wishlist: {
                ...wishlist.toObject(),
                items,
            },
        });

    } catch (error) {
        console.error("GET WISHLIST ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const removeWishlistItem = async (req, res) => {
    try {
        const { productId, variantId } = req.body;

        const wishlist = await Wishlist.findOne({ user: req.user.id,});

        wishlist.items = wishlist.items.filter( item =>
            !(
                item.product.toString() === productId &&
                item.variant.toString() === variantId
            )
        );

        await wishlist.save();

        await wishlist.populate("items.product")

        const items = wishlist.items.map(item => {
            if (!item.product) {
                return {
                    ...item.toObject(),
                    selectedVariant: null,
                };
            }
            const variant = item.product.variants.find(
                v => v._id.toString() === item.variant.toString()
            );

            return {
                ...item.toObject(),
                selectedVariant: variant || null,
            };
        });

        res.json({
            success: true,
            message: "Removed from wishlist",
            wishlist: {
                ...wishlist.toObject(),
                items,
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};