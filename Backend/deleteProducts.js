import mongoose from "mongoose";
import dotenv from "dotenv";
import readline from "readline";
import productModel from "./src/models/product.model.js";

dotenv.config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => {
        rl.question(question, answer => resolve(answer));
    });
}

async function deleteProducts() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const category = await ask("Category: ");
        const serialInput = await ask(
            "Serial Numbers (example 8,9,20): "
        );

        const serialNumbers = serialInput
            .split(",")
            .map(num => Number(num.trim()))
            .filter(Boolean);

        const products = await productModel
            .find({ category })
            .sort({ createdAt: 1 });

        const idsToDelete = serialNumbers
            .map(serial => products[serial - 1]?._id)
            .filter(Boolean);

        if (idsToDelete.length === 0) {
            console.log("No valid products found.");
            process.exit(0);
        }

        console.log(
            `Found ${idsToDelete.length} products to delete`
        );

        const confirm = await ask(
            "Delete these products? (yes/no): "
        );

        if (confirm.toLowerCase() !== "yes") {
            console.log("Cancelled");
            process.exit(0);
        }

        const result = await productModel.deleteMany({
            _id: { $in: idsToDelete }
        });

        console.log(
            `✅ ${result.deletedCount} products deleted`
        );

        const remaining = await productModel.countDocuments({
            category
        });

        console.log(
            `📦 Remaining ${category} products: ${remaining}`
        );

        rl.close();
        process.exit(0);

    } catch (error) {
        console.error(error);
        rl.close();
        process.exit(1);
    }
}

deleteProducts();