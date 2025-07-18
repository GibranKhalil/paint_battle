export default class ObserverModel {
    constructor() {
        this.observers = new Set()
    }

    addObserver(observer) {
        this.observers.add(observer)
    }

    removeObserver(observer) {
        this.observers.delete(observer)
    }

    notifyObservers(eventType, data = {}) {
        if (this.destroyed) return;

        const eventData = {
            timestamp: Date.now(),
            entityId: this.id,
            ...data
        };

        this.observers.forEach(observer => {
            if (observer.onEntityEvent) {
                observer.onEntityEvent(eventType, eventData);
            }
        });
    }
}