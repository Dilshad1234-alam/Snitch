import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link, useLocation } from 'react-router'
import { useAuth } from '../../auth/hook/useAuth'
import { searchProductsApi } from '../../products/services/product.api'

const Nav = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const user = useSelector(state => state.auth.user)
    const cartItems = useSelector(state => state.cart?.items)
    const wishlistItems = useSelector(state => state.wishlist?.items)

    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isListening, setIsListening] = useState(false);

    const { handleLogout } = useAuth()

    const logoutUser = async () => {
        await handleLogout();
        navigate("/login");
    };

    useEffect(() => {
        setSearch("");
        setSuggestions([]);
    }, [location.pathname]);


    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setSearch(value);

        if (value.trim().length < 1) {
            setSuggestions([]);
            return;
        }

        const data = await searchProductsApi(value);
        setSuggestions(data.products);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        if (!search.trim()) return;

        navigate(`/product?search=${search}`);
        setSuggestions([]);
    };

    const handleVoiceSearch = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Voice search is not supported in this browser");
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.lang = "en-IN";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        setIsListening(true);
        recognition.start();

        recognition.onresult = async (event) => {
            const voiceText = event.results[0][0].transcript;

            setSearch(voiceText);

            const data = await searchProductsApi(voiceText);

            setSuggestions(data.products);
        };

        recognition.onerror = () => {
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };
    };

    return (
        <nav className="px-8 lg:px-16 xl:px-24 pt-10 pb-6 flex items-center justify-between border-b" style={{ borderColor: '#C9A96E' }}>

            <div className="flex items-center gap-8">

            <button
                onClick={() => {
                    navigate(-1)
                    setSearch("");
                    setSuggestions([]);
                }}
                className="flex items-center justify-center hover:text-[#C9A96E] transition-colors"
                style={{ color: "#7A6E63" }}
            >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
            </svg>
            </button>

            <Link to="/"
                className="text-sm font-medium tracking-[0.35em] uppercase hover:opacity-80 transition-opacity"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A96E' }}
            >
                Snitch.
            </Link>

            <Link to="/"
                className="text-[10px] uppercase tracking-[0.2em] font-medium hover:text-[#C9A96E]"
                style={{ color: '#7A6E63' }}
            >
                Home
            </Link>

            <Link to="/product"
                className="text-[10px] uppercase tracking-[0.2em] font-medium hover:text-[#C9A96E]"
                style={{ color: '#7A6E63' }}
            >
                Product
            </Link>

            {/* Search From */}

            <form onSubmit={handleSearchSubmit} className="relative">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    className="w-56 border px-3 py-2 text-[10px] uppercase tracking-[0.15em] outline-none"
                    style={{
                        borderColor: "#C9A96E",
                        backgroundColor: "transparent",
                        color: "#1b1c1a"
                    }}
                />

                <button
                    type="button"
                    onClick={handleVoiceSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-[#C9A96E] transition-colors"
                    style={{
                        color: isListening ? "#C9A96E" : "#7A6E63"
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 1v11" />
                        <rect x="8" y="1" width="8" height="14" rx="4" />
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                        <line x1="12" y1="19" x2="12" y2="23" />
                        <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                </button>

                {suggestions.length > 0 && (
                    <div
                        className="absolute top-full left-0 w-72 bg-white border z-50 mt-1"
                        style={{ borderColor: "#C9A96E" }}
                    >
                    {suggestions.map(product => (
                        <div
                            key={product._id}
                            onClick={() => {
                                setSearch(product.title);
                                setSuggestions([]);
                                navigate(`/product/${product._id}`);
                            }}
                            className="px-3 py-2 text-xs cursor-pointer hover:bg-[#fbf9f6]"
                            style={{ color: "#1b1c1a" }}
                        >
                            {product.title}
                        </div>
                    ))}
                </div>
                )}
            </form>

            </div>    

            <div className="flex gap-6 items-center text-[10px] uppercase tracking-[0.2em] font-medium" style={{ color: '#7A6E63' }}>
                {user ? (
                    <>
                        <span style={{ color: '#1b1c1a' }}>{user.fullname}</span>
                        {user.role === 'seller' && (
                            <Link to="/seller/dashboard" className="transition-colors hover:text-[#C9A96E]">Seller Dashboard</Link>
                        )}

                        {/* Cart icon */}
                        <Link
                            to="/cart"
                            className="relative flex items-center hover:opacity-70 transition-opacity"
                            style={{ color: '#1b1c1a' }}
                            aria-label="Shopping cart"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                            {cartItems?.length > 0 && (
                                <span
                                    className="absolute -top-2 -right-2 flex items-center justify-center rounded-full text-white"
                                    style={{
                                        backgroundColor: '#C9A96E',
                                        width: '16px',
                                        height: '16px',
                                        fontSize: '9px',
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 600,
                                        letterSpacing: 0,
                                    }}
                                >
                                    {cartItems.length > 9 ? '9+' : cartItems.length}
                                </span>
                            )}
                        </Link>

                        {/* Wishlist icon */}
                        <Link
                            to="/wishlist"
                            className="relative flex items-center hover:opacity-70 transition-opacity"
                            style={{ color: '#1b1c1a' }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path d="M12 21s-6.7-4.35-9.33-8.09C.8 10.25 1.4 6.4 4.6 4.6c2.24-1.26 5.05-.65 6.4 1.4 1.35-2.05 4.16-2.66 6.4-1.4 3.2 1.8 3.8 5.65 1.93 8.31C18.7 16.65 12 21 12 21z"/>
                            </svg>

                            {wishlistItems?.length > 0 && (
                            <span
                                className="absolute -top-2 -right-2 flex items-center justify-center rounded-full text-white"
                                style={{
                                    backgroundColor: '#C9A96E',
                                    width: '16px',
                                    height: '16px',
                                    fontSize: '9px',
                                    fontWeight: 600,
                                }}
                            >
                                {wishlistItems.length}
                            </span>
                            )}
                        </Link>

                        {/* Logout Button */}

                        <button
                            onClick={logoutUser}
                            className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                             Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="transition-colors hover:text-[#C9A96E]">Sign In</Link>
                        <Link to="/register" className="transition-colors hover:text-[#C9A96E]">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav