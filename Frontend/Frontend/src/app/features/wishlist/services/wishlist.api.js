import axios from 'axios'

const wishlistApiInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/wishlist`,
    withCredentials: true,
})

export const addWishlistApi = async ({ productId, variantId }) => {
    const { data } = await wishlistApiInstance.post("/add", { productId, variantId });

    return data;
};

export const getWishlistApi = async () => {
    const { data } = await wishlistApiInstance.get("/");
    return data;
};

export const removeWishlistApi = async ({ productId, variantId }) => {
    const { data } = await wishlistApiInstance.delete("/remove", {
        data: { productId, variantId }
    });

    return data;
};