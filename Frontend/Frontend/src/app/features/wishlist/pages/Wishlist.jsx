import { useSelector } from "react-redux";
import { useWishlist } from "../hook/useWishlist";
import { useEffect } from "react";

const Wishlist = () => {
    const wishlistItems = useSelector( (state) => state.wishlist.items );
    console.log(wishlistItems);
    

    const { handleGetWishlist, handleRemoveWishlist } = useWishlist();

    useEffect(() => {
        handleGetWishlist();
    }, []);

    return (
        <div className="px-8 lg:px-16 py-10">
            <h1
                className="text-3xl mb-8"
                style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#1b1c1a",
                }}
            >
                Wishlist
            </h1>


            {wishlistItems.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">

                    {wishlistItems.map((item) => (
                        <div key={item._id}
                            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                        >
                            <img
                                src={
                                    item.selectedVariant?.images?.[0]?.url ||
                                    item.product?.images?.[0]?.url
                                    // "https://via.placeholder.com/300x400?text=No+Image"
                                }
                                alt={item.product?.title || "Product"}
                                className="w-full h-82 object-cover"
                            />

                            <div className="p-4">
                                <h3
                                    className="text-lg font-medium"
                                    style={{
                                        fontFamily:
                                            "'Cormorant Garamond', serif",
                                        color: "#1b1c1a",
                                    }}
                                >
                                    {item.product?.title}
                                </h3>

                                <p
                                    className="mt-2"
                                    style={{
                                        fontFamily:
                                            "'Cormorant Garamond', serif",
                                        color: "#1b1c1a",
                                    }}
                                >
                                    ₹{item.selectedVariant?.price?.amount || item.product?.price?.amount}
                                </p>
                                <button
                                    onClick={() =>{
                                        if (!item.product) return;

                                        handleRemoveWishlist({
                                            productId: item.product._id,
                                            variantId: item.variant
                                        })
                                    }}
                                    className="mt-3 bg-red-500 text-white px-3 py-2 rounded"
                                >
                                   Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;