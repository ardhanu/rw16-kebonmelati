import Controller from './Controller.js';
import RWModel from '../Models/RWModel.js';
import LayananModel from '../Models/LayananModel.js';

export default class HomeController extends Controller {
    constructor() {
        super();
        this.rwModel = new RWModel();
        this.layananModel = new LayananModel();
    }

    async render() {
        // Fetch Data Parallelly
        const [identity, highlights, topServices] = await Promise.all([
            this.rwModel.getIdentity(),
            this.rwModel.getHighlights(),
            this.layananModel.getTopServices(3) // Get top 3 services
        ]);

        const data = { identity, highlights, topServices };

        // Render View
        await this.renderView('home');

        // Bind Data
        this.bindData(data);
    }

    bindData(data) {
        // Value Proposition (Hero Section)
        const heroTitle = document.getElementById('hero-title');
        const heroTagline = document.getElementById('hero-tagline');
        const heroDesc = document.getElementById('hero-desc');
        
        if (heroTitle) heroTitle.textContent = data.identity.name;
        if (heroTagline) heroTagline.textContent = data.identity.tagline; // Can be swapped for visual hierarchy
        if (heroDesc) heroDesc.textContent = data.identity.description;
        
        // Highlights Integration
        const highlightsContainer = document.getElementById('highlights-list');
        if (highlightsContainer) {
            highlightsContainer.innerHTML = data.highlights.map(h => `
                 <div class="bg-neutral-soft p-6 rounded-lg shadow-sm border border-neutral-border hover:shadow-md transition-shadow duration-300">
                    <h3 class="text-xl font-bold text-primary mb-2">${h.title}</h3>
                    <p class="text-neutral-text-secondary">${h.desc}</p>
                </div>
            `).join('');
        }

        // Services Summary Integration
        const servicesContainer = document.getElementById('services-summary');
        if (servicesContainer) {
            servicesContainer.innerHTML = data.topServices.map(s => `
                <div class="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-transform border-t-4 border-accent">
                    <div class="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-accent">
                        <!-- Simple Icon representation -->
                        <span class="font-bold text-xl">${s.title[0]}</span>
                    </div>
                    <h3 class="text-xl font-bold text-primary mb-2">${s.title}</h3>
                    <p class="text-gray-600 mb-4 text-sm">${s.description}</p>
                    <a href="/services" data-link class="text-accent font-semibold hover:text-accent-hover text-sm">Learn more &rarr;</a>
                </div>
            `).join('');
        }
    }
}
