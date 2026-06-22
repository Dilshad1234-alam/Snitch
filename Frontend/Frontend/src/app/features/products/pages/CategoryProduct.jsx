import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useProduct } from "../hooks/useProduct";
import Footer from "../components/Footer";

const CategoryProducts = () => {

    const { category } = useParams();
    const navigate = useNavigate()

    const [products, setProducts] = useState([]);

    const { handleGetProductsByCategory } = useProduct();

    useEffect(() => {

        async function load() {

            const data = await handleGetProductsByCategory( category );

            setProducts(data);
        }

        load();

    }, [category]);

    return (
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x- gap-y-8 pt-10" >

            {products.map(product => (

                <div 
                    key={product._id} 
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="group cursor-pointer flex flex-col max-w-[250px] mx-auto transition-transform duration-700 group-hover:scale-105" >

                    <img src={ product.images?.[0]?.url } alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                    <h2 
                        className="text-xl leading-snug transition-colors duration-300 group-hover:text-[#C9A96E]" 
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1b1c1a", }}
                    >
                        {product.title}
                    </h2>


                    <p style={{color: "#1b1c1a"}}>
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