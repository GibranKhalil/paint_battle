import COMPONENTS_ID from "../constants/componentsId.constant.js";
import CursorModel from "../models/Cursor.model.js";
import CursorComponent from "../views/components/Cursor.component.js";
import BaseController from "./Base.controller.js";

export default class CursorController extends BaseController {
    constructor(initialX = 0, initialY = 0, speed = 3, positions, clickables) {
        const model = new CursorModel({ x: initialX, y: initialY }, { speed }, positions);
        const view = new CursorComponent(initialX, initialY);

        super(model, view)

        this._setupObserver(clickables);
    }

    _setupObserver(clickables) {
        const observerModel = this.model.getComponent(COMPONENTS_ID.ObserverModel)
        observerModel.addObserver(this.view)

        if (clickables || clickables.length > 0) {
            clickables.forEach(button => {
                observerModel.addObserver(button)
            });
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