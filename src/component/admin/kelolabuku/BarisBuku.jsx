"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import Badge from "../../ui/Badge"; 

export default function BarisBuku({ book, reload }) {
    const handleDelete = async () => {
        if (!confirm("Hapus buku ini?")) return;

        await fetch(`/api/buku/${book.id}`, { method: "DELETE" });
        if (typeof reload === "function") reload();
    };

    return (
        <tr className="border-t hover:bg-gray-50">
            <td className="p-3">
                <Image
                    src={`/images/${book.img}`}
                    alt={book.judul}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                />
            </td>

            <td className="p-3">B{book.id}</td>

            <td className="p-3 font-medium">{book.judul}</td>

            <td className="p-3">{book.penulis}</td>

            <td className="p-3">
                <Badge variant="outline">{book.kategori}</Badge>
            </td>

            <td className="p-3">{book.stok}</td>

            <td className="p-3">
                <div className="flex items-center gap-3 justify-center">
                    <Link
                        href={`/admin/buku/edit/${book.id}`}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <Pencil size={20} />
                    </Link>

                    <button
                        onClick={handleDelete}
                        className="text-red-600 hover:text-red-800"
                        aria-label={`Hapus ${book.judul}`}
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </td>
        </tr>
    );
}
