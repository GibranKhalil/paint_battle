import ASSETS_PATH from "../../constants/assetsPath.constant.js";
import COLORS from "../../constants/colors.constant.js";
import BaseScreen from "./Base.screen.js";

export default class PlayerSelectScreen extends BaseScreen {
    constructor() {
        super();

        this.headerFrame = new Image(`${ASSETS_PATH.Components}/header_frame.png`)
        this.font = new Font(`${ASSETS_PATH.Fonts}/NormalFont.ttf`)

        this.playerSelectFrame = new Image(`${ASSETS_PATH.Components}/player-select-frame.png`)

        this.players_num = new Image(`${ASSETS_PATH.Components}/player-num.png`)

        this.footer = new Image(`${ASSETS_PATH.Components}/player-select-footer.png`)

        this.playerOneText = "NINJA"
        this.playerTwoText = "BLUE  FIRE"
        this.playerThreeText = "PIGGY"
        this.playerFourthText = "SKELETON"
    }

    render() {
        this.renderBackground();

        this.headerFrame.draw(22, 10)

        this.playerSelectFrame.draw(14, 76)
        this.playerSelectFrame.draw(171, 76)
        this.playerSelectFrame.draw(325, 76)
        this.playerSelectFrame.draw(480, 76)

        this.players_num.startx = 0
        this.players_num.endx = 16
        this.players_num.width = 16
        this.players_num.height = 16
        this.players_num.draw(145, 389)

        this.players_num.startx = 16
        this.players_num.endx = 32
        this.players_num.width = 16
        this.players_num.height = 16
        this.players_num.draw(301, 389)

        this.players_num.startx = 32
        this.players_num.endx = 48
        this.players_num.width = 16
        this.players_num.height = 16
        this.players_num.draw(457, 389)

        this.players_num.startx = 48
        this.players_num.endx = 64
        this.players_num.width = 16
        this.players_num.height = 16
        this.players_num.draw(613, 389)

        this.footer.draw(0, 418)

        this.font.color = COLORS.MAIN_TEXT
        this.font.scale = 0.66
        this.font.print(200, 23, 'CHOOSE   YOUR   CHARACTER')

        this.font.color = COLORS.BLACK
        this.font.scale = 0.33
        this.font.print(72, 87, this.playerOneText)
        this.font.print(220, 87, this.playerTwoText)
        this.font.print(382, 87, this.playerThreeText)
        this.font.print(528, 87, this.playerFourthText)
    }
}