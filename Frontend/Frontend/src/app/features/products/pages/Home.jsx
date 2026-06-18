import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";

const banners = [
    { title: "", image: "https://ik.imagekit.io/Dilshad/snitch/1780900330.webp", path: "/category/shirt" },
    { title: "", image: "https://ik.imagekit.io/Dilshad/snitch/1781006299.webp", path: "/category/tshirt" },
    { title: "", image: "https://ik.imagekit.io/Dilshad/snitch/1780405487.webp", path: "/category/jeans" },
    { title: "", image: "https://ik.imagekit.io/Dilshad/snitch/1780900372.webp", path: "/category/trousers" },
    { title: "", image: "https://ik.imagekit.io/Dilshad/snitch/1781158057.webp", path: "/category/perfume" },
    { title: "", image: "https://ik.imagekit.io/Dilshad/snitch/1780551455.webp", path: "/category/accessories" },
];

const sliderBanners = [...banners, ...banners];

const Home = () => {
    const navigate = useNavigate();

    // const [slide, setSlide] = useState(0);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setSlide(prev => (prev === 0 ? 1 : 0));
    //     }, 8000);

    //     return () => clearInterval(interval);
    // }, []);

    return (
        <div className="min-h-screen flex flex-col bg-[#fbf9f6]">
            <div className="max-w-[1550px] mx-auto h-[78vh] overflow-hidden  mt-10">
                <div className="flex h-full gap-2 animate-scroll-left">
                {/* <div
                    className="flex h-full justify-center transition-transform duration-[3000ms] ease-in-out gap-2"
                    style={{
                        width: "200%",
                        transform: `translateX(-${slide * 50}%)`,
                    }}
                > */}
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

            <footer
                className="border-t py-12 text-center mt-auto"
                style={{ borderColor: "#e4e2df" }}
            >
                <span
                    className="text-[10px] uppercase tracking-[0.35em]"
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        color: "#C9A96E",
                    }}
                >
                    Snitch. © {new Date().getFullYear()}
                </span>
            </footer>
        </div>
    );
};

export default Home;