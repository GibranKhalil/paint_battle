import ASSETS_PATH from "../../constants/assetsPath.constant.js";
import COMPONENTS_ID from "../../constants/componentsId.constant.js";
import EVENTS from "../../constants/event.constant.js";
import BaseUIComponent from "./Base.entity.js";
import ClickableComponent from "../components/Clickable.component.js";
import RendererUIComponent from "../components/Renderer.component.js";
import TransformComponent from "../components/Transform.component.js";

export default class ButtonComponent extends BaseUIComponent {
    constructor(id, x, y, width, height, text, onClick) {
        super(id)

        this._setupComponents(x, y, width, height, text, onClick);
    }

    _setupComponents(x, y, width, height, text, onClick) {
        this.addComponent(COMPONENTS_ID.Transform, new TransformComponent(x, y, width, height))
        this.addComponent(COMPONENTS_ID.Renderer, new RendererUIComponent(`${ASSETS_PATH.Components}/main-menu-button-${text}.png`))
        this.addComponent(COMPONENTS_ID.Clickable, new ClickableComponent(onClick))
    }

    onEntityEvent(eventType, data) {
        if (eventType === EVENTS.ON_CLICK && this.isHover(data)) {
            this.getComponent(COMPONENTS_ID.Clickable).onClick();
        }
    }

    isHover(data) {
        const transform = this.getComponent(COMPONENTS_ID.Transform)

        return data.x >= transform.x &&
            data.x <= (transform.x + transform.width) &&
            data.y >= transform.y &&
            data.y <= (transform.y + transform.height)
    }
}