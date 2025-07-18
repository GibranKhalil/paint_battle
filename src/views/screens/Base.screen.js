import ASSETS_PATH from "../../constants/assetsPath.constant.js";
import COMPONENTS_ID from "../../constants/componentsId.constant.js";
import BackgroundFactory from "../ui/background.js";

const BACKGROUNDS = [
    `${ASSETS_PATH.Backgrounds}/BLUE_BG.png`,
    `${ASSETS_PATH.Backgrounds}/GRAY_BG.png`,
    `${ASSETS_PATH.Backgrounds}/GREEN_BG.png`,
    `${ASSETS_PATH.Backgrounds}/ORANGE_BG.png`,
    `${ASSETS_PATH.Backgrounds}/PINK_BG.png`,
    `${ASSETS_PATH.Backgrounds}/PURPLE_BG.png`,
    `${ASSETS_PATH.Backgrounds}/BLUE_BG.png`
]

export default class BaseScreen {
    constructor() {
        this.background = BackgroundFactory.createScreenBackground(0, 0, Screen.getMode().width, Screen.getMode().height, this._randomBackground());
        this.parallaxState = {
            backgroundsY: [0, Screen.getMode().height],
            speed: 25 / 10000,
            screenHeight: Screen.getMode().height
        }
    }


    _randomBackground(min = 0, max = BACKGROUNDS.length) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return BACKGROUNDS[Math.floor(Math.random() * (max - min) + min)];
    }

    renderBackground() {
        this.background.getComponent(COMPONENTS_ID.Animator)
            .parallaxToDown(
                this.background.getComponent(COMPONENTS_ID.RendererUI).sprite,
                this.parallaxState
            );
    }
}