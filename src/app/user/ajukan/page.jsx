"use client";

import { useState } from "react";
import BookInfo from "../../../component/user/Detail/BookInfo";
import PeminjamanForm from "../../../component/user/Ajukan/PeminjamanForm";
import PeminjamanStatus from "../../../component/user/Ajukan/PeminjamanStatus";
import PeminjamanActions from "../../../component/user/Ajukan/PeminjamanActions";

export default function PeminjamanDetailPage({ book }) {
    const [status, setStatus] = useState("idle");


    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <BookInfo book={book} />

            <PeminjamanForm
                book={book}
                status={status}
                setStatus={setStatus}
            />

            <PeminjamanStatus status={status} />

            <PeminjamanActions status={status} setStatus={setStatus} />
        </div>
    );
}
