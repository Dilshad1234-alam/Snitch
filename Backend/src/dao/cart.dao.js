import mongoose from 'mongoose'
import cartModel from '../models/cart.models.js'

export async function getCartDetails(userId) {
    let cart = await cartModel.aggregate([
        { $match: { user: userId } },

        { $unwind: { path: '$items' } },
        {
          $lookup: {
            from: 'products',
            localField: 'items.product',
            foreignField: '_id',
            as: 'items.product'
          }
        },
        { $unwind: { path: '$items.product' } },
        {
          $unwind: { path: '$items.product.variants' }
        },
        {
          $match: {
            $expr: {
              $eq: [
                '$items.variant',
                '$items.product.variants._id'
              ]
            }
          }
        },

        {
          $addFields: {
            "items.selectedVariant": "$items.product.variants",
          },
        },
        
        {
          $addFields: {
            itemsPrice: {
              price: {
                $multiply: [
                  '$items.quantity',
                  '$items.product.variants.price.amount'
                ]
              },
              currency:
                '$items.product.variants.price.currency'
            }
          }
        },
        {
          $group: {
            _id: '$_id',
            totalPrice: { $sum: '$itemsPrice.price' },
            currency: {
              $first: '$itemsPrice.currency'
            },
            items: { $push: '$items' }
          }
        }
    ])
    return cart
}