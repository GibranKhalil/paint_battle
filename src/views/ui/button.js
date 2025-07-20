import ButtonComponent from "../entities/Button.entity.js";

export default class ButtonFactory {

    static createMainMenuButton(x, y, width, height, text, onClick) {
        return new ButtonComponent(`main-menu-button-${text.toLowerCase().replace(' ', '-')}`, x, y, width, height, text, onClick)
    }
}