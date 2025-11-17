"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import BookImage from "../../../../component/user/Detail/BookImage";
import BookInfo from "../../../../component/user/Detail/BookInfo";
import BookActions from "../../../../component/user/Detail/BookActions";
import BackButton from "../../../../component/user/Detail/BackButton";

export default function Detail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        async function fetchBook() {
            try {
                const res = await fetch(`/api/buku/${id}`);
                const data = await res.json();
                setBook(data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchBook();
    }, [id]);

    if (!book)
        return <div className="flex items-center justify-center h-screen text-gray-600">Loading...</div>;

    return (
        <>
            <Toaster position="top-center" />
            <div className="p-6 md:p-10 max-w-5xl mx-auto">
                <BackButton />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
                    <BookImage cover={book.img} title={book.judul} />

                    <div>
                        <BookInfo book={book} />
                        <BookActions id={id} book={book} />
                    </div>
                </div>
            </div>
        </>
    );
}
