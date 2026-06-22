import cartModel from '../models/cart.models.js'
import productModel from '../models/product.model.js'
import { stockofVariant }  from '../dao/product.dao.js'
import { createOrder } from '../services/payment.service.js'
import { getCartDetails } from '../dao/cart.dao.js'
import paymentModel from '../models/payment.models.js'
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils.js'

import { config } from '../config/config.js'



export const addToCart = async (req, res) => {

    const { productId, variantId } = req.params
    const { quantity = 1 } = req.body

    const addQuantity = Number(quantity);

    const product = await productModel.findOne({
        _id: productId,
        "variants._id": variantId
    })

    if (!product) {
        return res.status(404).json({
            message: "Product or variant not found",
            success: false
        })
    }

    const selectedVariant = product.variants.id(variantId);

    if (!selectedVariant) {
    return res.status(404).json({
        message: "Variant not found",
        success: false
    });
}

    const stock = await stockofVariant(productId, variantId)

    const cart = await cartModel.findOne({ user: req.user._id }) || (await cartModel.create({ user: req.user._id, items: [] }))


    const existingItem = cart.items.find(
        item =>
            item.product.toString() === productId &&
            item.variant.toString() === variantId
    );

     if (existingItem) {
        const quantityInCart = existingItem.quantity;

        if (quantityInCart + addQuantity > stock) {
            return res.status(400).json({
                message: `Only ${stock} items left in stock and you already have ${quantityInCart} items in your cart`,
                success: false
            });
        }

        existingItem.quantity += addQuantity;
    } else {
        if (addQuantity > stock) {
            return res.status(400).json({
                message: `Only ${stock} items left in stock`,
                success: false
            });
        }

        cart.items.push({
            product: productId,
            variant: variantId,
            quantity: addQuantity,
            price: selectedVariant.price || product.price
        });
    }


    // const isProductAlreadyInCart = cart.items.some(item => item.product.toString() === productId && item.variant.toString() === variantId)

    // if (isProductAlreadyInCart) {
    //     const quantityInCart = cart.items.find(item => item.product.toString() === productId && item.variant.toString() === variantId).quantity
    //     if (quantityIncart + Quantity > stock) {
    //         return res.status(400).json({
    //             message: `Only ${stock} items left in stock. and you already have ${quantityIncart} items in your cart`,
    //             success: false
    //         })
    //     }

    //     await cartModel.findOneAndUpdate(
    //         { user: req.user._id, "items.product": productId, "items.variant": variantId },
    //         { $inc: { "items.$.quantity": quantity } },
    //         { new: true }
    //     )

    //     return res.status(200).json({
    //         message: "cart updated successfully",
    //         success: true
    //     })
    // }

    // if (quantity > stock) {
    //     return res.status(400).json({
    //         message: `Only ${stock} items left in stock`,
    //         success: false
    //     })
    // }

    // cart.items.push({
    //     product: productId,
    //     variant: variantId,
    //     quantity,
    //     price: product.price
    // })

    await cart.save()

    return res.status(200).json({
        message: "Item added to cart successfully",
        success: true
    })

}

export const getCart = async (req, res) => {
    const user = req.user

    let cart = await getCartDetails(user._id)


    if (!cart) {
        cart = await cartModel.create({ user: user._id })
    }

    return res.status(200).json({
        message: "Cart fetched successfully",
        success: true,
        cart
    })
}

