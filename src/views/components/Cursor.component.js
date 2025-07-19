import ASSETS_PATH from "../../constants/assetsPath.constant.js";
import COMPONENTS_ID from "../../constants/componentsId.constant.js";
import EVENTS from "../../constants/event.constant.js";
import TransformModel from "../../models/Transform.model.js";
import BaseUIComponent from "./Base.component.js";
import RendererUIComponent from "./ui/Renderer.component.js";

export default class CursorComponent extends BaseUIComponent {
    constructor(x, y) {
        super("CursorComponent")
        this._setupComponents(x, y, `${ASSETS_PATH.Components}/cursor.png`)
    }

    _setupComponents(x, y, sprite) {
        this.addComponent(COMPONENTS_ID.TransformModel, new TransformModel(x, y))
            .addComponent(COMPONENTS_ID.RendererUI, new RendererUIComponent(sprite))
    }

    render() {
        this.getComponent(COMPONENTS_ID.RendererUI)
            .render(
                this.getComponent(COMPONENTS_ID.TransformModel)
            )
    }

    onEntityEvent(eventType, data) {
        if (eventType === EVENTS.POSITION_CHANGED) {
            const transform = this.getComponent(COMPONENTS_ID.TransformModel);
            if (transform) {
                transform.x = data.x;
                transform.y = data.y;
            }
        }
    }

    destroy() {
        if (this.components) {
            this.components.clear();
        }
    }

}