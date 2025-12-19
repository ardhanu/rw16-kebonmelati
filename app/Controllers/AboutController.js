import Controller from './Controller.js';
import RWModel from '../Models/RWModel.js';

export default class AboutController extends Controller {
    constructor() {
        super();
        this.model = new RWModel();
    }

    async render() {
        const [identity, about] = await Promise.all([
            this.model.getIdentity(),
            this.model.getAbout()
        ]);
        
        await this.renderView('about');
        this.bindData({ identity, about });
    }

    bindData({ identity, about }) {
        // ... (identity binding logic if any)

        if (about.vision) document.getElementById('about-vision').textContent = about.vision;
        if (about.mission) document.getElementById('about-mission').textContent = about.mission;
        
        // History/Description - mapped from Identity or About
        const descEl = document.getElementById('about-history');
        if (descEl) descEl.textContent = identity.description; // Using description as story for now

        // Bind Citizen Charter (Rights & Obligations) -- NEW
        const rightsListEl = document.getElementById('about-rights-list');
        if (rightsListEl && about.citizen_charter) {
             rightsListEl.innerHTML = about.citizen_charter.rights.map(r => `<li class="flex items-start"><span class="mr-2 text-accent">•</span>${r}</li>`).join('');
        }
        
        const obligationsListEl = document.getElementById('about-obligations-list');
        if (obligationsListEl && about.citizen_charter) {
             obligationsListEl.innerHTML = about.citizen_charter.obligations.map(o => `<li class="flex items-start"><span class="mr-2 text-accent">•</span>${o}</li>`).join('');
        }

        // Bind Structure
        const structureEl = document.getElementById('about-structure');
        if (structureEl && about.structure) {
            structureEl.innerHTML = `
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jabatan</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        ${about.structure.map(s => `
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${s.role}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${s.name}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }
        
        // Bind RT List
        const rtListEl = document.getElementById('about-rt-list');
        if (rtListEl && about.rt_list) {
            rtListEl.innerHTML = about.rt_list.map(rt => `
                <div class="bg-white p-4 rounded-lg shadow border border-gray-100 flex justify-between items-center">
                    <span class="font-bold text-primary">${rt.name}</span>
                    <span class="text-sm text-gray-500">Ketua: ${rt.ketua}</span>
                </div>
            `).join('');
        }
    }
}
