"use client";
import { useEffect, useState } from "react";

export default function Statistik() {
  const [books, setBooks] = useState(0);
  const [borrowed, setBorrowed] = useState(0);
  const [types, setTypes] = useState(0);

  useEffect(() => {
    const animateValue = (setter, target, duration) => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }
        setter(Math.floor(start));
      }, 16);
    };

    animateValue(setBooks, 150, 4000);
    animateValue(setBorrowed, 300, 4000);
    animateValue(setTypes, 50, 4000);
  }, []);

  return (
    <section className="relative z-20 w-full flex items-center justify-center -mt-30">
      <div className="flex flex-col md:flex-row items-center justify-center gap-20">
        {/* Kartu kiri */}
        <div className="bg-white rounded-2xl border-1 border-[#1E3A8A] shadow-md w-44 h-56 flex flex-col items-center justify-center text-center transition-transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24">
	<g fill="none" fillRule="evenodd">
		<path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
		<path fill="#1E3A8A" d="M3 4a2 2 0 0 1 2-2h2c.364 0 .706.097 1 .268A2 2 0 0 1 9 2h2c.727 0 1.364.388 1.714.969c.21-.168.456-.296.732-.37l1.932-.517a2 2 0 0 1 2.45 1.414l4.14 15.455a2 2 0 0 1-1.414 2.45l-1.932.517a2 2 0 0 1-2.45-1.414L13 8.663V20a2 2 0 0 1-2 2H9a2 2 0 0 1-1-.268A2 2 0 0 1 7 22H5a2 2 0 0 1-2-2zm2 0h2v16H5zm6 16H9V4h2zm2.964-15.469l1.931-.517l4.142 15.455l-1.932.517z"></path>
	</g>
</svg>
          <h2 className="text-3xl font-extrabold text-blue-900 mt-2">{books}+</h2>
          <p className="text-gray-700 font-medium">Buku tersedia</p>
        </div>

{/* Kartu tengah */}
<div className="bg-white rounded-2xl shadow-lg border-2 border-[#1E3A8A] w-80 h-44 flex flex-col items-center justify-center scale-105 hover:scale-110 transition-transform">
  <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 15 16">
	<path fill="#1E3A8A" d="M7.5 7a2.5 2.5 0 0 1 0-5a2.5 2.5 0 0 1 0 5m0-4C6.67 3 6 3.67 6 4.5S6.67 6 7.5 6S9 5.33 9 4.5S8.33 3 7.5 3"></path>
	<path fill="#1E3A8A" d="M13.5 11c-.28 0-.5-.22-.5-.5s.22-.5.5-.5s.5-.22.5-.5A2.5 2.5 0 0 0 11.5 7h-1c-.28 0-.5-.22-.5-.5s.22-.5.5-.5c.83 0 1.5-.67 1.5-1.5S11.33 3 10.5 3c-.28 0-.5-.22-.5-.5s.22-.5.5-.5A2.5 2.5 0 0 1 13 4.5c0 .62-.22 1.18-.6 1.62c1.49.4 2.6 1.76 2.6 3.38c0 .83-.67 1.5-1.5 1.5m-12 0C.67 11 0 10.33 0 9.5c0-1.62 1.1-2.98 2.6-3.38c-.37-.44-.6-1-.6-1.62A2.5 2.5 0 0 1 4.5 2c.28 0 .5.22.5.5s-.22.5-.5.5C3.67 3 3 3.67 3 4.5S3.67 6 4.5 6c.28 0 .5.22.5.5s-.22.5-.5.5h-1A2.5 2.5 0 0 0 1 9.5c0 .28.22.5.5.5s.5.22.5.5s-.22.5-.5.5m9 3h-6c-.83 0-1.5-.67-1.5-1.5v-1C3 9.57 4.57 8 6.5 8h2c1.93 0 3.5 1.57 3.5 3.5v1c0 .83-.67 1.5-1.5 1.5m-4-5A2.5 2.5 0 0 0 4 11.5v1c0 .28.22.5.5.5h6c.28 0 .5-.22.5-.5v-1A2.5 2.5 0 0 0 8.5 9z"></path>
</svg>
  <h2 className="text-4xl font-extrabold text-blue-900 mt-2">{borrowed}+</h2>
  <p className="text-gray-700 font-medium">Total Pengguna</p>
</div>


        {/* Kartu kanan */}
        <div className="bg-white rounded-2xl border-1 border-[#1E3A8A] shadow-md w-44 h-56 flex flex-col items-center justify-center text-center transition-transform hover:scale-105">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={40}
            height={40}
            viewBox="0 0 24 24"
          >
            <path
              fill="#1E3A8A"
              d="M7 2a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h14V2zm4 3h7v2h-7zM5 18a2 2 0 0 1 2-2h12v4H7a2 2 0 0 1-2-2"
            />
          </svg>
          <h2 className="text-3xl font-extrabold text-blue-900 mt-2">{types}+</h2>
          <p className="text-gray-700 font-medium">Jenis Buku</p>
        </div>
      </div>
    </section>
  );
}
