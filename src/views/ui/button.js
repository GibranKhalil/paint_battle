import ButtonController from "../../controllers/Button.controller.js";

export default class ButtonFactory {

    static createMainMenuButton(x, y, width, height, text, onClick) {
        return new ButtonController(x, y, width, height, text, onClick)
    }
}