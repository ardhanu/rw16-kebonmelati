import { CONFIG } from '../Config.js';

export default class GoogleSheetService {
    /**
     * Fetch data from Google Sheets
     * Uses the 'gviz' visualization API to get JSON data.
     */
    static CACHE_KEY = 'rw16_sheet_data';
    static CACHE_DURATION = 10 * 60 * 1000; // 10 Minutes in milliseconds

    /**
     * Fetch data with Smart Caching
     */
    static async getKegiatan() {
        // 1. Check Cache
        const cached = this.getFromCache();
        if (cached) {
            console.log("[GSheets] Returning cached data");
            return cached;
        }

        // 2. Fetch from Network
        if (CONFIG.useCMS && CONFIG.googleSheet.sheetID) {
            try {
                console.log("[GSheets] Cache expired/empty. Fetching from API...");
                const data = await this.fetchFromSheet();
                
                // 3. Save to Cache
                this.saveToCache(data);
                return data;
            } catch (error) {
                console.error("[GSheets] API Error, using fallback:", error);
                return await this.fetchLocalFallback();
            }
        } else {
            console.log("[GSheets] CMS disabled or ID missing. Using local data.");
            return await this.fetchLocalFallback();
        }
    }

    static getFromCache() {
        try {
            const record = JSON.parse(localStorage.getItem(this.CACHE_KEY));
            if (!record) return null;

            if (Date.now() - record.timestamp < this.CACHE_DURATION) {
                return record.data;
            }
            return null; // Expired
        } catch (e) {
            return null;
        }
    }

    static saveToCache(data) {
        try {
            const record = {
                timestamp: Date.now(),
                data: data
            };
            localStorage.setItem(this.CACHE_KEY, JSON.stringify(record));
        } catch (e) {
            console.warn("Storage full or disabled");
        }
    }

    static async fetchFromSheet() {
        const SHEET_ID = CONFIG.googleSheet.sheetID;
        // Use t=${Date.now()} to prevent browser-level caching of the fetch request itself
        const URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&t=${Date.now()}`;

        const response = await fetch(URL);
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
        
        const text = await response.text();
        const jsonText = text.substring(47).slice(0, -2); 
        const json = JSON.parse(jsonText);
        
        const rows = json.table.rows;
        
        return rows.map((row, index) => {
            const c = row.c;
            return {
                id: index + 1,
                title: c[0] ? c[0].v : "Tanpa Judul",
                category: c[1] ? c[1].v : "Umum",
                description: c[2] ? c[2].v : "",
                date: c[3] ? (c[3].f || c[3].v) : "",
                images: this.parseImages(row, 4, 5) 
            };
        });
    }

    static parseImages(row, startIndex, count) {
        const images = [];
        for (let i = 0; i < count; i++) {
            const cell = row.c[startIndex + i];
            if (cell && cell.v) {
                const url = cell.v;
                // Filter out placeholders and booleans
                if (typeof url === 'string' && url !== '[URL]' && url.trim() !== '') {
                    const converted = this.convertDriveLink(url);
                    if (converted) images.push(converted);
                }
            }
        }
        return images;
    }
    
    /**
     * Helper to convert Google Drive Sharing URL to Direct Image URL
     */
    static convertDriveLink(url) {
        if (!url) return null;
        // Check if it's a Google Drive Link
        if (url.includes('drive.google.com') && url.includes('/d/')) {
            // Extract ID
            const matches = url.match(/\/d\/(.*?)(\/|$)/);
            if (matches && matches[1]) {
                return `https://drive.google.com/uc?export=view&id=${matches[1]}`;
            }
        }
        // Return original if it's already a direct link (e.g. imgur, placeholder)
        return url;
    }
    
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
