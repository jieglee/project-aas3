"use client";

import { motion } from "framer-motion";
import { FaHeart, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function BookActions({ id, book }) {
    const router = useRouter();

    const handleWishlist = () => {
        toast.success(`${book.title} added to wishlist ❤️`);
    };

    return (
        <div className="flex gap-3 mt-6">
            <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => router.push(`/Layout/User/Borrow?id=${id}`)}
                className="bg-blue-900 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-sm"
            >
                <FaPlus /> Pinjam
            </motion.button>

            <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={handleWishlist}
                className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-sm"
            >
                <FaHeart className="text-red-500" /> Wishlist
            </motion.button>
        </div>
    );
}
