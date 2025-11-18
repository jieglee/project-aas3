"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BookImage({ cover, title }) {
    const imgSrc = cover 
        ? `/buku/${cover}`   // 🔥 Ambil gambar dari folder public/buku
        : "/default-cover.png";

    return (
        <motion.div
            className="flex justify-center items-center"
            whileHover={{ scale: 1.05, rotate: 2 }}
        >
            <Image
                src={imgSrc}
                alt={title || "Book cover"}
                width={300}
                height={420}
                className="rounded-xl shadow-md"
            />
        </motion.div>
    );
}
