import Controller from './Controller.js';
import RWModel from '../Models/RWModel.js';

export default class ContactController extends Controller {
    constructor() {
        super();
        this.model = new RWModel();
    }

    async render() {
        const identity = await this.model.getIdentity();
        await this.renderView('contact');
        this.bindData(identity);
    }

    bindData(identity) {
        document.getElementById('contact-email').textContent = identity.email;
        document.getElementById('contact-phone').textContent = identity.phone;
        document.getElementById('contact-address').textContent = identity.address;
    }
}
