import Controller from "./Controller.js";
import KegiatanModel from "../Models/KegiatanModel.js";

export default class KegiatanController extends Controller {
  constructor() {
    super();
    this.model = new KegiatanModel();
    this.searchQuery = "";
    this.activeFilter = "all";
    this.projects = [];
  }

  async render() {
    // Parse ID from Hash URL (e.g., #/portfolio?id=1)
    const hash = window.location.hash;
    const queryString = hash.split("?")[1];
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    // Fetch projects first to handle notifications
    this.projects = await this.model.getAllProjects();
    this.projects.reverse(); // Standardize order

    // Update Read Status (Clear Notification)
    if (this.projects.length > 0) {
      localStorage.setItem("last_kegiatan_count", this.projects.length);
      const badges = document.querySelectorAll(".badge-dot");
      badges.forEach((b) => b.remove());
    }

    if (id) {
      await this.renderDetail(id);
    } else {
      await this.renderList();
    }
  }

  async renderList() {
    await this.renderView("portfolio");
    this.applyFiltersAndSearch();
    this.setupControls();
  }

  setupControls() {
    // Search
    const searchInput = document.getElementById("param-search");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase();
        this.applyFiltersAndSearch();
      });
    }

    // Filters
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Update State
        this.activeFilter = btn.getAttribute("data-filter");

        // Update UI Buttons
        buttons.forEach((b) => {
          b.className =
            "filter-btn px-6 py-2.5 bg-white text-gray-600 rounded-full font-medium hover:bg-gray-50 transition-all border border-gray-200 hover:border-accent/50 hover:text-accent hover:scale-105 active:scale-95 shadow-sm cursor-pointer";
        });
        btn.className =
          "filter-btn px-6 py-2.5 bg-accent text-white rounded-full font-semibold shadow-lg shadow-accent/30 transition-all hover:scale-105 active:scale-95 cursor-pointer";

        this.applyFiltersAndSearch();
      });
      // Set initial active state for filters
      if (btn.getAttribute("data-filter") === this.activeFilter) {
        btn.className =
          "filter-btn px-6 py-2.5 bg-accent text-white rounded-full font-semibold shadow-lg shadow-accent/30 transition-all hover:scale-105 active:scale-95 cursor-pointer";
      }
    });
  }

  applyFiltersAndSearch() {
    let filtered = this.projects;

    // 1. Filter by Category
    if (this.activeFilter !== "all") {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === this.activeFilter.toLowerCase()
      );
    }

    // 2. Filter by Search
    if (this.searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(this.searchQuery) ||
          p.description.toLowerCase().includes(this.searchQuery)
      );
    }

    this.bindListData(filtered);
  }

  async renderDetail(id) {
    const project = await this.model.getProjectById(id);
    if (!project) {
      alert("Kegiatan tidak ditemukan");
      window.location.href = "/portfolio";
      return;
    }

    // Manually render Detail View (using simple template replacement)
    const app = document.getElementById("app");
    app.innerHTML = `
            <div class="pt-24 pb-12 bg-gray-50 min-h-screen">
                <div class="container mx-auto px-6 max-w-4xl">
                    <a href="/portfolio" onclick="event.preventDefault(); window.history.back();" class="inline-flex items-center text-accent font-semibold mb-6 hover:underline">
                        <span class="material-symbols-outlined mr-2">arrow_back</span> Kembali
                    </a>
                    
                    <header class="mb-8">
                        <div class="flex items-center gap-3 mb-4">
                            <span class="px-3 py-1 bg-blue-100 text-accent text-sm font-bold rounded-full">${
                              project.category
                            }</span>
                            <span class="text-gray-500 font-medium">${
                              project.date
                            }</span>
                        </div>
                        <h1 class="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">${
                          project.title
                        }</h1>
                    </header>

                    <!-- Main Image (First Image) -->
                    ${
                      project.images && project.images.length > 0
                        ? `
                        <div class="aspect-video w-full rounded-2xl overflow-hidden shadow-xl mb-8">
                            <img src="${project.images[0]}" class="w-full h-full object-cover" alt="${project.title}">
                        </div>
                    `
                        : ""
                    }

                    <!-- Article Content -->
                    <div class="prose prose-lg text-gray-700 max-w-none bg-white p-8 rounded-2xl shadow-sm mb-8">
                        <p class="whitespace-pre-line leading-relaxed">${
                          project.description
                        }</p>
                    </div>

                    <!-- Gallery Grid (Remaining Images) -->
                    ${
                      project.images && project.images.length > 1
                        ? `
                        <h3 class="text-2xl font-bold text-primary mb-6">Galeri Foto</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${project.images
                              .slice(1)
                              .map(
                                (img) => `
                                <div class="aspect-video rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <img src="${img}" class="w-full h-full object-cover">
                                </div>
                            `
                              )
                              .join("")}
                        </div>
                    `
                        : ""
                    }
                </div>
            </div>
        `;
  }

  bindListData(projects) {
    const list = document.getElementById("projects-list");
    if (!list) return;

    // Reset class to Grid just in case it was changed
    list.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";

    if (projects.length === 0) {
      list.innerHTML = `<div class="col-span-full py-12 text-center text-gray-400">Tidak ada kegiatan yang ditemukan.</div>`;
      return;
    }

    list.innerHTML = projects
      .map(
        (p) => `
             <div class="group relative overflow-hidden rounded-xl shadow-lg bg-gray-900 border border-gray-100 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
                <!-- Image Carousel -->
                <div class="aspect-video bg-neutral-200 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide relative shrink-0">
                    ${
                      p.images && p.images.length > 0
                        ? p.images
                            .map(
                              (img) => `
                            <div class="min-w-full h-full snap-center relative">
                                <img src="${img}" alt="${p.title}" class="w-full h-full object-cover">
                            </div>
                        `
                            )
                            .join("")
                        : `<div class="min-w-full h-full flex items-center justify-center">
                            <span class="material-symbols-outlined text-6xl text-gray-400">image</span>
                         </div>`
                    }
                    
                    <!-- Image Badge -->
                    ${
                      p.images && p.images.length > 1
                        ? `
                        <div class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                            <span class="material-symbols-outlined text-[10px] align-middle mr-1">photo_library</span>
                            ${p.images.length} Foto
                        </div>
                    `
                        : ""
                    }
                </div>
                
                <div class="p-6 bg-white flex flex-col grow">
                    <div class="flex justify-between items-start mb-2">
                         <span class="inline-block px-3 py-1 bg-blue-100 text-accent text-xs font-bold rounded-full">${
                           p.category
                         }</span>
                         <span class="text-xs text-gray-500 font-medium">${
                           p.date
                         }</span>
                    </div>
                   
                    <h3 class="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">${
                      p.title
                    }</h3>
                    <p class="text-gray-600 text-sm line-clamp-2 mb-4 grow">${
                      p.description
                    }</p>
                    
                    <a href="/portfolio?id=${
                      p.id
                    }" data-link class="inline-block text-center w-full py-2 rounded-lg border border-accent text-accent font-semibold hover:bg-accent hover:text-white transition-colors">
                        Lihat Detail
                    </a>
                </div>
            </div>
        `
      )
      .join("");
  }
}
