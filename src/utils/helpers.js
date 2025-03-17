import CryptoJS from "crypto-js";

// Enkripsi data
export const encryptData = (data, SECRET_KEY) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Dekripsi data
export const decryptData = (ciphertext, SECRET_KEY) => {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decrypted); // Parse setelah didekripsi
    } catch (error) {
        console.error("Error decrypting data:", error);
        return null;
    }
};

export const replaceText = (text, searchValue, replaceValue) => {
    if (typeof text !== "string") return text; // Pastikan input adalah string
    return text.replace(new RegExp(searchValue, "g"), replaceValue);
};

export const containsText = (text, searchValue) => {
    if (typeof text !== "string") return false; // Pastikan input adalah string
    return new RegExp(searchValue, "g").test(text); // Cek apakah searchValue ada di dalam text
};
