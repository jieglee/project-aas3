import Image from "next/image";

export default function Koleksi() {
  return (
    <section className="w-full py-20 bg-gray-50 px-6 md:px-20 text-center">
      <h2 className="text-3xl font-bold mb-10">
        <span className="text-black">Koleksi Buku</span>{" "}
        <span className="text-blue-700">Populer</span>
      </h2>

      <div className="relative flex items-center justify-center">
        <button className="absolute left-0 bg-white shadow-lg rounded-full p-3 hover:bg-blue-100 transition">
          <span className="text-2xl text-gray-700">❮</span>
        </button>

        <div className="flex space-x-6 overflow-x-auto scrollbar-hide px-12 py-4">
          {[1, 2, 3, 4].map((book) => (
            <div key={book} className="bg-white shadow-md rounded-xl p-5 flex flex-col items-center justify-between hover:shadow-xl transition-all duration-300 min-w-[200px]">
              <Image src="/hans.png" alt="Hans" width={150} height={220} className="rounded-md mb-4" />
              <h3 className="font-bold text-lg text-gray-800">Hans</h3>
              <p className="text-gray-500 text-sm mb-3">Risa Saraswati</p>
              <button className="bg-blue-700 text-white text-sm px-5 py-2 rounded-full hover:bg-blue-800 transition">
                Pinjam
              </button>
            </div>
          ))}
        </div>

        <button className="absolute right-0 bg-white shadow-lg rounded-full p-3 hover:bg-blue-100 transition">
          <span className="text-2xl text-gray-700">❯</span>
        </button>
      </div>

      <div className="mt-8">
        <a href="#" className="text-blue-700 font-medium hover:underline transition">
          Lihat Semua Koleksi
        </a>
      </div>
    </section>
  );
}
