import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaGoogle } from 'react-icons/fa'


const banners = [
    { title: "", image: "https://ik.imagekit.io/Dilshad/snitch/1780900330.webp", path: "/category/shirt" },
    { title: "", image: "https://ik.imagekit.io/Dilshad/snitch/1781006299.webp", path: "/category/tshirt" },
    { title: "", image: "https://ik.imagekit.io/Dilshad/snitch/1780405487.webp", path: "/category/jeans" },
    { title: "", image: "https://ik.imagekit.io/Dilshad/snitch/1780900372.webp", path: "/category/trousers" },
    { title: "", image: "https://ik.imagekit.io/Dilshad/snitch/1781158057.webp", path: "/category/perfume" },
    { title: "", image: "https://ik.imagekit.io/Dilshad/snitch/1780551455.webp", path: "/category/accessories" },
];

const categories = [
  {
    image: "https://ik.imagekit.io/Dilshad/snitch/1780993598.webp",
    path: "/category/shirt",
  },
  {
    image: "https://ik.imagekit.io/Dilshad/snitch/1781074776.webp",
    path: "/category/trousers",
  },
  {
    image: "https://ik.imagekit.io/Dilshad/snitch/1780999109.webp",
    path: "/category/tshirt",
  },
  {
    image: "https://ik.imagekit.io/Dilshad/snitch/1781086148.webp",
    path: "/category/jeans",
  },
  {
    image: "https://ik.imagekit.io/Dilshad/snitch/1780915974.webp",
    path: "/category/trousers",
  },
  {
    image: "https://ik.imagekit.io/Dilshad/snitch/1780915915.webp",
    path: "/category/tshirt",
  },
];



const sliderBanners = [...banners, ...banners];

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-[#fbf9f6]">
            <div className="max-w-[1550px] mx-auto h-[78vh] overflow-hidden  mt-10">
                <div className="flex h-full gap-2 animate-scroll-left">
            
                    {sliderBanners.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(item.path)}
                            className="relative min-w-[32.8%] h-full overflow-hidden cursor-pointer group"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-black/20"></div>

                            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
                                <h2 className="text-white text-4xl font-semibold tracking-widest">
                                    {item.title}
                                </h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Featured Categories */}

            <div className="max-w-[1550px] mx-auto px-4 py-16" style={{color: '#C9A96E'}}>
                <h2 className="text-center text-2xl font-bold mb-10 tracking-wide">
                  FEATURED CATEGORIES
                </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((item, index) => (
                <div
                  key={index}
                  onClick={() => navigate(item.path)}
                  className="border bg-white cursor-pointer hover:shadow-lg transition-all duration-300"
                >
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-4">
                          {item.name}
                        </h3>

                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-[350px] object-contain"
                        />
                    </div>
                </div>
                ))}
                </div>
            </div>

            {/* SHOP YOUR SIZE */}
            <div className="max-w-[1550px] mx-auto px-4 py-8 pb-30">
                <h2 className="text-center text-2xl font-bold mb-10 uppercase" style={{color: '#C9A96E'}}>
                    Shop Your Size
                </h2>

            <img
                src="https://ik.imagekit.io/Dilshad/snitch/FC_LAST_CHANE.webp"
                alt="Shop Your Size"
                className="w-full h-auto object-cover cursor-pointer"
            />
        </div>

            {/* Footer */}
            <footer
                className="border-t py-12 bg-[#f5f1ec]"
                style={{ borderColor: "#e4e2df" }}
            >
                <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">

                    {/* Left Side - App Buttons */}
                    <div className="flex gap-4">
                        <img
                            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                            alt="App Store"
                            className="h-12 cursor-pointer"
                        />

                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                            alt="Google Play"
                            className="h-12 cursor-pointer"
                        />
                    </div>

                    {/* Center - Copyright */}
                    <div>
                        <span
                            className="text-[10px] uppercase tracking-[0.35em]"
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                color: "#C9A96E",
                            }}
                        >
                            Snitch. © {new Date().getFullYear()}
                        </span>
                    </div>

                    {/* Right Side - Social Icons */}
                    <div className="flex gap-8 text-[#C96D42] text-2xl">
                        <a href="#">
                            <FaFacebook />
                        </a>

                        <a href="#">
                            <FaInstagram />
                        </a>

                        <a href="#">
                            <FaLinkedin />
                        </a>

                        <a href="#">
                            <FaGoogle />
                        </a>
                    </div>

                </div>
            </footer>

        </div>
    );
};

export default Home;