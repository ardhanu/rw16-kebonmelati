/**
 * Kegiatan Model
 * Stores activities and programs.
 */
import GoogleSheetService from '../Services/GoogleSheetService.js';

export default class KegiatanModel {
    constructor() {
        // Data is now fetched dynamically
    }

    async getAllProjects() {
        return await GoogleSheetService.getKegiatan();
    }

    async getProjectById(id) {
        const projects = await this.getAllProjects();
        return projects.find(p => p.id == id);
    }
}
