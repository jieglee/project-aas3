"use client";

export default function BookImage({ book }) {
    return (
        <div className="flex justify-center items-center">
            <img
                src={book.img ? `/buku/${book.img}` : "/placeholder.png"}
                alt={book.judul}
                className="rounded-xl shadow-md max-w-[300px] w-full"
            />
        </div>
    );
}
