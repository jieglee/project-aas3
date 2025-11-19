import Image from "next/image";

export default function Tentang() {
  return (
    <section
            id="tentang"
            className="w-full bg-white py-20 px-8 md:px-20 flex flex-col items-center justify-center gap-10"
          >
            <h2 className="text-3xl font-bold text-center mb-10">
              <span className="text-gray-800">Tentang</span>{" "}
              <span className="text-[#1E3A8A]">PusTBaka</span>
            </h2>
    
            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
              <div className="w-full md:w-1/2 flex justify-center">
                <Image
                  src="/Learning-rafiki.png"
                  alt="Ilustrasi PusTBaka"
                  width={400}
                  height={300}
                  className="rounded-lg "
                />
              </div>
    
              <div className="w-full md:w-1/2 text-center md:text-left">
                <p className="text-gray-700 text-medium leading-relaxed text-justify">
                  PusTBaka adalah sistem perpustakaan digital sekolah Taruna Bhakti
                  yang memudahkan siswa untuk mencari, meminjam, dan membaca buku
                  secara online dengan mudah dan efisien.
                </p>
              </div>
            </div>
          </section>
  );
}
