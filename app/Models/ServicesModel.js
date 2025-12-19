/**
 * Services Model
 * Stores list of services and packages.
 */
export default class ServicesModel {
    constructor() {
        this.services = [
            {
                id: 1,
                title: "Web App Development",
                description: "Full-stack web applications using modern frameworks or vanilla MVC architectures tailored to your business excellence.",
                icon: "code"
            },
            {
                id: 2,
                title: "UI/UX Design",
                description: "User-centric design that balances aesthetics with functionality to drive high conversion rates.",
                icon: "brush"
            },
            {
                id: 3,
                title: "DevOps & Cloud",
                description: "Secure, scalable, and automated deployment pipelines ensuring your app is always up and running.",
                icon: "server"
            },
            {
                id: 4,
                title: "IT Consultancy",
                description: "Strategic technical advice to help you transform your digital presence and optimize operations.",
                icon: "chat"
            }
        ];
    }

    async getAllServices() {
        // Simulate async
        return new Promise(resolve => resolve(this.services));
    }
    
    async getTopServices(limit = 3) {
        return this.services.slice(0, limit);
    }
}
