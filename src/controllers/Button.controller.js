
import COMPONENTS_ID from "../constants/componentsId.constant.js";
import EVENTS from "../constants/event.constant.js";
import ButtonModel from "../models/Button.model.js";
import ButtonComponent from "../views/Button.view.js";
import BaseController from "./Base.controller.js";

export default class ButtonController extends BaseController {
    constructor(x, y, width, height, text, onClick) {
        super(new ButtonModel(), new ButtonComponent(`main-menu-button-${text.toLowerCase().replace(' ', '-')}`, x, y, width, height, text, onClick))

        this.model.getComponent(COMPONENTS_ID.Observer).addObserver(this)
    }


    onEntityEvent(eventType, data) {
        if (eventType === EVENTS.ON_CLICK && this.view.isHover(data)) {
            this.view.getComponent(COMPONENTS_ID.Clickable).onClick();
        }
    }
}