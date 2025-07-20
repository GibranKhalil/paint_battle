export default class BaseController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }


    onEntityEvent(eventType, data) {
        throw new Error("onEntityEvent deve ser criado na subclasse")
    }
}