import Controller from './Controller.js';
import PortfolioModel from '../Models/PortfolioModel.js';

export default class PortfolioController extends Controller {
    constructor() {
        super();
        this.model = new PortfolioModel();
    }

    async render() {
        const projects = await this.model.getAllProjects();
        await this.renderView('portfolio');
        this.bindData(projects);
    }

    bindData(projects) {
        const list = document.getElementById('projects-list');
        if (list) {
            list.innerHTML = projects.map(p => `
                 <div class="group relative overflow-hidden rounded-xl shadow-lg bg-gray-900 aspect-video">
                    <!-- Placeholder Image BG -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 transition-opacity duration-300 opacity-90 group-hover:opacity-100"></div>
                    
                    <!-- Content -->
                    <div class="absolute bottom-0 left-0 p-6 z-20 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <span class="inline-block px-3 py-1 bg-accent text-white text-xs font-bold rounded-full mb-2">${p.category}</span>
                        <h3 class="text-xl font-bold text-white mb-1 group-hover:text-accent-light transition-colors">${p.title}</h3>
                        <p class="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">${p.description}</p>
                    </div>
                </div>
            `).join('');
        }
    }
}
