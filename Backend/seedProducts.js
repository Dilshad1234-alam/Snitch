import mongoose from "mongoose";
import dotenv from "dotenv";

import productModel from "./src/models/product.model.js";
import products from "./products.json" with { type: "json" };

dotenv.config();

const SELLER_ID = new mongoose.Types.ObjectId("6a02dd99b2c41006f661a07f");

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");

        await productModel.deleteMany({});

        const productsWithSeller = products.map(product => ({
            ...product,
            seller: SELLER_ID,

            variants: product.variants?.map(v => ({
                ...v,
                stock: v.stock ?? 0,
                price: v.price ?? product.price
            })) || []
        }));

        await productModel.insertMany(productsWithSeller);

        console.log(`${productsWithSeller.length} Products inserted successfully`);

        process.exit(0);

    } catch (error) {
        console.error("Seed Error:", error);
        process.exit(1);
    }
}

seed();