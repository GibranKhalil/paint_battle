import ASSETS_PATH from "../../constants/assetsPath.constant.js";
import CHARACTERS_CONFIG from "../../constants/characters.constant.js";
import COLORS from "../../constants/colors.constant.js";
import FONT_SIZE from "../../constants/fontSize.constant.js";
import SCREEN_ID from "../../constants/screens.constant.js";
import AnimatorSystem from "../../systems/Animator.system.js";
import BaseScreen from "./Base.screen.js";

export default class StoreScreen extends BaseScreen {
    constructor() {
        super();

        this.pad = Pads.get(0);
        this.staticAssets = this._loadStaticAssets();
    }

    _loadStaticAssets() {
        return {
            headerFrame: new Image(`${ASSETS_PATH.Components}/header_frame.png`),
            pattern: new Image(`${ASSETS_PATH.Backgrounds}/pattern.png`),
            font: new Font(`${ASSETS_PATH.Fonts}/NormalFont.ttf`),
            characters: Object.values(CHARACTERS_CONFIG),
            coin: new Image(`${ASSETS_PATH.Components}/coin.png`),
            sectionFrame: new Image(`${ASSETS_PATH.Components}/STORE_SECTION.png`),
            footer: new Image(`${ASSETS_PATH.Components}/player-select-footer.png`),
            slidder: new Image(`${ASSETS_PATH.Components}/slidder.png`),
            scrollBG: new Image(`${ASSETS_PATH.Components}/SCROLL_BG.png`),
        };
    }

    render() {
        this.pad.update();
        this.renderBackground();

        this.staticAssets.headerFrame.draw(22, 10)

        this.staticAssets.font.color = COLORS.BLACK;
        this.staticAssets.font.scale = FONT_SIZE.LG
        this.staticAssets.font.print(34, 20, "STORE")
        this.staticAssets.font.color = COLORS.GRAY;
        this.staticAssets.font.scale = FONT_SIZE.SM
        this.staticAssets.font.print(34, 34, "Here  you  can  spent your  coins")

        AnimatorSystem.animationHorizontalSprite(4, 8, 10, 10, true, this.staticAssets.coin, 1.6)
        this.staticAssets.coin.draw(531, 24)
        this.staticAssets.font.color = COLORS.BLACK;
        this.staticAssets.font.scale = FONT_SIZE.NORMAL
        this.staticAssets.font.print(555, 23, "3250")


        this.staticAssets.sectionFrame.draw(14, 67)
        this.staticAssets.font.color = COLORS.WHITE;
        this.staticAssets.font.scale = FONT_SIZE.LG
        this.staticAssets.font.print(24, 73, "CHARACTERS")

        this.staticAssets.scrollBG.draw(596, 104)
        this.staticAssets.slidder.draw(593, 104)

        this.staticAssets.footer.draw(0, 418)

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