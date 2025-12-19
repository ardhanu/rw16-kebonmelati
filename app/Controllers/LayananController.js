import Controller from './Controller.js';
import LayananModel from '../Models/LayananModel.js';

export default class LayananController extends Controller {
    constructor() {
        super();
        this.model = new LayananModel();
    }

    async render() {
        const services = this.model.getAllServices();
        const procedure = this.model.getProcedure();
        
        await this.renderView('services');
        this.bindData(services, procedure);
    }

    bindData(services, procedure) {
        // 1. Render Sidebar Menu
        const menuContainer = document.getElementById('services-menu');
        if (menuContainer) {
            menuContainer.innerHTML = services.map(s => `
                <button onclick="window.app.getController().showService(${s.id})" 
                        id="menu-btn-${s.id}"
                        class="cursor-pointer w-full text-left px-4 py-3 rounded-lg flex items-center justify-between group hover:bg-white hover:shadow-sm transition-all text-gray-600 font-medium border border-transparent hover:border-gray-200">
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-gray-400 group-hover:text-accent transition-colors">${s.icon}</span>
                        <span>${s.title}</span>
                    </div>
                    <span class="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 text-accent">chevron_right</span>
                </button>
            `).join('');
        }

        // 2. Render Default Content (Procedure)
        this.showProcedure();
    }

    showProcedure() {
        // ... (No change)
    }

    // Since showProcedure and showService inject into 'services-content' which is inside the grid,
    // I need to check where the GRID is defined. It is in services.html (the view template).
    // I will check services.html first.


    showProcedure() {
        const procedure = this.model.getProcedure();
        const contentContainer = document.getElementById('services-content');
        this.setActiveMenu(null); // Clear active state

        if (contentContainer) {
            contentContainer.innerHTML = `
                <div class="animate-fade-in">
                    <div class="flex items-center gap-4 mb-8 border-b pb-6">
                        <div class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-accent">
                            <span class="material-symbols-outlined text-3xl">info</span>
                        </div>
                        <div>
                            <h2 class="text-3xl font-bold text-primary">${procedure.title}</h2>
                            <p class="text-gray-500">Panduan umum pengurusan administrasi.</p>
                        </div>
                    </div>

                    <div class="grid gap-6">
                        ${procedure.steps.map((step, index) => `
                            <div class="flex gap-4">
                                <div class="flex-shrink-0 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold shadow-lg shadow-blue-200">
                                    ${index + 1}
                                </div>
                                <div class="pt-1">
                                    <h4 class="font-bold text-lg text-gray-800 mb-1">${step.title}</h4>
                                    <p class="text-gray-600 leading-relaxed">${step.desc}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="mt-8 p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-sm text-yellow-800 flex gap-2">
                        <span class="material-symbols-outlined text-yellow-500">lightbulb</span>
                        <p>Silakan pilih menu di sebelah kiri untuk melihat syarat spesifik surat yang Anda butuhkan.</p>
                    </div>
                </div>
            `;
        }
    }

    showService(id) {
        const services = this.model.getAllServices();
        const service = services.find(s => s.id === id);
        const contentContainer = document.getElementById('services-content');
        this.setActiveMenu(id);

        if (contentContainer && service) {
            contentContainer.innerHTML = `
                <div class="animate-fade-in">
                    <button onclick="window.app.getController().showProcedure()" class="mb-6 text-sm text-gray-500 hover:text-accent flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">arrow_back</span> Kembali ke Tata Cara
                    </button>

                    <div class="flex items-center gap-4 mb-8 border-b pb-6">
                        <div class="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center text-white">
                            <span class="material-symbols-outlined text-3xl">${service.icon}</span>
                        </div>
                        <div>
                            <h2 class="text-3xl font-bold text-primary">${service.title}</h2>
                            <p class="text-gray-500">Detail Persyaratan & Dokumen</p>
                        </div>
                    </div>

                    <div class="bg-blue-50/50 p-6 rounded-xl border border-blue-50 mb-8">
                        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span class="material-symbols-outlined text-accent">description</span>
                            Deskripsi
                        </h3>
                        <p class="text-gray-700 leading-relaxed">${service.description}</p>
                    </div>

                    <div>
                        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span class="material-symbols-outlined text-accent">checklist</span>
                            Dokumen yang Harus Disiapkan
                        </h3>
                        <ul class="space-y-3">
                            ${service.requirements.map(req => `
                                <li class="flex items-start p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                                    <span class="material-symbols-outlined text-green-500 mr-3 mt-0.5">check_circle</span>
                                    <span class="text-gray-700">${req}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            `;
        }
    }

    setActiveMenu(activeId) {
        // Reset all buttons
        document.querySelectorAll('[id^="menu-btn-"]').forEach(btn => {
            btn.className = "w-full text-left px-4 py-3 rounded-lg flex items-center justify-between group hover:bg-white hover:shadow-sm transition-all text-gray-600 font-medium border border-transparent hover:border-gray-200";
        });

        // Activate specific button
        if (activeId) {
            const activeBtn = document.getElementById(`menu-btn-${activeId}`);
            if (activeBtn) {
                activeBtn.className = "w-full text-left px-4 py-3 rounded-lg flex items-center justify-between bg-white shadow-md text-accent font-bold border border-gray-100 ring-2 ring-blue-50/50 z-10";
            }
        }
    }
}
