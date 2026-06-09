import Razorpay from 'razorpay'
import {  config} from '../config/config.js'

const razorpay = new Razorpay({
    key_id: config.REZORPAY_KEY_ID,
    key_secret: config.REZORPAY_KEY_SECRET
})

export const createOrder = async (amount, currency = "INR") => {
    const options = {
        amount: amount * 100, // Amount in paise
        currency,
    }

    const order = await razorpay.orders.create(options);

    return order;
};