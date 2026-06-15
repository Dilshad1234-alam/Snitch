import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useProduct } from "../hooks/useProduct";

const CategoryProducts = () => {

    const { category } = useParams();

    const [products, setProducts] = useState([]);

    const { handleGetProductsByCategory } = useProduct();

    useEffect(() => {

        async function load() {

            const data =
                await handleGetProductsByCategory(
                    category
                );

            setProducts(data);
        }

        load();

    }, [category]);

    return (
        <div className="grid grid-cols-4 gap-6 p-6">

            {products.map(product => (

        //         <Link key={product._id}
        // to={`/products/${product._id}`}>

                <div
                    key={product._id}
                    className="border p-4"
                    >

                    <img
                        src={
                            product.images?.[0]?.url
                        }
                        alt=""
                        className="h-60 w-full object-cover"
                        />

                    <h2>
                        {product.title}
                    </h2>

                    <p>
                        ₹
                        {product.price?.amount}
                    </p>

                </div>
                // </Link>

            ))}

        </div>
    );
};

export default CategoryProducts;