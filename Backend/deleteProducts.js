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

        const option = await ask("Choose option (1/2): ");

        let result;

        if (option === "1") {

            
            const category = await ask("Category: ");
            
            const count = await productModel.countDocuments({ category });
            
            console.log(`Found ${count} products`);
            
            const confirm = await ask(
                "Delete ALL products? (yes/no): "
            );
            
            if (confirm.toLowerCase() !== "yes") {
                console.log("Cancelled");
                process.exit(0);
            }

            result = await productModel.deleteMany({
                category
            });
            
        } else if (option === "2") {
            const count = await productModel.countDocuments();

            console.log(`Total Products: ${count}`);

            const confirm = await ask( " Delete ENTIRE products collection? (yes/no): " );

            if (confirm.toLowerCase() !== "yes") { console.log("Cancelled"); process.exit(0); }

            result = await productModel.deleteMany({})
        } else {
            console.log("Invalid option"); process.exit(0);
        }


        // const result = await productModel.deleteMany({
        //     category
        // });

        console.log(
            `✅ ${result.deletedCount} products deleted`
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