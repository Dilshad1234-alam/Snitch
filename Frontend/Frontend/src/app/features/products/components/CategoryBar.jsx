import { Link } from "react-router";

const CategoryBar = () => {
    return (
        <div className="flex justify-center gap-8 px-8 py-4 border-b" style={{color: '#1b1c1a', borderColor: '#C9A96E' }}>

            {/* <Link to="/">Home</Link>
            <Link to="/">Product</Link> */}
            <Link to="/category/all">
                All
            </Link>

            <Link to="/category/shirt">
                Shirt
            </Link>

            <Link to="/category/tshirt">
                T-Shirt
            </Link>

            <Link to="/category/jeans">
                Jeans
            </Link>

            <Link to="/category/trousers">
                Trousers
            </Link>

        </div>
    );
};

export default CategoryBar;