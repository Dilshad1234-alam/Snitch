import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const banners = [
  { image: "https://ik.imagekit.io/Dilshad/snitch/1780900330.webp", path: "/category/shirt" },
  { image: "https://ik.imagekit.io/Dilshad/snitch/1781006299.webp", path: "/category/tshirt" },
  { image: "https://ik.imagekit.io/Dilshad/snitch/1780405487.webp", path: "/category/jeans" },
  { image: "https://ik.imagekit.io/Dilshad/snitch/1780900372.webp", path: "/category/trousers" },
  { image: "https://ik.imagekit.io/Dilshad/snitch/1781158057.webp", path: "/category/perfume" },
  { image: "https://ik.imagekit.io/Dilshad/snitch/1780551455.webp", path: "/category/accessories" },
];

const categories = [
  { image: "https://ik.imagekit.io/Dilshad/snitch/1780993598.webp", path: "/category/shirt" },
  { image: "https://ik.imagekit.io/Dilshad/snitch/1781074776.webp", path: "/category/trousers" },
  { image: "https://ik.imagekit.io/Dilshad/snitch/1780999109.webp", path: "/category/tshirt" },
  { image: "https://ik.imagekit.io/Dilshad/snitch/1781086148.webp", path: "/category/jeans" },
  { image: "https://ik.imagekit.io/Dilshad/snitch/1780915974.webp", path: "/category/trousers" },
  { image: "https://ik.imagekit.io/Dilshad/snitch/1780915915.webp", path: "/category/tshirt" },
];

const sliderBanners = [...banners, ...banners];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f6] overflow-x-hidden">

      {/* Hero Slider */}
      <div className="w-full max-w-[1550px] mx-auto h-[42vh] sm:h-[60vh] lg:h-[78vh] overflow-hidden mt-4 sm:mt-8 lg:mt-10">
        <div className="flex h-full gap-2 animate-scroll-left">
          {sliderBanners.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="relative min-w-[82%] sm:min-w-[48%] lg:min-w-[32.8%] h-full overflow-hidden cursor-pointer group"
            >
              <img
                src={item.image}
                alt="banner"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Categories */}
      <div className="w-full max-w-[1550px] mx-auto px-3 sm:px-4 lg:px-6 py-10 sm:py-14 lg:py-16">
        <h2 className="text-center text-lg sm:text-2xl font-bold mb-6 sm:mb-10 tracking-wide text-[#C9A96E]">
          FEATURED CATEGORIES
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {categories.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="border bg-white cursor-pointer hover:shadow-lg active:scale-95 transition-all duration-300"
            >
              <div className="p-2 sm:p-4">
                <img
                  src={item.image}
                  alt="category"
                  className="w-full h-[170px] sm:h-[260px] md:h-[320px] lg:h-[350px] object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shop Your Size */}
      <div className="w-full max-w-[1550px] mx-auto px-3 sm:px-4 lg:px-6 py-8 pb-16 sm:pb-24 lg:pb-30">
        <h2 className="text-center text-lg sm:text-2xl font-bold mb-6 sm:mb-10 uppercase text-[#C9A96E]">
          Shop Your Size
        </h2>

        <img
          src="https://ik.imagekit.io/Dilshad/snitch/FC_LAST_CHANE.webp"
          alt="Shop Your Size"
          className="w-full h-auto object-cover cursor-pointer"
        />
      </div>

      <Footer />
    </div>
  );
};

export default Home;