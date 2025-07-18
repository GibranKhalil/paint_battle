import COMPONENTS_ID from "../../constants/componentsId.constant.js";
import BaseUIComponent from "../components/Base.component.js";
import AnimatorComponent from "../components/ui/Animator.component.js";
import RendererUIComponent from "../components/ui/Renderer.component.js";
import TransformUIComponent from "../components/ui/Transform.component.js";

export default class BackgroundFactory {

    static createScreenBackground(x, y, width, height, sprite) {
        return new BaseUIComponent(`background-${sprite}`)
            .addComponent(COMPONENTS_ID.TransformUI, new TransformUIComponent(x, y, width, height))
            .addComponent(COMPONENTS_ID.RendererUI, new RendererUIComponent(sprite))
            .addComponent(COMPONENTS_ID.Animator, new AnimatorComponent());
    }
}