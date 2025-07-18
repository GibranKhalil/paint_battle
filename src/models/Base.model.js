export default class BaseModel {
    constructor(id = null) {
        this.id = id;
        this.components = new Map();
        this.isDestroyed = false;
        this.active = true;
    }

    addComponent(componentType, component) {
        this.components.set(componentType, component);
        return this;
    }

    getComponent(componentType) {
        return this.components.get(componentType);
    }

    hasComponent(componentType) {
        return this.components.has(componentType);
    }

    removeComponent(componentType) {
        this.components.delete(componentType);
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