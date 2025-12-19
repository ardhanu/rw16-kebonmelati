import Controller from './Controller.js';
import ServicesModel from '../Models/ServicesModel.js';

export default class ServicesController extends Controller {
    constructor() {
        super();
        this.model = new ServicesModel();
    }

    async render() {
        const services = await this.model.getAllServices();
        await this.renderView('services');
        this.bindData(services);
    }

    bindData(services) {
        const list = document.getElementById('services-list');
        if (list) {
            list.innerHTML = services.map(s => `
                <div class="bg-white p-8 rounded-xl shadow-lg border border-neutral-border hover:shadow-xl transition-all duration-300">
                    <div class="h-14 w-14 bg-blue-50 rounded-lg flex items-center justify-center mb-6 text-accent">
                        <span class="material-icons text-2xl font-bold">${s.title[0]}</span>
                    </div>
                    <h3 class="text-2xl font-bold text-primary mb-3">${s.title}</h3>
                    <p class="text-neutral-text-secondary leading-relaxed mb-6">${s.description}</p>
                    <ul class="space-y-2 mb-6">
                        <li class="flex items-center text-sm text-gray-500">
                            <span class="w-2 h-2 bg-accent rounded-full mr-2"></span> Feature point 1
                        </li>
                        <li class="flex items-center text-sm text-gray-500">
                            <span class="w-2 h-2 bg-accent rounded-full mr-2"></span> Feature point 2
                        </li>
                    </ul>
                    <a href="/contact" data-link class="text-accent font-semibold hover:text-accent-hover flex items-center">
                        Request Quote <span class="ml-2">&rarr;</span>
                    </a>
                </div>
            `).join('');
        }
    }
}
