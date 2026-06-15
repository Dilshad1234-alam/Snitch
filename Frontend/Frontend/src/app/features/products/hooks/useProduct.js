import { addProductVariant, bulkUploadProducts, createProduct, getAllProducts, getProductById, getProductsByCategory, getSellerProduct } from "../services/product.api";
import { useDispatch } from "react-redux";
import {  setProducts, setSellerProducts } from "../state/product.slice";

export const useProduct = () => {

    const dispatch = useDispatch()

    async function handleCreateProduct(formData) {
        const data = await createProduct(formData)
        return data.product;
    }

    async function handleGetSellerProduct() {
        const data = await getSellerProduct()
        dispatch(setSellerProducts(data.products))
        return data.products;
    }

    async function handleGetAllProducts() {
        const data = await getAllProducts()
        dispatch(setProducts(data.products))
    }

    async function handleGetProductById(productId) {
        const data = await getProductById(productId)
        return data.product
    }

    async function handleAddProductVariant(productId, newProductVariant) {
        const data = await addProductVariant(productId, newProductVariant)

        return data 
    }

    async function handleGetProductsByCategory(category) {
        const data = await getProductsByCategory(category)
        return data.products
    }

    async function handleBulkUpload (formData) {
        const data = await bulkUploadProducts(formData)
        return data;
    }

    return { 
        handleCreateProduct, 
        handleGetSellerProduct, 
        handleGetAllProducts, 
        handleGetProductById, 
        handleAddProductVariant, 
        handleGetProductsByCategory ,
        handleBulkUpload
    }
}