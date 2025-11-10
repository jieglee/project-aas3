export default function Contact() {
  return (
    <section className="w-full py-20 bg-white px-6 md:px-20 flex flex-col md:flex-row items-center justify-center gap-12">
      <div className="w-full md:w-1/2 rounded-xl shadow-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.073821305011!2d106.86741237355677!3d-6.3844738624455175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ebaff005f277%3A0x9fcd41028665eea8!2sSMK%20Taruna%20Bhakti%20Depok!5e0!3m2!1sid!2sid!4v1762756508632!5m2!1sid!2sid"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="w-full md:w-1/2 text-center md:text-left space-y-3">
        <h3 className="text-xl font-bold text-gray-800">Perpustakaan SMK TARUNA BHAKTI</h3>
        <p className="text-gray-700">
          Jl. Pekapuran, RT.02/RW.06, Curug, Kec. Cimanggis, Kota Depok, Jawa Barat 16953
        </p>
        <p className="text-gray-700">Telp. (021) 8744810</p>
        <p className="text-gray-700">
          Email:{" "}
          <a href="mailto:taruna@smktarunabhakti.net" className="text-blue-700 underline hover:text-blue-900">
            taruna@smktarunabhakti.net
          </a>
        </p>
      </div>
    </section>
  );
}
