export const replaceText = (text, searchValue, replaceValue) => {
  if (typeof text !== "string") return text; // Pastikan input adalah string
  return text.replace(new RegExp(searchValue, "g"), replaceValue);
};

export const containsText = (text, searchValue) => {
  if (typeof text !== "string") return false; // Pastikan input adalah string
  return new RegExp(searchValue, "g").test(text); // Cek apakah searchValue ada di dalam text
};

export const formatDate = (isoDate) => {
  const dateObj = new Date(isoDate);
  const now = new Date();

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formattedDate = `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()} ${dateObj.getFullYear()}`;

  // Hitung selisih waktu dalam milidetik
  const diffMs = now - dateObj;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // Konversi ke jam
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // Sisa menit

  return {
    formattedDate,
    diffHours,
    diffMinutes
  };
}