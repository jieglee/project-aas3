export default function PeminjamanForm({ book, status, setStatus }) {
    if (status !== "idle") return null;

    return (
        <form className="bg-gray-50 p-4 rounded-md shadow-sm space-y-4">
            <label className="block">
                Nama Peminjam:
                <input type="text" placeholder="Masukkan nama" className="input" />
            </label>
            <label className="block">
                Lama Peminjaman (hari):
                <input type="number" placeholder="1-30" className="input" />
            </label>
            <button
                type="button"
                onClick={() => setStatus("pending")}
                className="btn-primary"
            >
                Ajukan
            </button>
        </form>
    );
}
