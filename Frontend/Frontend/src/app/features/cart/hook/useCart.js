import { addItem, createCartOrder, getCart, incrementCartItemQuantityApi } from '../sevices/cart.api'
import { useDispatch } from 'react-redux'
import { addItem as addItemToCart, setCart, incrementCartItemQuantity } from '../state/cart.slice'



export const useCart = () => {

    const dispatch = useDispatch()

    async function handleAddItem({ productId, variantId }) {
        const data = await addItem({ productId, variantId })
        // dispatch(addItemToCart(data.item))
        return data
    }  

    async function handleGetCart() {
        const data = await getCart()
        console.log(data)
        dispatch(setCart(data.cart[0]))
    }

    async function handleIncrementCartItemQuantity({ productId, variantId }) {
        const data = await incrementCartItemQuantityApi({ productId, variantId })
        dispatch(incrementCartItemQuantity({ productId, variantId }))
    }

    async function handleCreateCartOrder() {
        const data = await createCartOrder()
        return data
    }

    async function handleVerifyCartOrder({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
        const data = await verifyCartOrder({ razorpay_order_id, razorpay_payment_id, razorpay_signature })
        return data.success
    }



    return {
        handleAddItem,
        handleGetCart,
        handleIncrementCartItemQuantity,
        handleCreateCartOrder,
        handleVerifyCartOrder
    }
}   
  
