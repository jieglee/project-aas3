"use client";
import { useRouter } from "next/navigation";
import { BsArrowLeftShort } from "react-icons/bs";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800 mb-6 flex items-center gap-2 text-sm font-medium"
        >
            <BsArrowLeftShort size={20} /> Kembali
        </button>
    );
}
