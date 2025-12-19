import { CONFIG } from '../Config.js';

export default class ContentfulService {
    /**
     * Fetch 'kegiatan' entries.
     * Tries Contentful first if enabled, falls back to local JSON.
     */
    static async getKegiatan() {
        if (CONFIG.useCMS && CONFIG.contentful.spaceID && CONFIG.contentful.accessToken) {
            try {
                console.log("[Contentful] Fetching data from CMS...");
                return await this.fetchFromAPI();
            } catch (error) {
                console.error("[Contentful] API Error, using fallback:", error);
                return await this.fetchLocalFallback();
            }
        } else {
            console.log("[Contentful] CMS disabled or keys missing. Using local data.");
            return await this.fetchLocalFallback();
        }
    }

    /**
     * Fetch from Contentful GraphQL/Rest API
     */
    static async fetchFromAPI() {
        const SPACE = CONFIG.contentful.spaceID;
        const TOKEN = CONFIG.contentful.accessToken;
        const URL = `https://cdn.contentful.com/spaces/${SPACE}/environments/master/entries?content_type=kegiatan&access_token=${TOKEN}`;

        const response = await fetch(URL);
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
        
        const data = await response.json();
        
        // Normalize Contentful Data to our App Format
        return data.items.map(item => {
            const fields = item.fields;
            // Get Image URL if requested (omitted for simplicity in this step, requires 'includes' in query)
            // For now assuming text only or basic mapping
            return {
                id: item.sys.id,
                title: fields.title,
                category: fields.category,
                description: fields.description,
                date: new Date(fields.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }),
                image: null // We will handle images in advanced step, or use fallback
            };
        });
    }

    /**
     * Fetch from local JSON file
     */
    static async fetchLocalFallback() {
        try {
            const response = await fetch('/public/data/kegiatan.json');
            return await response.json();
        } catch (error) {
            console.error("Local Data Missing", error);
            return [];
        }
    }
}
