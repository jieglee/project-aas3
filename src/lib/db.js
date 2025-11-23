import mysql from "mysql2/promise";

// Konfigurasi koneksi database MySQL dengan connection pooling
export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "amantaruna20",
    database: "db_perpus",
    waitForConnections: true,
    connectionLimit: 10,        // Maksimal 10 koneksi aktif
    queueLimit: 0,              // Tidak ada limit antrian
    enableKeepAlive: true,      // Menjaga koneksi tetap hidup
    keepAliveInitialDelay: 0
});

// Fungsi test koneksi (opsional, untuk debugging)
export async function testConnection() {
    try {
        const connection = await db.getConnection();
        console.log('✅ Database MySQL connected successfully to db_perpus');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        return false;
    }
}

// Export default juga untuk fleksibilitas import
export default db;