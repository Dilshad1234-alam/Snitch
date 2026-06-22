import { Link } from "react-router";

const CategoryBar = () => {
    return (
        <div
            className="
                flex
                justify-center
                items-center
                gap-4 sm:gap-6 lg:gap-8
                px-4 sm:px-8
                py-4
                border-b
                overflow-x-auto
                whitespace-nowrap
                scrollbar-hide
            "
            style={{
                color: "#1b1c1a",
                borderColor: "#C9A96E",
            }}
        >
            <Link
                to="/category/all"
                className="text-xs sm:text-sm hover:text-[#C9A96E] transition-colors"
            >
                All
            </Link>

            <Link
                to="/category/shirt"
                className="text-xs sm:text-sm hover:text-[#C9A96E] transition-colors"
            >
                Shirt
            </Link>

            <Link
                to="/category/tshirt"
                className="text-xs sm:text-sm hover:text-[#C9A96E] transition-colors"
            >
                T-Shirt
            </Link>

            <Link
                to="/category/jeans"
                className="text-xs sm:text-sm hover:text-[#C9A96E] transition-colors"
            >
                Jeans
            </Link>

            <Link
                to="/category/trousers"
                className="text-xs sm:text-sm hover:text-[#C9A96E] transition-colors"
            >
                Trousers
            </Link>
        </div>
    );
};

export default CategoryBar;