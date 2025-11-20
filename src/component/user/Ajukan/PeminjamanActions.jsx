export default function PeminjamanActions({ status, setStatus }) {
    const handleAjukan = () => setStatus("pending");
    const handleApprove = () => setStatus("approved");
    const handleReject = () => setStatus("rejected");
    const handlePinjam = () => setStatus("borrowed");

    return (
        <div className="flex space-x-3 mt-4">
            {status === "idle" && (
                <button onClick={handleAjukan} className="btn-primary">Ajukan Peminjaman</button>
            )}
            {status === "approved" && (
                <button onClick={handlePinjam} className="btn-success">Pinjam Buku</button>
            )}
            {status === "rejected" && (
                <p className="text-red-500">Peminjaman ditolak</p>
            )}
        </div>
    );
}
