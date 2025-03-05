import CryptoJS from "crypto-js";

// 🔐 Enkripsi data
export const encryptData = (data, SECRET_KEY) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// 🔓 Dekripsi data
export const decryptData = (ciphertext, SECRET_KEY) => {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
        console.error("Error decrypting data:", error);
        return null;
    }
};
