export default class Contact 
{
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
}