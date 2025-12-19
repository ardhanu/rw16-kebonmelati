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
    afterRender() {
        this.setupScrollAnimations();
    }

    /**
     * Setup Intersection Observer for scroll animations
     */
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger animation
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% visible
            rootMargin: '0px 0px -50px 0px' // Offset slightly so it triggers before bottom
        });

        // Find elements and set initial state
        const elements = this.appElement.querySelectorAll('.scroll-reveal');
        elements.forEach((el, index) => {
            // Initial State (Hidden)
            el.classList.add('transform', 'opacity-0', 'translate-y-10', 'transition-all', 'duration-700', 'ease-out');
            
            // Stagger delay if defined (optional)
            if (el.dataset.delay) {
                el.style.transitionDelay = `${el.dataset.delay}ms`;
            }

            observer.observe(el);
        });
    }

    /**
     * Cleanup before leaving the page.
     */
    onDestroy() {}
}
