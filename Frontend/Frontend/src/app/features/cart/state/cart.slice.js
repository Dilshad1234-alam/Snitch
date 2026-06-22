import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        totalPrice: null,
        currency: null,
        items: [],
    },
    reducers: {
        setCart: (state, action) => {
            state.items = action.payload.items || []
            state.totalPrice = action.payload.totalPrice || 0
            state.currency = action.payload.currency || "INR"
        },
        addItem: (state, action) => {
            state.items.push(action.payload)
        },
        incrementCartItemQuantity: (state, action) => {
            const { productId, variantId } = action.payload

            const item = state.items.find(item => item.product._id?.toString() === productId?.toString() && item.variant?.toString() === variantId?.toString() )

            if (item) {
                item.quantity += 1
                state.totalPrice += item.price.amount
            }
        },
        decrementCartItemQuantity: (state, action) => {
            const { productId, variantId } = action.payload

            const item = state.items.find( item => item.product._id?.toString() === productId?.toString() && item.variant?.toString() === variantId?.toString() )

            if (item && item.quantity > 1) {
                item.quantity -= 1
                state.totalPrice -= item.price.amount
            }
        },
        removeCartItem: (state, action) => {
            const { productId, variantId } = action.payload

            state.items = state.items.filter(item => 
                !(
                    item.product._id?.toString() === productId?.toString() && 
                    item.variant?.toString() === variantId?.toString()
                )
            )
        }
    }
})

export const { setCart, addItem, incrementCartItemQuantity, decrementCartItemQuantity, removeCartItem } = cartSlice.actions
export default cartSlice.reducer