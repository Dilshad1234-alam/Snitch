import { useDispatch } from 'react-redux'
import { addWishlistApi, getWishlistApi, removeWishlistApi } from '../services/wishlist.api';
import { setWishlist } from '../state/wishlist.slice';

export const useWishlist = () => {
    const dispatch = useDispatch();

    async function handleGetWishlist() {
        const data = await getWishlistApi();
        
        dispatch(setWishlist({ items: data.wishlist?.items || [] }));
    }

    async function handleAddWishlist({ productId, variantId }) {
        await addWishlistApi({ productId, variantId });
        const data = await getWishlistApi()
        dispatch(setWishlist({ items: data.wishlist?.items || [] }));
    }

    async function handleRemoveWishlist({ productId, variantId }) {
        await removeWishlistApi({ productId, variantId });
        const data = await getWishlistApi()
        dispatch(setWishlist({ items: data.wishlist?.items || [] }));
    }

    return {
        handleGetWishlist,
        handleAddWishlist,
        handleRemoveWishlist
    };
};