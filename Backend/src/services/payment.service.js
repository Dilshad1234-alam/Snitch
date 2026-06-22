import Razorpay from 'razorpay'
import {  config} from '../config/config.js'

const razorpay = new Razorpay({
    key_id: config.RAZORPAY_KEY_ID,
    key_secret: config.RAZORPAY_KEY_SECRET
})

export const createOrder = async ({amount, currency = "INR"}) => {

    const options = {
        amount: Number(amount) * 100, // Amount in paise
        currency,
        receipt: `receipt_${Date.now()}`
    }

    return await razorpay.orders.create(options)

    // const order = await razorpay.orders.create(options);

    // return order;
};