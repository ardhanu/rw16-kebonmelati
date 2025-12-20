import Controller from "./Controller.js";
import RWModel from "../Models/RWModel.js";

export default class ContactController extends Controller {
  constructor() {
    super();
    this.model = new RWModel();
    // TODO: Replace this URL with your deployed Web App URL
    this.SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbzn3f-2C-RE281BQdGJRaP17PBtdhEVR5M-wV3s94TRozLl9GANMk5_IMn6U_ASBdES-Q/exec";
  }

  async render() {
    const identity = await this.model.getIdentity();
    await this.renderView("contact");
    this.bindData(identity);
    this.bindEvents();
  }

  bindData(identity) {
    document.getElementById("contact-email").textContent = identity.email;
    document.getElementById("contact-phone").textContent = identity.phone;
    document.getElementById("contact-address").textContent = identity.address;
  }

  bindEvents() {
    const form = document.getElementById("aspiration-form");
    if (form) {
      form.addEventListener("submit", (e) => this.submitAspiration(e));
    }
  }

  async submitAspiration(e) {
    e.preventDefault();
    const btn = document.getElementById("btn-submit");
    const status = document.getElementById("form-status");

    btn.disabled = true;
    btn.textContent = "Mengirim...";
    status.classList.add("hidden");
    status.className = "text-center text-sm mt-2";

    const formData = new FormData();
    formData.append("Nama Lengkap", document.getElementById("asp-nama").value);
    formData.append(
      "Nomor WhatsApp",
      document.getElementById("asp-whatsapp").value
    );
    formData.append("RT Berapa", document.getElementById("asp-rt").value);
    formData.append("Kategori", document.getElementById("asp-kategori").value);
    formData.append("Pesan", document.getElementById("asp-pesan").value);

    try {
      if (this.SCRIPT_URL.includes("YOUR_GOOGLE_APPS_SCRIPT")) {
        throw new Error("Konfigurasi URL Script belum diset.");
      }

      // Using no-cors mode for Google Apps Script Web App
      await fetch(this.SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      // Assumed success (opaque response)
      btn.disabled = false;
      btn.textContent = "Kirim Pesan";
      status.textContent = "Aspirasi berhasil dikirim! Terima kasih.";
      status.classList.add("text-green-600");
      status.classList.remove("hidden");
      document.getElementById("aspiration-form").reset();
    } catch (error) {
      console.error(error);
      btn.disabled = false;
      btn.textContent = "Kirim Pesan";
      status.textContent = "Gagal mengirim: " + error.message;
      status.classList.add("text-red-500");
      status.classList.remove("hidden");
    }
  }
}
