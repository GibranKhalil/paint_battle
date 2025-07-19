import ASSETS_PATH from "../../constants/assetsPath.constant.js";
import COMPONENTS_ID from "../../constants/componentsId.constant.js";
import TransformModel from "../../models/Transform.model.js";
import BaseUIComponent from "../components/Base.component.js";
import ClickableComponent from "../components/ui/Clickable.component.js";
import RendererUIComponent from "../components/ui/Renderer.component.js";

export default class ButtonFactory {

    static createMainMenuButton(x, y, width, height, text, onClick) {
        return new BaseUIComponent(`main-menu-button-${text.toLowerCase().replace(' ', '-')}`)
            .addComponent(COMPONENTS_ID.TransformModel, new TransformModel(x, y, width, height))
            .addComponent(COMPONENTS_ID.RendererUI, new RendererUIComponent(`${ASSETS_PATH.Components}/main-menu-button-${text}.png`))
            .addComponent(COMPONENTS_ID.Clickable, new ClickableComponent(onClick))
    }
}