import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useProduct } from "../hooks/useProduct";

const CategoryProducts = () => {

    const { category } = useParams();

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
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-1 gap-y-8 pt-10" >

            {products.map(product => (


                <div  
                    key={product._id} 
                    className="group cursor-pointer flex flex-col max-w-[280px] mx-auto" 
                >

                   {/* <div  className="aspect-[4/5] overflow-hidden mb-4"> */}

                    <img 
                        src={ product.images?.[0]?.url }
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* </div> */}


                    <h2 
                        className="text-xl leading-snug transition-colors duration-300 group-hover:text-[#C9A96E]" 
                        style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                color: "#1b1c1a",
                            }}
                    >
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