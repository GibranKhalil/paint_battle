import COMPONENTS_ID from "../constants/componentsId.constant.js";
import EVENTS from "../constants/event.constant.js";
import CursorModel from "../models/Cursor.model.js";
import CursorComponent from "../views/components/Cursor.component.js";
import BaseController from "./Base.controller.js";

export default class CursorController extends BaseController {
    constructor(initialX = 0, initialY = 0, speed = 3, observers) {
        const model = new CursorModel({ x: initialX, y: initialY }, { speed });
        const view = new CursorComponent(initialX, initialY);

        super(model, view)

        this._setupObserver(observers);
    }

    _setupObserver() {
        this.model.getComponent(COMPONENTS_ID.ObserverModel)
            .addObserver(this.view);

        if (!this.view.onEntityEvent) {
            this.view.onEntityEvent = (eventType, data) => {
                if (eventType === EVENTS.POSITION_CHANGED) {
                    const transformUI = this.view.getComponent(COMPONENTS_ID.TransformModel);
                    if (transformUI) {
                        transformUI.x = data.x;
                        transformUI.y = data.y;
                    }
                }
            };
        }

    }

    update() {
        this.model.update();

        const modelTransform = this.model.getComponent(COMPONENTS_ID.TransformModel);
        const viewTransform = this.view.getComponent(COMPONENTS_ID.TransformModel);

        if (modelTransform && viewTransform) {
            viewTransform.x = modelTransform.x;
            viewTransform.y = modelTransform.y;
        }
    }

    render() {
        this.view.render();
    }

    click() {
        this.model.click();
    }

    destroy() {
        if (this.model) {
            this.model.destroy();
        }
        if (this.view) {
            this.view.destroy();
        }
    }
}