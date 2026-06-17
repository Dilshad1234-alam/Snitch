import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useProduct } from '../hooks/useProduct';
import axios from 'axios'

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP'];
const MAX_IMAGES = 7;

const CreateProduct = () => {
    const { handleCreateProduct } = useProduct();
    const { handleBulkUpload } = useProduct()
    const navigate = useNavigate();

    const fileRef = useRef(null)

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        priceAmount: '',
        priceCurrency: 'INR',
    });

    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [bulkFile, setBulkFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const addFiles = (files) => {
        const remaining = MAX_IMAGES - images.length;
        if (remaining <= 0) return;
        const toAdd = Array.from(files).slice(0, remaining);
        const newImages = toAdd.map(file => ({ file, preview: URL.createObjectURL(file) }));
        setImages(prev => [...prev, ...newImages]);
    };

    const handleFileChange = (e) => {
        addFiles(e.target.files);
        e.target.value = '';
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
    }, [images]);

    const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = () => setIsDragging(false);

    const removeImage = (index) => {
        setImages(prev => {
            const updated = [...prev];
            URL.revokeObjectURL(updated[index].preview);
            updated.splice(index, 1);
            return updated;
        });
    };

    console.log({
        title: formData.title,
        category: formData.category,
        description: formData.description,
        priceAmount: formData.priceAmount,
        priceCurrency: formData.priceCurrency,
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {

            // BULK UPLOAD
        if (bulkFile) {

            const formData = new FormData();

            formData.append("file", bulkFile);

            await handleBulkUpload(formData);

            alert("Bulk Products Uploaded Successfully");

            navigate("/");

            return;
        }

        // SINGLE PRODUCT
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('category', formData.category);
            data.append('priceAmount', formData.priceAmount);
            data.append('priceCurrency', formData.priceCurrency);

            images.forEach(img => data.append('images', img.file));
            await handleCreateProduct(data);
            navigate('/');
        } catch (err) {
            console.error('Failed to create product', err);
        } finally {
            setIsSubmitting(false);
        }
    };



    const uploadBulkProducts = async () => {

        if (!bulkFile) return;

        const formData =
            new FormData();

        formData.append(
            "file",
            bulkFile
        );

        const data =
            await handleBulkUpload(
                formData
            );

        alert(data.message);
    };
   

    const inputClass = "w-full bg-transparent outline-none py-4 text-sm transition-colors duration-300 placeholder:text-[#d0c5b5]";
    const inputStyle = { color: '#1b1c1a', borderBottom: '1px solid #d0c5b5', fontFamily: "'Inter', sans-serif" };
    const handleFocus = (e) => { e.target.style.borderBottomColor = '#C9A96E'; };
    const handleBlur = (e) => { e.target.style.borderBottomColor = '#d0c5b5'; };


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
                <div className="max-w-6xl mx-auto px-8 lg:px-16 xl:px-24">

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
                    <div className="pt-10 pb-0">
                        <h1
                            className="text-4xl lg:text-5xl font-light leading-tight"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1b1c1a' }}
                        >
                            New Listing
                        </h1>
                        {/* Gold rule separator */}
                        <div className="mt-4 w-14 h-px" style={{ backgroundColor: '#C9A96E' }} />
                    </div>


                    {/* ── Form ── */}
                    <form onSubmit={handleSubmit} noValidate className="pt-14 pb-24">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 lg:items-start">

                            {/* ── LEFT COLUMN: Text Fields ── */}
                            <div className="flex flex-col gap-12">

                                {/* Product Title */}
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="cp-title"
                                        className="text-[10px] uppercase tracking-[0.2em] font-medium"
                                        style={{ color: '#7A6E63' }}
                                    >
                                        Product Title
                                    </label>
                                    <input
                                        id="cp-title"
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required={!bulkFile}
                                        placeholder="e.g. Oversized Linen Shirt"
                                        className={inputClass}
                                        style={inputStyle}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                    />
                                </div>

                                {/* Description */}
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="cp-description"
                                        className="text-[10px] uppercase tracking-[0.2em] font-medium"
                                        style={{ color: '#7A6E63' }}
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="cp-description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="Describe the product — material, fit, details..."
                                        className="w-full bg-transparent outline-none py-4 text-sm transition-colors duration-300 resize-none leading-relaxed placeholder:text-[#d0c5b5]"
                                        style={inputStyle}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        required={!bulkFile}
                                    />
                                </div>

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="border p-2 w-full"
                                    style={{ color: '#7A6E63' }}
                                    required={!bulkFile}
                                >
                                    <option value="">Select Category</option>
                                    <option value="shirt">Shirt</option>
                                    <option value="tshirt">T-Shirt</option>
                                    <option value="jeans">Jeans</option>
                                    <option value="trousers">Trousers</option>
                                    <option value="jackets">Jackets</option>
                                    <option value="shoes">Shoes</option>
                                </select>

                                {/* Price */}
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-medium" style={{ color: '#7A6E63' }}>
                                        Price
                                    </label>
                                    <div className="flex gap-5 items-end">
                                        {/* Amount */}
                                        <div className="flex flex-col gap-1 flex-[3]">
                                            <span className="text-[9px] uppercase tracking-[0.18em]" style={{ color: '#B5ADA3' }}>Amount</span>
                                            <input
                                                id="cp-priceAmount"
                                                type="number"
                                                name="priceAmount"
                                                value={formData.priceAmount}
                                                onChange={handleChange}
                                                required={!bulkFile}
                                                min="0"
                                                step="0.01"
                                                placeholder="0.00"
                                                className={inputClass}
                                                style={inputStyle}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        {/* Currency */}
                                        <div className="flex flex-col gap-1 flex-[1]">
                                            <span className="text-[9px] uppercase tracking-[0.18em]" style={{ color: '#B5ADA3' }}>Currency</span>
                                            <select
                                                id="cp-priceCurrency"
                                                name="priceCurrency"
                                                value={formData.priceCurrency}
                                                onChange={handleChange}
                                                className="w-full bg-transparent outline-none py-4 text-sm cursor-pointer appearance-none transition-colors duration-300"
                                                style={inputStyle}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                            >
                                                {CURRENCIES.map(c => (
                                                    <option key={c} value={c} style={{ backgroundColor: '#fbf9f6', color: '#1b1c1a' }}>{c}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ── RIGHT COLUMN: Images ── */}
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-medium" style={{ color: '#7A6E63' }}>
                                        Images
                                    </label>
                                    <span className="text-[10px]" style={{ color: '#B5ADA3' }}>
                                        {images.length}/{MAX_IMAGES}
                                    </span>
                                </div>

                                {/* Drop Zone */}
                                {images.length < MAX_IMAGES && (
                                    <div
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border border-dashed px-8 py-14 lg:py-20 flex flex-col items-center gap-4 cursor-pointer transition-all duration-300"
                                        style={{
                                            borderColor: isDragging ? '#C9A96E' : '#d0c5b5',
                                            backgroundColor: isDragging ? 'rgba(201,169,110,0.04)' : 'transparent'
                                        }}
                                    >
                                        {/* Upload icon */}
                                        <div
                                            className="w-10 h-10 flex items-center justify-center border transition-colors duration-300"
                                            style={{ borderColor: isDragging ? '#C9A96E' : '#d0c5b5', color: isDragging ? '#C9A96E' : '#B5ADA3' }}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                            </svg>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm leading-relaxed" style={{ color: '#7A6E63' }}>
                                                Drop images here or{' '}
                                                <span style={{ color: '#C9A96E', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                                                    tap to upload
                                                </span>
                                            </p>
                                            <p className="text-[10px] uppercase tracking-[0.15em] mt-2" style={{ color: '#B5ADA3' }}>
                                                Up to {MAX_IMAGES} images
                                            </p>
                                        </div>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </div>
                                )}

                                {/* Image Previews */}
                                {images.length > 0 && (
                                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-1">
                                        {images.map((img, index) => (
                                            <div
                                                key={index}
                                                className="relative aspect-square overflow-hidden group"
                                                style={{ backgroundColor: '#eae8e5' }}
                                            >
                                                <img
                                                    src={img.preview}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                {/* Remove overlay */}
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs font-medium tracking-widest uppercase"
                                                    style={{ backgroundColor: 'rgba(27,24,20,0.55)', color: '#fbf9f6' }}
                                                    aria-label={`Remove image ${index + 1}`}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* AddBulk Button */}
                        <div className="mt-6" style={{ color: '#7A6E63', borderColor: isDragging ? '#C9A96E' : '#d0c5b5' }}>

                            <input
                                className="hidden"
                                type="file"
                                ref={fileRef}
                                accept=".json,.xlsx,.csv"
                                onChange={(e) =>
                                    setBulkFile( e.target.files[0] )
                                }
                            />

                            <button
                                type="button"
                                onClick={() => fileRef.current.click()}
                                className="bg-black text-white px-5 py-2 rounded mt-3"
                            >
                                Add Bulk Products
                            </button>

                            {bulkFile && (
                                <p className="mt-2 text-green-600">
                                    Selected: {bulkFile.name}
                                </p>
                            )}


                        </div>

                        {/* ── Submit Button ── */}
                        <div className="mt-16 lg:mt-20">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-5 text-[11px] uppercase tracking-[0.3em] font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{
                                    backgroundColor: isSubmitting ? '#7A6E63' : '#1b1c1a',
                                    color: '#fbf9f6',
                                    fontFamily: "'Inter', sans-serif"
                                }}
                                onMouseEnter={e => {
                                    if (!isSubmitting) {
                                        e.currentTarget.style.backgroundColor = '#C9A96E';
                                        e.currentTarget.style.color = '#1b1c1a';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (!isSubmitting) {
                                        e.currentTarget.style.backgroundColor = '#1b1c1a';
                                        e.currentTarget.style.color = '#fbf9f6';
                                    }
                                }}
                            >
                                {isSubmitting ? 'Publishing...' : 'Publish Listing'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateProduct;





// import React, { useState, useRef, useCallback } from 'react';
// import { useNavigate } from 'react-router';
// import { useProduct } from '../hooks/useProduct';

// const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP'];
// const MAX_IMAGES = 7;

// const CreateProduct = () => {
//     const { handleCreateProduct } = useProduct();
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         priceAmount: '',
//         priceCurrency: 'INR',
//     });
//     const [images, setImages] = useState([]);
//     const [isDragging, setIsDragging] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const fileInputRef = useRef(null);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const addFiles = (files) => {
//         const remaining = MAX_IMAGES - images.length;
//         if (remaining <= 0) return;
//         const toAdd = Array.from(files).slice(0, remaining);
//         const newImages = toAdd.map(file => ({
//             file,
//             preview: URL.createObjectURL(file),
//         }));
//         setImages(prev => [...prev, ...newImages]);
//     };

//     const handleFileChange = (e) => {
//         addFiles(e.target.files);
//         e.target.value = '';
//     };

//     const handleDrop = useCallback((e) => {
//         e.preventDefault();
//         setIsDragging(false);
//         if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
//     }, [images]);

//     const handleDragOver = (e) => {
//         e.preventDefault();
//         setIsDragging(true);
//     };

//     const handleDragLeave = () => setIsDragging(false);

//     const removeImage = (index) => {
//         setImages(prev => {
//             const updated = [...prev];
//             URL.revokeObjectURL(updated[index].preview);
//             updated.splice(index, 1);
//             return updated;
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!formData.title.trim()) {
//           console.error("Title is required");
//           return;
//         }

//         if (!formData.description.trim()) {
//           console.error("Description is required");
//           return;
//         }

//         if (!formData.priceAmount || Number(formData.priceAmount) <= 0) {
//           console.error("Valid price is required");
//           return;
//         }

//         setIsSubmitting(true);

//         try {
//             const data = new FormData();
//             data.append('title', formData.title);
//             data.append('description', formData.description);
//             data.append('priceAmount', formData.priceAmount);
//             data.append('priceCurrency', formData.priceCurrency);

//             images.forEach(img => data.append('images', img.file));

//             const product =await handleCreateProduct(data);
//             console.log("Created Product:", product);     
//             navigate('/');

//         } catch (err) {
//             console.error('Failed to create product', err);
//             console.log("status:", err.response?.status);
//             console.log("data:", err.response?.data);
//             console.log("errors:", err.response?.data?.errors);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-surface text-on-surface selection:bg-[#e5c539]/20 pb-24">

//             {/* ── Top Bar ── */}
//             <header className="sticky top-0 z-10 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20">
//                 <div className="max-w-7xl mx-auto px-6 lg:px-16 py-4 flex items-center gap-4">
//                     <button
//                         onClick={() => navigate(-1)}
//                         aria-label="Go back"
//                         className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-[#e5c539] transition-colors duration-200 cursor-pointer"
//                     >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
//                         </svg>
//                     </button>
//                     <span
//                         onClick={() => navigate('/')}
//                         className="font-label-md text-[11px] tracking-[0.35em] uppercase text-[#e5c539] cursor-pointer select-none"
//                     >
//                         Snitch
//                     </span>
//                 </div>
//             </header>

//             {/* ── Page Content ── */}
//             <main className="max-w-7xl mx-auto px-6 lg:px-16">

//                 {/* ── Page Header ── */}
//                 <div className="pt-16 pb-14">
//                     <p className="font-label-md text-[10px] tracking-[0.25em] uppercase text-[#e5c539] mb-5">
//                         Seller Studio
//                     </p>
//                     <h1 className="text-4xl lg:text-5xl font-light tracking-tight text-on-surface leading-none">
//                         New Listing
//                     </h1>
//                     <div className="mt-5 w-12 h-px bg-[#e5c539]" />
//                 </div>

//                 {/* ── Form ── */}
//                 <form onSubmit={handleSubmit}>
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 lg:items-start">

//                         {/* ── LEFT COLUMN: Text Fields ── */}
//                         <div className="flex flex-col gap-14">

//                             {/* Product Title */}
//                             <div className="flex flex-col gap-3">
//                                 <label
//                                     htmlFor="cp-title"
//                                     className="font-label-md text-[10px] tracking-[0.2em] uppercase text-on-surface-variant"
//                                 >
//                                     Product Title
//                                 </label>
//                                 <input
//                                     id="cp-title"
//                                     type="text"
//                                     name="title"
//                                     value={formData.title}
//                                     onChange={handleChange}
//                                     required
//                                     placeholder="e.g. Oversized Linen Shirt"
//                                     className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-2 text-base text-on-surface placeholder:text-on-surface-variant/40 focus:border-[#e5c539] focus:outline-none transition-colors duration-300"
//                                 />
//                             </div>

//                             {/* Description */}
//                             <div className="flex flex-col gap-3">
//                                 <label
//                                     htmlFor="cp-description"
//                                     className="font-label-md text-[10px] tracking-[0.2em] uppercase text-on-surface-variant"
//                                 >
//                                     Description
//                                 </label>
//                                 <textarea
//                                     id="cp-description"
//                                     name="description"
//                                     value={formData.description}
//                                     onChange={handleChange}
//                                     rows={6}
//                                     placeholder="Describe the product — material, fit, sizing, details..."
//                                     className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-2 text-base text-on-surface placeholder:text-on-surface-variant/40 focus:border-[#e5c539] focus:outline-none transition-colors duration-300 resize-none leading-relaxed"
//                                 />
//                             </div>

//                             {/* Price */}
//                             <div className="flex flex-col gap-4">
//                                 <label className="font-label-md text-[10px] tracking-[0.2em] uppercase text-on-surface-variant">
//                                     Price
//                                 </label>
//                                 <div className="flex gap-6 items-end">

//                                     {/* Amount */}
//                                     <div className="flex flex-col gap-2 flex-[3]">
//                                         <span className="text-[9px] uppercase tracking-[0.18em] text-on-surface-variant/60">
//                                             Amount
//                                         </span>
//                                         <input
//                                             id="cp-priceAmount"
//                                             type="number"
//                                             name="priceAmount"
//                                             value={formData.priceAmount}
//                                             onChange={handleChange}
//                                             required
//                                             min="0"
//                                             step="0.01"
//                                             placeholder="0.00"
//                                             className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-2 text-base text-on-surface placeholder:text-on-surface-variant/40 focus:border-[#e5c539] focus:outline-none transition-colors duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//                                         />
//                                     </div>

//                                     {/* Currency */}
//                                     <div className="flex flex-col gap-2 flex-[1]">
//                                         <span className="text-[9px] uppercase tracking-[0.18em] text-on-surface-variant/60">
//                                             Currency
//                                         </span>
//                                         <div className="relative">
//                                             <select
//                                                 id="cp-priceCurrency"
//                                                 name="priceCurrency"
//                                                 value={formData.priceCurrency}
//                                                 onChange={handleChange}
//                                                 className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-2 pr-6 text-base text-on-surface cursor-pointer appearance-none focus:border-[#e5c539] focus:outline-none transition-colors duration-300"
//                                             >
//                                                 {CURRENCIES.map(c => (
//                                                     <option
//                                                         key={c}
//                                                         value={c}
//                                                         style={{ backgroundColor: '#131313', color: '#e5e2e1' }}
//                                                     >
//                                                         {c}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                             {/* Chevron */}
//                                             <div className="absolute right-0 bottom-3.5 pointer-events-none text-on-surface-variant/60">
//                                                 <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
//                                                 </svg>
//                                             </div>
//                                         </div>
//                                     </div>

//                                 </div>
//                             </div>
//                         </div>

//                         {/* ── RIGHT COLUMN: Images ── */}
//                         <div className="flex flex-col gap-5">

//                             {/* Header */}
//                             <div className="flex items-center justify-between">
//                                 <label className="font-label-md text-[10px] tracking-[0.2em] uppercase text-on-surface-variant">
//                                     Images
//                                 </label>
//                                 <span className="text-[10px] tracking-widest text-on-surface-variant/50">
//                                     {images.length} / {MAX_IMAGES}
//                                 </span>
//                             </div>

//                             {/* Drop Zone */}
//                             {images.length < MAX_IMAGES && (
//                                 <div
//                                     onDrop={handleDrop}
//                                     onDragOver={handleDragOver}
//                                     onDragLeave={handleDragLeave}
//                                     onClick={() => fileInputRef.current?.click()}
//                                     className={`group border border-dashed flex flex-col items-center gap-5 py-16 px-8 cursor-pointer transition-all duration-300 ${
//                                         isDragging
//                                             ? 'border-[#e5c539] bg-[#e5c539]/5'
//                                             : 'border-outline-variant hover:border-[#e5c539]/60 hover:bg-[#e5c539]/[0.02]'
//                                     }`}
//                                 >
//                                     {/* Icon box */}
//                                     <div className={`w-12 h-12 border flex items-center justify-center transition-all duration-300 ${
//                                         isDragging
//                                             ? 'border-[#e5c539] text-[#e5c539]'
//                                             : 'border-outline-variant text-on-surface-variant group-hover:border-[#e5c539]/60 group-hover:text-[#e5c539]/70'
//                                     }`}>
//                                         <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
//                                         </svg>
//                                     </div>

//                                     {/* Text */}
//                                     <div className="text-center">
//                                         <p className="text-sm text-on-surface-variant leading-relaxed">
//                                             Drop images here or{' '}
//                                             <span className="text-[#e5c539] underline underline-offset-2">
//                                                 tap to browse
//                                             </span>
//                                         </p>
//                                         <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/50">
//                                             Up to {MAX_IMAGES} images · JPG, PNG, WEBP
//                                         </p>
//                                     </div>

//                                     <input
//                                         ref={fileInputRef}
//                                         type="file"
//                                         accept="image/*"
//                                         multiple
//                                         onChange={handleFileChange}
//                                         className="hidden"
//                                     />
//                                 </div>
//                             )}

//                             {/* Image Grid Previews */}
//                             {images.length > 0 && (
//                                 <div className={`grid gap-2 ${images.length < MAX_IMAGES ? 'mt-2' : ''} grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4`}>
//                                     {images.map((img, index) => (
//                                         <div
//                                             key={index}
//                                             className="relative aspect-square overflow-hidden group bg-surface-container-low"
//                                         >
//                                             <img
//                                                 src={img.preview}
//                                                 alt={`Preview ${index + 1}`}
//                                                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                                             />
//                                             {/* Overlay */}
//                                             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => removeImage(index)}
//                                                     className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-8 h-8 border border-white/60 flex items-center justify-center text-white hover:border-[#e5c539] hover:text-[#e5c539] transition-colors cursor-pointer"
//                                                     aria-label={`Remove image ${index + 1}`}
//                                                 >
//                                                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                                                     </svg>
//                                                 </button>
//                                             </div>

//                                             {/* Index badge */}
//                                             {index === 0 && (
//                                                 <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-[#e5c539] text-[8px] tracking-widest uppercase text-black font-bold">
//                                                     Cover
//                                                 </div>
//                                             )}
//                                         </div>
//                                     ))}

//                                     {/* Add more slot (when below max) */}
//                                     {images.length < MAX_IMAGES && (
//                                         <button
//                                             type="button"
//                                             onClick={() => fileInputRef.current?.click()}
//                                             className="aspect-square border border-dashed border-outline-variant flex items-center justify-center text-on-surface-variant/40 hover:border-[#e5c539]/50 hover:text-[#e5c539]/60 transition-all duration-200 cursor-pointer"
//                                             aria-label="Add more images"
//                                         >
//                                             <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//                                             </svg>
//                                         </button>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* ── Submit ── */}
//                     <div className="mt-20 pt-8 border-t border-outline-variant/30">
//                         <button
//                             type="submit"
//                             disabled={isSubmitting}
//                             className="group relative w-full lg:w-auto lg:min-w-64 py-5 px-16 text-[11px] uppercase tracking-[0.3em] font-semibold border border-outline-variant text-on-surface transition-all duration-300 cursor-pointer hover:border-[#e5c539] hover:text-[#e5c539] hover:bg-[#e5c539]/5 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden"
//                         >
//                             <span className={`transition-opacity duration-200 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
//                                 Publish Listing
//                             </span>
//                             {isSubmitting && (
//                                 <span className="absolute inset-0 flex items-center justify-center gap-2 text-[#e5c539]">
//                                     <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
//                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                                     </svg>
//                                     Publishing...
//                                 </span>
//                             )}
//                         </button>
//                     </div>

//                 </form>
//             </main>
//         </div>
//     );
// };

// export default CreateProduct;
