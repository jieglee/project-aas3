// generateHash.js
import bcrypt from "bcryptjs";

// Ganti password di bawah dengan password baru yang kamu inginkan
const password = "12345678"; 
const saltRounds = 10;

// generate hash
const hash = bcrypt.hashSync(password, saltRounds);

console.log("Password baru (plaintext):", password);
console.log("Hash bcrypt untuk database:", hash);
