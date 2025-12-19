import Router from './Router.js';

class App {
    constructor() {
        this.routes = [
            { path: '/', controller: 'HomeController' },
            { path: '/about', controller: 'AboutController' },
            { path: '/services', controller: 'LayananController' },
            { path: '/portfolio', controller: 'KegiatanController' },
            { path: '/contact', controller: 'ContactController' }
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
