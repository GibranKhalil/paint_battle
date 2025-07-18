export default class BaseUIComponent {
    constructor(id = null) {
        this.id = id
        this.components = new Map();
    }

    addComponent(type, component) {
        this.components.set(type, component);
        return this;
    }

    getComponent(type) {
        return this.components.get(type);
    }

    hasComponent(type) {
        return this.components.has(type);
    }

    removeComponent(type) {
        this.components.delete(type);
    }
}
