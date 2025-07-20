import COMPONENTS_ID from "../../constants/componentsId.constant.js";
import AnimatorComponent from "../components/Animator.component.js";
import RendererUIComponent from "../components/Renderer.component.js";
import TransformComponent from "../components/Transform.component.js";
import BaseUIComponent from "../Base.view.js";

export default class BackgroundFactory {

    static createScreenBackground(x, y, width, height, sprite) {
        return new BaseUIComponent(`background-${sprite}`)
            .addComponent(COMPONENTS_ID.Transform, new TransformComponent(x, y, width, height))
            .addComponent(COMPONENTS_ID.Renderer, new RendererUIComponent(sprite))
            .addComponent(COMPONENTS_ID.Animator, new AnimatorComponent());
    }
}