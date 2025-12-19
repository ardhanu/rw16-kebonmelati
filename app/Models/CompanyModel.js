/**
 * Company Model
 * Stores core company profile data.
 */
export default class CompanyModel {
    constructor() {
        this.data = {
            identity: {
                name: "Antigravity",
                tagline: "Engineering the Future of Web",
                description: "We differ from the rest by delivering scalable, high-performance web solutions using cutting-edge architecture and clean code practices.",
                email: "hello@antigravity.com",
                phone: "+62 812 3456 7890",
                address: "Jakarta, Indonesia",
                logo: "assets/images/logo.png" 
            },
            about: {
                vision: "To be the leading architect of digital transformation in Southeast Asia.",
                mission: "Helping businesses scale by providing robust, future-proof, and aesthetic digital solutions.",
                history: "Founded in 2024 by senior engineers who saw a gap in the market for quality-first web development.",
                values: [
                    { title: "Excellence", desc: "We do not settle for mediocrity." },
                    { title: "Transparency", desc: "Clear communication at every step." },
                    { title: "Innovation", desc: "Always exploring new efficient technologies." }
                ]
            },
            highlights: [
                { title: "MVC Architecture", desc: "Structured codebases that scale." },
                { title: "Performance First", desc: "Optimized for speed and SEO." },
                { title: "Future Proof", desc: "Ready for CMS and API integrations." }
            ]
        };
    }

    async getIdentity() {
        return this.data.identity;
    }

    async getAbout() {
        return this.data.about;
    }

    async getHighlights() {
        return this.data.highlights;
    }
}