export const createOrderController = async (req, res) => {
    const cartData = await getCartDetails(req.user._id);
    const cart = cartData?.[0];

    if (!cart || !cart.items || cart.items.length === 0) {
        return res.status(404).json({
            message: "Cart is empty",
            success: false
        });
    }

    let totalPrice = 0;

    const orderItems = cart.items.map(item => {
        const product = item.product;

        const variant = Array.isArray(product.variants)
            ? product.variants.find(
                v => v._id.toString() === item.variant.toString()
            )
            : product.variants;

        const price = variant?.price || item.price || product.price;

        const images =
            variant?.images?.length > 0
                ? variant.images
                : product.images;

        totalPrice += Number(price.amount) * Number(item.quantity);

        return {
            title: product.title,
            productId: product._id,
            variantId: item.variant,
            quantity: item.quantity,
            images,
            description: product.description,
            price: {
                amount: Number(price.amount),
                currency: price.currency || "INR"
            }
        };
    });

    console.log("TOTAL PRICE:", totalPrice);

    const order = await createOrder({
        amount: totalPrice,
        currency: "INR"
    });

    await paymentModel.create({
        user: req.user._id,
        razorpay: {
            orderId: order.id,
        },
        price: {
            amount: totalPrice,
            currency: "INR"
        },
        orderItems
    });

    return res.status(200).json({
        message: "Order created successfully",
        success: true,
        order
    });
};

export const incrementCartItemQuantity = async (req, res) => {
    const { productId, variantId } = req.params

    const product = await productModel.findOne({
        _id: productId,
        "variants._id": variantId
    })

    if (!product) {
        return res.status(404).json({
            message: "Product or variant not found",
            success: false
        })
    }

    const cart = await cartModel.findOne({ user: req.user._id })

    if (!cart) {
        return res.status(404).json({
            message: "Cart not found",
            success: false
        })
    }

    const stock = await stockofVariant(productId, variantId)

    const itemQuantityInCart = cart.items.find(item => item.product.toString() === productId && item.variant?.toString() === variantId)?.quantity || 0

    if (itemQuantityInCart + 1 > stock) {
        return res.status(400).json({
            message: `Only ${stock} items left in stock. and you already have ${itemQuantityInCart} items in your cart`,
            success: false
        })
    }

    await cartModel.findOneAndUpdate(
        { user: req.user._id, "items.product": productId, "items.variant": variantId },
        { $inc: { "items.$.quantity": 1 } },
        { new: true }
    )

    return res.status(200).json({
        message: "Cart item quantity incremented successfully",
        success: true
    })
}

export const decrementCartItemQuantity = async (req, res) => {
    const { productId, variantId } = req.params

    const cart = await cartModel.findOne({ user: req.user._id })

    if (!cart) {
        return res.status(404).json({
            message: "Cart not found",
            success: false 
        })
    }

    const itemQuantityInCart = cart.items.find(item => item.product.toString() === productId && item.variant.toString() === variantId)?.quantity || 0

    if (itemQuantityInCart - 1 < 1) {
        return res.status(400).json({
            message: "Quantity cannot be less than 1",
            success: false
        })
    }

    await cartModel.findOneAndUpdate(
        { user: req.user._id, "items.product": productId, "items.variant": variantId },
        { $inc: { "items.$.quantity": -1} },
        { new: true}
    )

    return res.status(200).json({
        message: "Cart item quantity decremented successfully",
        success: true
    })
}

export const removeCartItem = async (req, res) => {
    const { productId, variantId } = req.params

    await cartModel.findOneAndUpdate(
        { user: req.user._id },
        { $pull: { items: { product: productId, variant: variantId  }}},
        { new: true }
    )

    return res.status(200).json({
        message: "Cart item removed successfully",
        success: true
    })

    
}

export const verifyOrderController = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

    const payment = await paymentModel.findOne({
        "razorpay.orderId": razorpay_order_id,
        status: "pending",
    })

    if (!payment) {
        return res.status(404).json({
            message: "Payment not found", 
            success: false
        })
    }

    const isPatmentValid = validatePaymentVerification({
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
    }, razorpay_signature, config.RAZORPAY_KEY_SECRET)

    if (!isPatmentValid) {
        return res.status(400).json({
            message: "Payment verification failed",
            success: false
        })
    }

    payment.status = "paid",
    payment.razorpay.paymentId = razorpay_payment_id,
    payment.razorpay.signature = razorpay_signature

    await payment.save()

    await cartModel.findOneAndUpdate(
        { user: payment.user },
        { $set: { items: [] } }
    )

    return res.status(200).json({
        message: "payment verified successfully",
        success: true
    })
}

