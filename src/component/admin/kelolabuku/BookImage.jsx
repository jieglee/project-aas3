// component/admin/kelolabuku/BookImage.jsx
"use client";

import { useState } from "react";

export default function BookImage({ src, alt, className = "" }) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    if (error || !src) {
        return (
            <div className={`bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 ${className}`}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 mb-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                    />
                </svg>
                <span className="text-[10px]">No Image</span>
            </div>
        );
    }

    return (
        <div className="relative">
            {loading && (
                <div className={`absolute inset-0 bg-gray-200 rounded-lg animate-pulse ${className}`} />
            )}
            <img
                src={src}
                alt={alt}
                className={`${className} ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
                onLoad={() => setLoading(false)}
                onError={() => {
                    setError(true);
                    setLoading(false);
                }}
            />
        </div>
    );
}