import React, { useEffect } from 'react';
import { useProduct } from '../hooks/useProduct';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Dashboard = () => {
    const { handleGetSellerProduct } = useProduct();
    const sellerProducts = useSelector(state => state.product.sellerProducts);
    const navigate = useNavigate();

    useEffect(() => {
        handleGetSellerProduct();
    }, []);

    return (
        <>
            {/* Google Fonts */}
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
                rel="stylesheet"
            />

            <div
                className="min-h-screen selection:bg-[#C9A96E]/30"
                style={{ backgroundColor: '#fbf9f6', fontFamily: "'Inter', sans-serif" }}
            >
                <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24">

                    {/* ── Top Bar ── */}
                    <div className="pt-10 pb-0 flex items-center gap-5">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-lg transition-colors duration-200 leading-none"
                            style={{ color: '#B5ADA3' }}
                            aria-label="Go back"
                            onMouseEnter={e => e.currentTarget.style.color = '#C9A96E'}
                            onMouseLeave={e => e.currentTarget.style.color = '#B5ADA3'}
                        >
                            ←
                        </button>
                        <span
                            className="text-xs font-medium tracking-[0.32em] uppercase"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A96E' }}
                        >
                            Snitch.
                        </span>
                    </div>

                    {/* ── Page Header ── */}
                    <div className="pt-10 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden">
                        <div>
                            <h1
                                className="text-4xl lg:text-5xl font-light leading-tight"
                                style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1b1c1a' }}
                            >
                                Your Vault
                            </h1>
                            {/* Gold rule separator */}
                            <div className="mt-4 w-14 h-px" style={{ backgroundColor: '#C9A96E' }} />
                        </div>

                        <button
                            onClick={() => navigate('/seller/create-product')}
                            className="py-4 px-8 text-[11px] uppercase tracking-[0.3em] font-medium transition-all duration-300 w-full md:w-auto text-center"
                            style={{
                                backgroundColor: '#1b1c1a',
                                color: '#fbf9f6',
                                fontFamily: "'Inter', sans-serif"
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = '#C9A96E';
                                e.currentTarget.style.color = '#1b1c1a';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = '#1b1c1a';
                                e.currentTarget.style.color = '#fbf9f6';
                            }}
                        >
                            New Listing
                        </button>
                    </div>

                    {/* ── Product Grid ── */}
                    {sellerProducts && sellerProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 pb-24">
                            {sellerProducts.map(product => {
                                const imageUrl = product.images && product.images.length > 0
                                    ? product.images[ 0 ].url
                                    : '/snitch_editorial_warm.png'; // Fallback to our warm editorial

                                return (
                                    <div
                                        onClick={() => { navigate(`/seller/product/${product._id}`) }}
                                        key={product._id} className="group cursor-pointer flex flex-col">
                                        {/* Image Container */}
                                        <div className="aspect-[4/5] overflow-hidden mb-6" style={{ backgroundColor: '#f5f3f0' }}>
                                            <img
                                                src={imageUrl}
                                                alt={product.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-start justify-between gap-4">
                                                <h3
                                                    className="text-xl leading-snug transition-colors duration-300 group-hover:text-[#C9A96E]"
                                                    style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1b1c1a' }}
                                                >
                                                    {product.title}
                                                </h3>
                                            </div>

                                            <p
                                                className="text-[12px] line-clamp-2 leading-relaxed"
                                                style={{ color: '#7A6E63' }}
                                            >
                                                {product.description}
                                            </p>

                                            <div className="mt-2">
                                                <span
                                                    className="text-[10px] uppercase tracking-[0.2em] font-medium"
                                                    style={{ color: '#1b1c1a' }}
                                                >
                                                    {product.price?.currency} {product.price?.amount?.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="py-24 text-center flex flex-col items-center">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-medium mb-4" style={{ color: '#C9A96E' }}>Empty Vault</span>
                            <p className="max-w-md mx-auto text-lg leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#7A6E63' }}>
                                You haven't added any curated pieces to your archive yet. Begin by creating a new listing.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Dashboard;






// import { useProduct } from "../hooks/useProduct";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router";

// const Dashboard = () => {
//     const { handleGetSellerProduct } = useProduct();
//     const sellerProducts = useSelector(state => state.product.sellerProducts);
//     const navigate = useNavigate();
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [activeImageIndex, setActiveImageIndex] = useState(0);

//     useEffect(() => {
//         handleGetSellerProduct();
//     }, []);

//     // Auto-select first product
//     useEffect(() => {
//         if (sellerProducts?.length > 0 && !selectedProduct) {
//             setSelectedProduct(sellerProducts[0]);
//             setActiveImageIndex(0);
//         }
//     }, [sellerProducts]);

//     const formatPrice = (price) => {
//         const symbols = { INR: "₹", USD: "$", EUR: "€", GBP: "£" };
//         const symbol = symbols[price.currency] || price.currency;
//         return `${symbol}${price.amount.toLocaleString()}`;
//     };

//     const formatDate = (dateStr) => {
//         return new Date(dateStr).toLocaleDateString("en-IN", {
//             day: "numeric",
//             month: "short",
//             year: "numeric",
//         });
//     };

//     const totalProducts = sellerProducts?.length || 0;
//     const totalValue = sellerProducts?.reduce((sum, p) => sum + (p.price?.amount || 0), 0) || 0;

//     const handleSelectProduct = (product) => {
//         setSelectedProduct(product);
//         setActiveImageIndex(0);
//     };

//     return (
//         <div className="h-screen w-screen overflow-hidden bg-surface text-on-surface selection:bg-[#e5c539]/20 flex flex-col">

//             {/* ── Top Bar ── */}
//             <header className="flex-shrink-0 bg-surface border-b border-outline-variant/20">
//                 <div className="px-6 lg:px-8 py-3.5 flex items-center justify-between">
//                     <div className="flex items-center gap-4">
//                         <button
//                             onClick={() => navigate("/")}
//                             aria-label="Go home"
//                             className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-[#e5c539] transition-colors duration-200 cursor-pointer"
//                         >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
//                             </svg>
//                         </button>
//                         <span
//                             onClick={() => navigate("/")}
//                             className="font-label-md text-[11px] tracking-[0.35em] uppercase text-[#e5c539] cursor-pointer select-none"
//                         >
//                             Snitch
//                         </span>
//                         <span className="w-px h-4 bg-outline-variant/30 mx-1" />
//                         <span className="text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/50">
//                             Seller Studio
//                         </span>
//                     </div>

//                     <button
//                         onClick={() => navigate("/seller/create-product")}
//                         className="group flex items-center gap-2.5 py-2 px-4 text-[10px] uppercase tracking-[0.2em] font-semibold border border-outline-variant/40 text-on-surface transition-all duration-300 cursor-pointer hover:border-[#e5c539] hover:text-[#e5c539] hover:bg-[#e5c539]/5"
//                     >
//                         <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//                         </svg>
//                         New Listing
//                     </button>
//                 </div>
//             </header>

//             {/* ── Main Content ── */}
//             <div className="flex-1 flex overflow-hidden">

//                 {/* ── Left Sidebar: Product List ── */}
//                 <aside className="w-72 xl:w-80 flex-shrink-0 border-r border-outline-variant/20 flex flex-col bg-surface-container-lowest/30">

//                     {/* Sidebar Header */}
//                     <div className="flex-shrink-0 px-5 pt-5 pb-4">
//                         <div className="flex items-center justify-between mb-4">
//                             <h2 className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60">
//                                 Your Products
//                             </h2>
//                             <span className="text-[10px] tracking-[0.15em] text-[#e5c539]/70">
//                                 {totalProducts}
//                             </span>
//                         </div>

//                         {/* Mini Stats */}
//                         <div className="grid grid-cols-2 gap-2">
//                             <div className="border border-outline-variant/20 px-3 py-2.5">
//                                 <p className="text-[8px] uppercase tracking-[0.15em] text-on-surface-variant/40 mb-1">Products</p>
//                                 <p className="text-lg font-light text-on-surface">{totalProducts}</p>
//                             </div>
//                             <div className="border border-outline-variant/20 px-3 py-2.5">
//                                 <p className="text-[8px] uppercase tracking-[0.15em] text-on-surface-variant/40 mb-1">Value</p>
//                                 <p className="text-lg font-light text-on-surface">{formatPrice({ amount: totalValue, currency: "INR" })}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="w-full h-px bg-outline-variant/15" />

//                     {/* Product List (scrollable within sidebar) */}
//                     <div className="flex-1 overflow-y-auto py-2" style={{ scrollbarWidth: "thin" }}>
//                         {sellerProducts && sellerProducts.length > 0 ? (
//                             sellerProducts.map((product) => (
//                                 <button
//                                     key={product._id}
//                                     onClick={() => handleSelectProduct(product)}
//                                     className={`w-full flex items-center gap-3.5 px-5 py-3.5 text-left transition-all duration-200 cursor-pointer group ${
//                                         selectedProduct?._id === product._id
//                                             ? "bg-[#e5c539]/[0.06] border-r-2 border-r-[#e5c539]"
//                                             : "hover:bg-surface-container-low/50 border-r-2 border-r-transparent"
//                                     }`}
//                                 >
//                                     {/* Thumbnail */}
//                                     <div className="w-12 h-12 flex-shrink-0 overflow-hidden bg-surface-container-low">
//                                         {product.images?.[0] ? (
//                                             <img
//                                                 src={product.images[0].url}
//                                                 alt={product.title}
//                                                 className="w-full h-full object-cover"
//                                             />
//                                         ) : (
//                                             <div className="w-full h-full flex items-center justify-center">
//                                                 <svg className="w-4 h-4 text-on-surface-variant/20" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 003.75 21z" />
//                                                 </svg>
//                                             </div>
//                                         )}
//                                     </div>

//                                     {/* Info */}
//                                     <div className="flex-1 min-w-0">
//                                         <p className={`text-xs font-medium tracking-wide uppercase truncate transition-colors duration-200 ${
//                                             selectedProduct?._id === product._id
//                                                 ? "text-[#e5c539]"
//                                                 : "text-on-surface group-hover:text-on-surface"
//                                         }`}>
//                                             {product.title}
//                                         </p>
//                                         <p className="text-[10px] text-on-surface-variant/40 mt-0.5">
//                                             {formatPrice(product.price)}
//                                         </p>
//                                     </div>
//                                 </button>
//                             ))
//                         ) : (
//                             <div className="flex flex-col items-center justify-center py-16 px-5">
//                                 <div className="w-10 h-10 border border-outline-variant/30 flex items-center justify-center mb-4">
//                                     <svg className="w-4 h-4 text-on-surface-variant/30" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
//                                     </svg>
//                                 </div>
//                                 <p className="text-[10px] text-on-surface-variant/40 text-center">No products yet</p>
//                             </div>
//                         )}
//                     </div>

//                     {/* Sidebar Footer */}
//                     <div className="flex-shrink-0 border-t border-outline-variant/15 px-5 py-3">
//                         <button
//                             onClick={() => navigate("/seller/create-product")}
//                             className="w-full flex items-center justify-center gap-2 py-2.5 text-[9px] uppercase tracking-[0.2em] text-on-surface-variant/50 hover:text-[#e5c539] border border-dashed border-outline-variant/20 hover:border-[#e5c539]/40 transition-all duration-200 cursor-pointer"
//                         >
//                             <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//                             </svg>
//                             Add Product
//                         </button>
//                     </div>
//                 </aside>

//                 {/* ── Right: Product Detail Panel ── */}
//                 <main className="flex-1 flex overflow-hidden">
//                     {selectedProduct ? (
//                         <>
//                             {/* Image Viewer */}
//                             <div className="flex-1 flex flex-col bg-surface-container-lowest/20">

//                                 {/* Main Image */}
//                                 <div className="flex-1 relative flex items-center justify-center p-6 overflow-hidden">
//                                     {selectedProduct.images?.[activeImageIndex] ? (
//                                         <img
//                                             src={selectedProduct.images[activeImageIndex].url}
//                                             alt={`${selectedProduct.title} - Image ${activeImageIndex + 1}`}
//                                             className="max-w-full max-h-full object-contain transition-opacity duration-300"
//                                             key={activeImageIndex}
//                                         />
//                                     ) : (
//                                         <div className="flex flex-col items-center gap-3 text-on-surface-variant/30">
//                                             <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="0.8" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 003.75 21z" />
//                                             </svg>
//                                             <p className="text-[10px] uppercase tracking-[0.2em]">No images</p>
//                                         </div>
//                                     )}

//                                     {/* Image counter badge */}
//                                     {selectedProduct.images?.length > 1 && (
//                                         <div className="absolute top-5 right-5 px-2.5 py-1 bg-black/50 backdrop-blur-sm text-[9px] tracking-widest text-white/70 uppercase">
//                                             {activeImageIndex + 1} / {selectedProduct.images.length}
//                                         </div>
//                                     )}

//                                     {/* Prev / Next Arrows */}
//                                     {selectedProduct.images?.length > 1 && (
//                                         <>
//                                             <button
//                                                 onClick={() => setActiveImageIndex(prev => prev === 0 ? selectedProduct.images.length - 1 : prev - 1)}
//                                                 className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 border border-outline-variant/30 bg-surface/60 backdrop-blur-sm flex items-center justify-center text-on-surface-variant/60 hover:text-[#e5c539] hover:border-[#e5c539]/50 transition-all duration-200 cursor-pointer"
//                                             >
//                                                 <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//                                                 </svg>
//                                             </button>
//                                             <button
//                                                 onClick={() => setActiveImageIndex(prev => prev === selectedProduct.images.length - 1 ? 0 : prev + 1)}
//                                                 className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 border border-outline-variant/30 bg-surface/60 backdrop-blur-sm flex items-center justify-center text-on-surface-variant/60 hover:text-[#e5c539] hover:border-[#e5c539]/50 transition-all duration-200 cursor-pointer"
//                                             >
//                                                 <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//                                                 </svg>
//                                             </button>
//                                         </>
//                                     )}
//                                 </div>

//                                 {/* Thumbnail Strip */}
//                                 {selectedProduct.images?.length > 1 && (
//                                     <div className="flex-shrink-0 border-t border-outline-variant/15 px-6 py-3 flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
//                                         {selectedProduct.images.map((img, idx) => (
//                                             <button
//                                                 key={img._id}
//                                                 onClick={() => setActiveImageIndex(idx)}
//                                                 className={`w-14 h-14 flex-shrink-0 overflow-hidden transition-all duration-200 cursor-pointer ${
//                                                     activeImageIndex === idx
//                                                         ? "ring-1 ring-[#e5c539] opacity-100"
//                                                         : "opacity-40 hover:opacity-70"
//                                                 }`}
//                                             >
//                                                 <img
//                                                     src={img.url}
//                                                     alt={`Thumb ${idx + 1}`}
//                                                     className="w-full h-full object-cover"
//                                                 />
//                                             </button>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Product Details Sidebar */}
//                             <aside className="w-80 xl:w-96 flex-shrink-0 border-l border-outline-variant/20 flex flex-col bg-surface">

//                                 {/* Details Content */}
//                                 <div className="flex-1 overflow-y-auto px-6 xl:px-8 py-8" style={{ scrollbarWidth: "thin" }}>

//                                     {/* Title & Price */}
//                                     <div className="mb-8">
//                                         <p className="font-label-md text-[9px] tracking-[0.2em] uppercase text-[#e5c539] mb-3">
//                                             Product Details
//                                         </p>
//                                         <h2 className="text-xl xl:text-2xl font-light tracking-tight text-on-surface leading-snug mb-3">
//                                             {selectedProduct.title}
//                                         </h2>
//                                         <p className="text-2xl xl:text-3xl font-light text-[#e5c539] tracking-tight">
//                                             {formatPrice(selectedProduct.price)}
//                                         </p>
//                                     </div>

//                                     <div className="w-8 h-px bg-outline-variant/30 mb-8" />

//                                     {/* Description */}
//                                     <div className="mb-8">
//                                         <p className="text-[9px] uppercase tracking-[0.18em] text-on-surface-variant/50 mb-3">
//                                             Description
//                                         </p>
//                                         <p className="text-sm text-on-surface-variant/70 leading-relaxed">
//                                             {selectedProduct.description}
//                                         </p>
//                                     </div>

//                                     <div className="w-8 h-px bg-outline-variant/30 mb-8" />

//                                     {/* Metadata */}
//                                     <div className="space-y-5">
//                                         <div className="flex items-center justify-between">
//                                             <p className="text-[9px] uppercase tracking-[0.18em] text-on-surface-variant/50">
//                                                 Created
//                                             </p>
//                                             <p className="text-xs text-on-surface-variant/70">
//                                                 {formatDate(selectedProduct.createdAt)}
//                                             </p>
//                                         </div>
//                                         <div className="flex items-center justify-between">
//                                             <p className="text-[9px] uppercase tracking-[0.18em] text-on-surface-variant/50">
//                                                 Updated
//                                             </p>
//                                             <p className="text-xs text-on-surface-variant/70">
//                                                 {formatDate(selectedProduct.updatedAt)}
//                                             </p>
//                                         </div>
//                                         <div className="flex items-center justify-between">
//                                             <p className="text-[9px] uppercase tracking-[0.18em] text-on-surface-variant/50">
//                                                 Images
//                                             </p>
//                                             <p className="text-xs text-on-surface-variant/70">
//                                                 {selectedProduct.images?.length || 0}
//                                             </p>
//                                         </div>
//                                         <div className="flex items-center justify-between">
//                                             <p className="text-[9px] uppercase tracking-[0.18em] text-on-surface-variant/50">
//                                                 Currency
//                                             </p>
//                                             <p className="text-xs text-on-surface-variant/70">
//                                                 {selectedProduct.price.currency}
//                                             </p>
//                                         </div>
//                                         <div className="flex items-center justify-between">
//                                             <p className="text-[9px] uppercase tracking-[0.18em] text-on-surface-variant/50">
//                                                 Product ID
//                                             </p>
//                                             <p className="text-[10px] text-on-surface-variant/40 font-mono truncate max-w-[140px]">
//                                                 {selectedProduct._id}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Actions Footer */}
//                                 <div className="flex-shrink-0 border-t border-outline-variant/15 px-6 xl:px-8 py-4 flex gap-3">
//                                     <button className="flex-1 py-3 text-[9px] uppercase tracking-[0.2em] font-semibold border border-outline-variant/30 text-on-surface-variant/60 hover:border-[#e5c539] hover:text-[#e5c539] hover:bg-[#e5c539]/5 transition-all duration-300 cursor-pointer">
//                                         Edit
//                                     </button>
//                                     <button className="flex-1 py-3 text-[9px] uppercase tracking-[0.2em] font-semibold border border-outline-variant/30 text-on-surface-variant/60 hover:border-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all duration-300 cursor-pointer">
//                                         Delete
//                                     </button>
//                                 </div>
//                             </aside>
//                         </>
//                     ) : (
//                         /* No Product Selected State */
//                         <div className="flex-1 flex flex-col items-center justify-center">
//                             <div className="w-16 h-16 border border-outline-variant/20 flex items-center justify-center mb-6">
//                                 <svg className="w-6 h-6 text-on-surface-variant/20" fill="none" stroke="currentColor" strokeWidth="0.8" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
//                                 </svg>
//                             </div>
//                             <p className="text-sm text-on-surface-variant/40 mb-1">Select a product</p>
//                             <p className="text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/25">
//                                 Choose from the sidebar to view details
//                             </p>
//                         </div>
//                     )}
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;