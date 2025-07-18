export default class BaseEntityView {
    constructor() { }

    onEntityEvent(eventType, data) {
        throw new Error('É preciso definir esse método na subclasse')
    }
}