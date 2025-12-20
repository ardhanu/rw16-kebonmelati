import Router from "./Router.js";
import KegiatanModel from "../Models/KegiatanModel.js";

class App {
  constructor() {
    this.routes = [
      { path: "/", controller: "HomeController", title: "Beranda" },
      {
        path: "/about",
        controller: "AboutController",
        title: "Profil Wilayah",
      },
      {
        path: "/services",
        controller: "LayananController",
        title: "Layanan Warga",
      },
      {
        path: "/kegiatan",
        controller: "KegiatanController",
        title: "Galeri Kegiatan",
      },
      {
        path: "/contact",
        controller: "ContactController",
        title: "Hubungi Kami",
      },
    ];

    this.router = new Router(this.routes);
    this.kegiatanModel = new KegiatanModel();
  }

  init() {
    console.log("App Initialized");
    this.router.handleRoute();
    this.checkNotifications();
  }

  async checkNotifications() {
    try {
      const projects = await this.kegiatanModel.getAllProjects();
      const currentCount = projects.length;
      const lastCount = parseInt(
        localStorage.getItem("last_kegiatan_count") || "0"
      );

      if (currentCount > lastCount) {
        this.showBadge("nav-kegiatan-desktop");
        this.showBadge("nav-kegiatan-mobile");
      }
    } catch (error) {
      console.error("Failed to check notifications:", error);
    }
  }

  showBadge(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
      // Check if badge already exists to avoid duplicates
      if (!el.querySelector(".badge-dot")) {
        const badge = document.createElement("span");
        badge.className =
          "badge-dot absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse border border-white";
        el.appendChild(badge);
      }
    }
  }

  getController() {
    return this.router.currentController;
  }

  toggleMenu() {
    const menu = document.getElementById("mobile-menu");
    if (menu) {
      menu.classList.toggle("hidden");
    }
  }
}

const app = new App();
window.app = app; // Expose to window for inline onclick handlers
app.init();
