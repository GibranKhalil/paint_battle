import SCREEN_ID from "../../constants/screens.constant.js";
import BaseScreen from "./Base.screen.js";

export default class StoreScreen extends BaseScreen {
    constructor() {
        super();

        this.pad = Pads.get(0)
    }

    render() {
        this.pad.update();
        this.renderBackground();

        if (this.pad.justPressed(Pads.CIRCLE)) {
            this.goBack();
        }
    }

    goBack() {
        if (this.screenManager) {
            this.screenManager.changeScreen(SCREEN_ID.MAIN_MENU, true);
        }
    }
}