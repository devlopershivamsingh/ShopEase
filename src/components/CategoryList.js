import React, { useEffect, useState } from 'react';
import summaryApi from '../common';
import { Link } from 'react-router-dom';

export const CategoryList = () => {

    const [productCategory, setProductCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Function to detect if the user is on a mobile device

    const checkIsMobile = () => {
        setIsMobile(window.innerWidth <= 768); // Set your mobile breakpoint here
    };

    const fetchCategoryData = async () => {
        try {
            setLoading(true);
            const response = await fetch(summaryApi.category_product.url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const Rdata = await response.json();
            setLoading(false);
            setProductCategory(Rdata?.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false); // Stop the loading state even on error
        }
    };

    useEffect(() => {

        fetchCategoryData();
        checkIsMobile(); // Check on initial render

        // Add an event listener to detect screen size changes

        window.addEventListener('resize', checkIsMobile);
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);


    return (

    <div className="container mx-auto pt-4">
        {loading ? (
            <div className="flex space-x-6 overflow-x-auto p-4 hide-scrollbar md:scrollbar-visible">

                {[...Array(isMobile ? 4 : 10)].map((_, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-lg rounded-2xl p-3 flex flex-col items-center relative group"
                        style={{ width: '150px', height: '140px' }}
                    >
                        {/* Skeleton content */}
                        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                            <div className="w-20 h-20 rounded-full border-2 border-black bg-gray-300 animate-pulse mb-2"></div>
                            <div className="bg-gray-300 rounded w-3/4 h-4 animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (


            <div className="flex space-x-6 overflow-x-auto p-4 hide-scrollbar md:scrollbar-visible">
                { productCategory.map((product, index) => (
                    <Link
                        to={`/category-product/${product.category}`}
                        key={index}
                        className="bg-white shadow-lg rounded-2xl p-3 flex flex-col items-center cursor-pointer hover:shadow-2xl transform transition duration-300 hover:scale-105 relative group"
                        style={{ width: '150px', height: '140px' }}
                    >
                        {/* Content */}
                        <div className="relative z-10 w-full h-full flex flex-col items-center">
                            {/* Circular Image Container */}
                            <div className="w-20 h-20 rounded-full border-2 border-black p-1 bg-white flex items-center justify-center mb-2 overflow-hidden group-hover:border-gray-600 transition-colors duration-300">
                                {product?.productIMAGES && product.productIMAGES.length > 0 ? (
                                    <img
                                        src={product.productIMAGES[0].url}
                                        alt={product.category}
                                        className="w-full h-full object-cover rounded-full transition-transform transform hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Category Title */}
                            <p className="text-xs font-semibold text-gray-800 uppercase text-center leading-tight">
                                {product?.category}
                            </p>
                        </div>

                        {/* Ripple effect */}
                        <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-active:opacity-20 group-active:animate-ping"></div>
                    </Link>
                ))}
            </div>
        )}


    </div>
);




};

// // SkeletonCard Component Definition
const SkeletonCard = () => (
    <div
        className="bg-gradient-to-r from-gray-200 to-gray-300 shadow-xl rounded-lg p-2 flex flex-col items-center cursor-pointer"
        style={{ width: '130px', height: '120px' }}
    >
        <div className="bg-gray-300 animate-pulse rounded-2xl p-1 flex items-center justify-center w-full h-20">
            <div className="w-full h-full bg-gray-400 rounded-lg"></div>
        </div>
        <div className="w-3/4 h-4 bg-gray-400 mt-2 animate-pulse rounded"></div>
    </div>
);
