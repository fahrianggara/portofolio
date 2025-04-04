export default class Contact {
  constructor(name = "", email = "", subject = "", message = "") {
    this.name = name;
    this.email = email;
    this.subject = subject;
    this.message = message;
    this.ip_address = "";
    this.user_agent = "";
    this.errors = {}; // contains error messages for each field
  }

  setErrors(errors) {
    this.errors = errors;
  }

  reset() {
    this.name = "";
    this.email = "";
    this.subject = "";
    this.message = "";
    this.ip_address = "";
    this.user_agent = "";
    this.errors = {};
  }

  isValid() {
    this.errors = {};

    if (!this.name.trim()) {
      this.errors.name = ["Name is required"];
    } else if (this.name.trim().length < 3) {
      this.errors.name = ["Name must be at least 3 characters"];
    }

    if (!this.email.trim()) {
      this.errors.email = ["Email is required"];
    } else if (!/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(this.email)) {
      this.errors.email = ["Invalid email format"];
    }

    if (!this.subject.trim()) {
      this.errors.subject = ["Subject is required"];
    }

    if (!this.message.trim()) {
      this.errors.message = ["Message is required"];
    } else if (this.message.trim().length < 10) {
      this.errors.message = ["Message must be at least 10 characters"];
    }

    // returns true if there are no errors
    return Object.keys(this.errors).length === 0;
  }
}
