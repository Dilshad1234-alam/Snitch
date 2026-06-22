import { useSelector } from "react-redux";
import { useWishlist } from "../hook/useWishlist";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Wishlist = () => {
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const { handleGetWishlist, handleRemoveWishlist } = useWishlist();
    const navigate = useNavigate();

    useEffect(() => {
        handleGetWishlist();
    }, []);

    return (
        <div className="min-h-screen bg-[#fbf9f6] px-4 sm:px-8 lg:px-16 py-8 sm:py-10">
            <h1
                className="text-2xl sm:text-3xl mb-6 sm:mb-8"
                style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#1b1c1a",
                }}
            >
                Wishlist
            </h1>

            {wishlistItems.length === 0 ? (
                <p className="text-sm text-[#7A6E63]">
                    Your wishlist is empty.
                </p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-6">
                    {wishlistItems.map((item) => {
                        const imageUrl =
                            item.selectedVariant?.images?.[0]?.url ||
                            item.product?.images?.[0]?.url ||
                            "/snitch_editorial_warm.png";

                        return (
                            <div
                                key={item._id}
                                className="border bg-white overflow-hidden shadow-sm hover:shadow-md active:scale-95 transition-all duration-300"
                            >
                                <div
                                    onClick={() => {
                                        if (item.product?._id) {
                                            navigate(`/product/${item.product._id}`);
                                        }
                                    }}
                                    className="cursor-pointer"
                                >
                                    <img
                                        src={imageUrl}
                                        alt={item.product?.title || "Product"}
                                        className="w-full aspect-[4/5] object-cover"
                                    />
                                </div>

                                <div className="p-2 sm:p-4">
                                    <h3
                                        onClick={() => {
                                            if (item.product?._id) {
                                                navigate(`/product/${item.product._id}`);
                                            }
                                        }}
                                        className="text-sm sm:text-lg font-medium line-clamp-2 cursor-pointer hover:text-[#C9A96E]"
                                        style={{
                                            fontFamily: "'Cormorant Garamond', serif",
                                            color: "#1b1c1a",
                                        }}
                                    >
                                        {item.product?.title}
                                    </h3>

                                    <p
                                        className="mt-1 sm:mt-2 text-xs sm:text-base"
                                        style={{
                                            fontFamily: "'Cormorant Garamond', serif",
                                            color: "#1b1c1a",
                                        }}
                                    >
                                        ₹{" "}
                                        {item.selectedVariant?.price?.amount ||
                                            item.product?.price?.amount}
                                    </p>

                                    <button
                                        onClick={() => {
                                            if (!item.product) return;

                                            handleRemoveWishlist({
                                                productId: item.product._id,
                                                variantId: item.variant,
                                            });
                                        }}
                                        className="mt-3 w-full bg-red-500 text-white px-2 sm:px-3 py-2 rounded text-xs sm:text-sm active:scale-95 transition"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Wishlist;