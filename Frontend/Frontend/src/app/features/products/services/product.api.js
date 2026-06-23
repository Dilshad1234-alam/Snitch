import axios from "axios";

const productApiInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/products`,
    withCredentials: true,
})

export async function createProduct(formData) {
    const response = await productApiInstance.post("/", formData)
    
    return response.data
}

export async function getSellerProduct() {
    const response = await productApiInstance.get("/seller")

    return response.data
}

export async function getAllProducts() {
    const response = await productApiInstance.get("/")

    return response.data
}

export async function getProductById(productId) {
    const response = await productApiInstance.get(`/detail/${productId}`)
    return response.data   
}


export async function searchProductsApi(query) {
    const response = await productApiInstance.get(`/search?query=${query}`)

    return response.data
} 


export async function addProductVariant(productId, newProductVariant) {

    const formData = new FormData()

    newProductVariant.images.forEach((image) => {
        formData.append(`image`, image.file)
    })

    formData.append("stock", newProductVariant.stock)
    formData.append("priceAmount", newProductVariant.price)
    formData.append("attributes", JSON.stringify(newProductVariant.attributes))

    const response = await productApiInstance.post(`/${productId}/variants`, formData)

    return response.data

}

export async function getProductsByCategory( category ) {

    const response = await productApiInstance.get( `/category/${category}` );

    return response.data;
}

export async function bulkUploadProducts (formData ) {
    const response = await productApiInstance.post("/bulk-upload", formData)

    return response.data
}
