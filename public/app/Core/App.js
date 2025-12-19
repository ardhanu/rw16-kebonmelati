import Router from './Router.js';

class App {
    constructor() {
        this.routes = [
            { path: '/', controller: 'HomeController', title: 'Beranda' },
            { path: '/about', controller: 'AboutController', title: 'Profil Wilayah' },
            { path: '/services', controller: 'LayananController', title: 'Layanan Warga' },
            { path: '/kegiatan', controller: 'KegiatanController', title: 'Galeri Kegiatan' },
            { path: '/contact', controller: 'ContactController', title: 'Hubungi Kami' }
        ];

        this.router = new Router(this.routes);
    }

    init() {
        console.log('App Initialized');
        this.router.handleRoute();
    }

    getController() {
        return this.router.currentController;
    }

    toggleMenu() {
        const menu = document.getElementById('mobile-menu');
        if (menu) {
            menu.classList.toggle('hidden');
        }
    }
}

const app = new App();
window.app = app; // Expose to window for inline onclick handlers
app.init();
