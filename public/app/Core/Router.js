/**
 * Core Router Class
 * Handles URL navigation and mapping to Controllers.
 */
export default class Router {
    constructor(routes) {
        this.routes = routes;
        this.currentController = null;
        
        // Handle navigation events
        window.addEventListener('popstate', () => this.handleRoute());
        
        // Intercept link clicks for SPA feel
        document.body.addEventListener('click', e => {
            const link = e.target.closest('[data-link]');
            if (link) {
                e.preventDefault();
                this.navigateTo(link.href);
            }
        });
    }

    navigateTo(url) {
        window.history.pushState(null, null, url);
        this.handleRoute();
    }

    async handleRoute() {
        const path = window.location.pathname;
        const route = this.matchRoute(path);
        
        if (!route) {
            console.error('No route found for', path);
            document.getElementById('app').innerHTML = '<h1>404 - Page Not Found</h1>';
            return;
        }

        // Clean up previous controller if necessary
        if (this.currentController && typeof this.currentController.onDestroy === 'function') {
            this.currentController.onDestroy();
        }

        try {
            // Dynamic import of controller
            const module = await import(`../Controllers/${route.controller}.js`);
            const ControllerClass = module.default;
            
            this.currentController = new ControllerClass();
            await this.currentController.render();
        } catch (error) {
            console.error('Error loading controller:', error);
            document.getElementById('app').innerHTML = '<h1>Error loading page</h1>';
        }
    }

    matchRoute(path) {
        // Simple matching for now, can be expanded to Regex
        // Handling base path if served from subdirectory might be needed later
        // For now, assume root or exact match
        return this.routes.find(r => r.path === path) || this.routes.find(r => r.path === '/'); // Fallback to home
    }
}
