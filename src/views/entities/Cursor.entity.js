import ASSETS_PATH from "../../constants/assetsPath.constant.js";
import COMPONENTS_ID from "../../constants/componentsId.constant.js";
import EVENTS from "../../constants/event.constant.js";
import RendererUIComponent from "../components/Renderer.component.js";
import TransformComponent from "../components/Transform.component.js";
import BaseUIComponent from "./Base.entity.js";

export default class CursorComponent extends BaseUIComponent {
    constructor(x, y) {
        super("CursorComponent")
        this._setupComponents(x, y, `${ASSETS_PATH.Components}/cursor.png`)
    }

    _setupComponents(x, y, sprite) {
        this.addComponent(COMPONENTS_ID.Transform, new TransformComponent(x, y))
            .addComponent(COMPONENTS_ID.Renderer, new RendererUIComponent(sprite))
    }

    render() {
        this.getComponent(COMPONENTS_ID.Renderer)
            .render(
                this.getComponent(COMPONENTS_ID.Transform)
            )
    }

    onEntityEvent(eventType, data) {
        if (eventType === EVENTS.POSITION_CHANGED) {
            const transform = this.getComponent(COMPONENTS_ID.Transform);
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