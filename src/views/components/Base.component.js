export default class BaseUIComponent {
    constructor(id = null) {
        this.id = id
        this.components = new Map();
        this.isDestroyed = false;
        this.active = true;
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

    destroy() {
        if (this.isDestroyed) return;

        this.components.forEach((component) => {
            if (component && typeof component.destroy === 'function') {
                component.destroy();
            }
            if (component && typeof component === 'object') {
                component.owner = null;
            }
        });

        this.components.clear();
        this.isDestroyed = true;
        this.active = false;
    }
}
