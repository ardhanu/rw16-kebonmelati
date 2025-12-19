/**
 * Base Controller
 * All controllers should extend this class.
 */
export default class Controller {
    constructor() {
        this.appElement = document.getElementById('app');
    }

    /**
     * Render a view into the app element
     * @param {string} viewPath - Path to the view file relative to Views folder
     * @param {object} data - Data to pass to the view (not implemented in simple fetch yet)
     */
    async renderView(viewName, data = {}) {
        try {
            // Start Fade Out
            this.appElement.classList.replace('opacity-100', 'opacity-0');
            
            // Wait for fade out to complete (300ms matches CSS duration)
            await new Promise(resolve => setTimeout(resolve, 300));

            const response = await fetch(`./app/Views/${viewName}.html?t=${new Date().getTime()}`);
            if (!response.ok) throw new Error('View not found');
            
            const html = await response.text();
            
            // Update Content (while invisible)
            this.appElement.innerHTML = html;
            
            // Re-run scripts in the view if any (security risk in prod, but ok for simple profile)
            // Or better, handle logic in the controller only
            
            this.afterRender();

            // Start Fade In (microtask delay to ensure DOM update matches)
            requestAnimationFrame(() => {
                this.appElement.classList.replace('opacity-0', 'opacity-100');
            });
        } catch (error) {
            console.error(error);
            this.appElement.innerHTML = '<p class="text-red-500">Error loading view.</p>';
        }
    }

    /**
     * Called after view is detected and injected.
     * Use this to attach event listeners.
     */
    afterRender() {}

    /**
     * Cleanup before leaving the page.
     */
    onDestroy() {}
}
