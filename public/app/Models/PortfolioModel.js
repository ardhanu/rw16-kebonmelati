/**
 * Portfolio Model
 * Stores project case studies.
 */
export default class PortfolioModel {
    constructor() {
        this.projects = [
            {
                id: 1,
                title: "Fintech Dashboard",
                category: "Web App",
                description: "A comprehensive financial dashboard for a leading local bank.",
                image: "project1.jpg"
            },
            {
                id: 2,
                title: "E-Commerce Rebrand",
                category: "UI/UX & Frontend",
                description: "Redesigning the shopping experience for a fashion retailer, increasing conversion by 40%.",
                image: "project2.jpg"
            },
            {
                id: 3,
                title: "Logistics Tracker",
                category: "Mobile & Backend",
                description: "Real-time tracking system for a logistics fleet using IoT integration.",
                image: "project3.jpg"
            }
        ];
    }

    async getAllProjects() {
        return this.projects;
    }
}
