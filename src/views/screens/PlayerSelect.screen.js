import ASSETS_PATH from "../../constants/assetsPath.constant.js";
import COLORS from "../../constants/colors.constant.js";
import FONT_SIZE from "../../constants/fontSize.constant.js";
import AnimatorSystem from "../../systems/Animator.system.js";
import BaseScreen from "./Base.screen.js";

export default class PlayerSelectScreen extends BaseScreen {
    constructor() {
        super();

        this.headerFrame = new Image(`${ASSETS_PATH.Components}/header_frame.png`)
        this.headerText = 'CHOOSE   YOUR   CHARACTER'

        this.font = new Font(`${ASSETS_PATH.Fonts}/NormalFont.ttf`)

        this.playerSelectFrame = new Image(`${ASSETS_PATH.Components}/player-select-frame.png`)

        this.players_num = new Image(`${ASSETS_PATH.Components}/player-num.png`)

        this.footer = new Image(`${ASSETS_PATH.Components}/player-select-footer.png`)
        this.pattern = new Image(`${ASSETS_PATH.Backgrounds}/pattern.png`)

        this.playerOneText = "NINJA"
        this.playerTwoText = "BLUE  FIRE"
        this.playerThreeText = "PIGGY"
        this.playerFourthText = "SKELETON"

        this.faceset = new Image(`${ASSETS_PATH.Characters}/NinjaGreen/Faceset.png`)
        this.playerTwoFaceset = new Image(`${ASSETS_PATH.Characters}/Spirit/Faceset.png`)
        this.playerThreeFaceset = new Image(`${ASSETS_PATH.Characters}/Pig/Faceset.png`)
        this.playerFourthFaceset = new Image(`${ASSETS_PATH.Characters}/Skeleton/Faceset.png`)

        this.playerOneCharacter = new Image(`${ASSETS_PATH.Characters}/NinjaGreen/SeparateAnim/Walk.png`)
        this.playerTwoCharacter = new Image(`${ASSETS_PATH.Characters}/Spirit/SeparateAnim/Walk.png`)
        this.playerThreeCharacter = new Image(`${ASSETS_PATH.Characters}/Pig/SeparateAnim/Walk.png`)
        this.playerFourthCharacter = new Image(`${ASSETS_PATH.Characters}/Skeleton/SeparateAnim/Walk.png`)
    }

    render() {
        this.renderBackground();

        this.headerFrame.draw(22, 10)

        Draw.rect(20, 93, 132, 305, COLORS.WHITE);
        this.pattern.draw(20, 93)

        Draw.rect(177, 93, 132, 305, COLORS.WHITE);
        this.pattern.draw(177, 93)

        Draw.rect(331, 93, 132, 305, COLORS.WHITE);
        this.pattern.draw(331, 93)

        Draw.rect(486, 93, 132, 305, COLORS.WHITE);
        this.pattern.draw(486, 93)

        this.playerSelectFrame.draw(14, 76)
        this.playerSelectFrame.draw(171, 76)
        this.playerSelectFrame.draw(325, 76)
        this.playerSelectFrame.draw(480, 76)

        AnimatorSystem.animationByColumns(4, 4, 4, 16, 16, true, this.playerOneCharacter, 2)
        this.playerOneCharacter.draw(70, 208)

        AnimatorSystem.animationByColumns(4, 4, 4, 16, 16, true, this.playerTwoCharacter, 2)
        this.playerTwoCharacter.draw(226, 208)

        AnimatorSystem.animationByColumns(4, 4, 4, 16, 16, true, this.playerThreeCharacter, 2)
        this.playerThreeCharacter.draw(382, 208)

        AnimatorSystem.animationByColumns(4, 4, 4, 16, 16, true, this.playerFourthCharacter, 2)
        this.playerFourthCharacter.draw(538, 208)

        this.faceset.draw(20, 358)
        this.playerTwoFaceset.draw(177, 358)
        this.playerThreeFaceset.draw(331, 358)
        this.playerFourthFaceset.draw(486, 358)

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
        this.font.scale = FONT_SIZE.NORMAL
        this.font.print(200, 23, this.headerText)

        this.font.color = COLORS.BLACK
        this.font.scale = FONT_SIZE.XS
        this.font.print(72, 87, this.playerOneText)
        this.font.print(220, 87, this.playerTwoText)
        this.font.print(382, 87, this.playerThreeText)
        this.font.print(528, 87, this.playerFourthText)

        this.font.color = COLORS.WHITE
        this.font.scale = FONT_SIZE.SM
        this.font.print(150, 393, "1")
        this.font.print(307, 393, "2")
        this.font.print(462, 393, "3")
        this.font.print(617, 393, "4")
    }
}