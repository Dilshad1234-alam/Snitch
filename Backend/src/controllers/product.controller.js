import productModel from '../models/product.model.js'
import { uploadFile } from '../services/storage.service.js';
import XLSX from 'xlsx'


export async function createProduct(req, res) {
    
    const { title, description, category, priceAmount, priceCurrency } = req.body 
    console.log(req.body);
    const seller = req.user; 

    const files = req.files || []

    const images = await Promise.all(files.map(async (file) => {
        return await uploadFile({
            buffer: file.buffer,
            fileName: file.originalname 
        })
    }))

    const product = await productModel.create({
        title,
        description,
        category,
        price: {
            amount: priceAmount,
            currency: priceCurrency || "INR"
        },
        images,
        seller: seller._id
    });

    res.status(201).json({
        message: "Product created successfully",
        success: true,
        product,
    })
}


export async function getSellerProducts(req, res ) {
    const seller = req.user;

    const products = await productModel.find({ seller: seller._id });

    res.status(200).json({
        message: "Products fetched successfully",
        products
    })
}


export async function getAllProducts(req, res) {

    const products = await productModel.find() 

    return res.status(200).json({
        message: "Products fetched successfully",
        success: true,
        products
    })
}


export  async function getProductDetails(req, res) {
    const  { id} = req.params;

    const product = await productModel.findById(id)

    if (!product) {
        return res.status(404).json({
            message: "Product not found",
            success: false
        })
    }

    return res.status(200).json({
        message: "Product details fetched successfully",
        success: true,
        product
    })
}


export async function addProductVariant(req, res) {


    const productId = req.params.productId;

    const product = await productModel.findOne({
        _id: productId,
        seller: req.user._id
    })

    if (!product) { 
        return res.status(404).json({
            message: "Product not found",
            success: false
        })
    }
 
    const files = req.files;
    const images = [];
    if (files || files.length !== 0) {
        (await Promise.all(files.map(async (file) => {
            const image = await uploadFile({
                buffer: file.buffer,
                fileName: file.originalname
            })
            return image 
        }))).map(image => images.push(image))
    }

    const price = req.body.priceAmount
    const stock = req.body.stock
    const attributes = JSON.parse(req.body.attributes || "{}")

    // console.log(product, images, price, stock, attributes);

    console.log(price)

    product.variants.push({
        images,
        price: {
            amount: Number(price) || product.price.amount,
            currency: req.body.priceCurrency || product.price.currency
        },
        stock,
        attributes
    })

    await product.save();

    return res.status(200).json({
        message: "Product variant added successfully",
        success: true,
        product
    })
    
}


export const getProductsByCategory = async (req, res) => {

    const { category } = req.params;

    let products;

    if (category === "all") {
        products = await productModel.find();
    } else {
        products = await productModel.find({
                category
            });
    }

    res.status(200).json({
        success: true,
        products
    });
};



export const bulkUploadProducts = async (req, res) => {

    try {

        const sellerId = req.user._id;

        const file = req.file;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "File required"
            });
        }

        let products = [];

        // JSON Upload
        if (file.originalname.endsWith(".json")) {

            products = JSON.parse(
                file.buffer.toString()
            );

        }

        // Excel Upload
        else if (
            file.originalname.endsWith(".xlsx") ||
            file.originalname.endsWith(".csv")
        ) {

            const workbook = XLSX.read(
                file.buffer,
                { type: "buffer" }
            );

            const sheet =
                workbook.Sheets[
                workbook.SheetNames[0]
                ];

            products =
                XLSX.utils.sheet_to_json(sheet);
        }

        const formattedProducts = products.map(product => {

            const amount = Number(product.price?.amount);

            if (isNaN(amount)) {
                throw new Error(
                    `Invalid price in product: ${product.title}`
                );
            }

            return {
                title: product.title,
                category: product.category,
                description: product.description,

                seller: sellerId,

                price: {
                    amount,
                    currency: product.price?.currency || "INR"
                },

                images:
                    product.images?.length > 0
                        ? product.images
                        : [
                            {
                                url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
                            }
                        ]
                };
            });

        await productModel.insertMany(
            formattedProducts
        );

        return res.status(201).json({
            success: true,
            count: formattedProducts.length,
            message:
                "Products uploaded successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

