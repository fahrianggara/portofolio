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

// Simpan data ke LocalStorage dengan expiry time
export const setWithExpiry = (key, value, SECRET_KEY, ttl) => {
    const now = new Date().getTime();
    const encryptedValue = encryptData(value, SECRET_KEY);
    
    const item = {
        value: encryptedValue, // Simpan dalam bentuk string terenkripsi
        expiry: now + ttl,
    };

    localStorage.setItem(key, JSON.stringify(item));
};

// Ambil data dari LocalStorage dengan pengecekan expiry
export const getWithExpiry = (key, SECRET_KEY) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    try {
        const item = JSON.parse(itemStr); // Parse object JSON dulu
        const now = new Date().getTime();

        // Jika expired, hapus dari LocalStorage
        if (now > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }

        return decryptData(item.value, SECRET_KEY); // Dekripsi setelah diambil
    } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
        return null;
    }
};
