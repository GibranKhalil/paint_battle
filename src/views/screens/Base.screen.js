import ASSETS_PATH from "../../constants/assetsPath.constant.js";
import AnimatorSystem from "../../systems/Animator.system.js";

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
        this.background = new Image(this._randomBackground());
        this.parallaxState = {
            backgroundsY: [0, Screen.getMode().height],
            screenHeight: Screen.getMode().height
        }

        this.screenManager = null;
    }


    _randomBackground(min = 0, max = BACKGROUNDS.length) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return BACKGROUNDS[Math.floor(Math.random() * (max - min) + min)];
    }

    renderBackground() {
        AnimatorSystem.parallaxToDown(this.background, this.parallaxState, 24)
    }

    setScreenManager(manager) {
        this.screenManager = manager;
    }

    onEnter() {

    }

    onExit() { }
}