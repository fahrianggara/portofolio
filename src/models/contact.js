export default class Contact {
  constructor(name = "", email = "", subject = "", message = "") {
    this.name = name;
    this.email = email;
    this.subject = subject;
    this.message = message;
    this.errors = {}; // Menyimpan error validasi
  }

  // Fungsi untuk set error dari API
  setErrors(errors) {
    this.errors = errors;
  }

  // Fungsi untuk reset data form
  reset() {
    this.name = "";
    this.email = "";
    this.subject = "";
    this.message = "";
    this.errors = {};
  }
}
