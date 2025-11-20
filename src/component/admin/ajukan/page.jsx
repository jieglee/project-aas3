"use client";

import { useState, useEffect } from "react";
import BookInfo from "../../user/Detail/BookInfo";
import PeminjamanForm from "../../user/Ajukan/PeminjamanForm";
import PeminjamanStatus from "../../user/Ajukan/PeminjamanStatus";
import PeminjamanActions from "../../user/Ajukan/PeminjamanActions";

export default function AjukanDetailPage({ bookId }) {
  const [book, setBook] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    async function fetchBook() {
      const res = await fetch(`/api/books/${bookId}`);
      const data = await res.json();
      setBook(data);
    }
    fetchBook();
  }, [bookId]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <BookInfo book={book} />
      <PeminjamanForm book={book} status={status} setStatus={setStatus} />
      <PeminjamanStatus status={status} />
      <PeminjamanActions status={status} setStatus={setStatus} />
    </div>
  );
}
