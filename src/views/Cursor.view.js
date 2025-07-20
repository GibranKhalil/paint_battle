import ASSETS_PATH from "../constants/assetsPath.constant.js";
import COMPONENTS_ID from "../constants/componentsId.constant.js";
import RendererUIComponent from "./components/Renderer.component.js";
import TransformComponent from "./components/Transform.component.js";
import BaseUIComponent from "./Base.view.js";

export default class CursorComponent extends BaseUIComponent {
    constructor(x, y) {
        super("CursorComponent")
        this._setupComponents(x, y, `${ASSETS_PATH.Components}/cursor.png`)
    }

    _setupComponents(x, y, sprite) {
        this.addComponent(COMPONENTS_ID.Transform, new TransformComponent(x, y))
            .addComponent(COMPONENTS_ID.Renderer, new RendererUIComponent(sprite))
    }

    updatePosition(x, y) {
        const transform = this.getComponent(COMPONENTS_ID.Transform);
        if (transform) {
            transform.x = x;
            transform.y = y;
        }
    }

    render() {
        this.getComponent(COMPONENTS_ID.Renderer)
            .render(
                this.getComponent(COMPONENTS_ID.Transform)
            )
    }

    getPosition() {
        const transform = this.getComponent(COMPONENTS_ID.Transform);
        return transform ? { x: transform.x, y: transform.y } : { x: 0, y: 0 };
    }
}