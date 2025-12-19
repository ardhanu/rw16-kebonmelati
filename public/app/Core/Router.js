/**
 * Core Router Class
 * Handles URL navigation and mapping to Controllers.
 */
export default class Router {
    constructor(routes) {
        this.routes = routes;
        this.currentController = null;
        
        // Handle navigation events
        window.addEventListener('hashchange', () => this.handleRoute());
        
        // Intercept link clicks for SPA feel
        document.body.addEventListener('click', e => {
            const link = e.target.closest('[data-link]');
            if (link) {
                e.preventDefault();
                this.navigateTo(link.getAttribute('href'));
            }
        });
    }

    navigateTo(url) {
        window.location.hash = url;
    }

    async handleRoute() {
        // Get path from hash (remove #) or default to /
        const fullPath = window.location.hash.slice(1) || '/';
        
        // Split path and query params because we need to match only the path part
        const [path, queryString] = fullPath.split('?');
        
        const route = this.matchRoute(path);
        
        if (!route) {
            console.error('No route found for', path);
            document.title = '404 Not Found';
            document.getElementById('app').innerHTML = `
                <div class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                    <span class="material-symbols-outlined text-9xl text-gray-300 mb-4">sentiment_dissatisfied</span>
                    <h1 class="text-4xl font-extrabold text-primary mb-2">Halaman Tidak Ditemukan</h1>
                    <p class="text-gray-500 mb-8 max-w-md">Maaf, halaman yang Anda cari mungkin telah dipindahkan atau tidak tersedia.</p>
                    <a href="/" data-link class="px-8 py-3 bg-accent hover:bg-accent-hover text-white font-bold rounded-full shadow-lg transition-transform hover:-translate-y-1">
                        Kembali ke Beranda
                    </a>
                </div>
            `;
            return;
        }

        // Update Document Title
        const appTitle = 'RW 16 Kebon Melati';
        document.title = route.title ? `${route.title} | ${appTitle}` : appTitle;

        // Clean up previous controller if necessary
        if (this.currentController && typeof this.currentController.onDestroy === 'function') {
            this.currentController.onDestroy();
        }

        try {
            // Dynamic import of controller
            const module = await import(`../Controllers/${route.controller}.js`);
            const ControllerClass = module.default;
            
            this.currentController = new ControllerClass();
            // Pass query params if needed, though controllers checks window.location
            await this.currentController.render();
        } catch (error) {
            console.error('Error loading controller:', error);
            document.getElementById('app').innerHTML = '<h1>Error loading page</h1>';
        }
    }

    matchRoute(path) {
        // Match exact path ignoring query params
        return this.routes.find(r => r.path === path) || this.routes.find(r => r.path === '/');
    }
}
