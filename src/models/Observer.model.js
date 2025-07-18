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
        const eventData = {
            timestamp: Date.now(),
            ...data
        };

        this.observers.forEach(observer => {
            if (observer.onEntityEvent) {
                observer.onEntityEvent(eventType, eventData);
            }
        });
    }
}