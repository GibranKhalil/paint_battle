import ASSETS_PATH from "../../constants/assetsPath.constant.js";
import CHARACTERS_CONFIG from "../../constants/characters.constant.js";
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

        this.arrow = new Image(`${ASSETS_PATH.Components}/arrow.png`)
        this.arrow.height = 32;

        this.selectedCharacter = 0;
        this.selectedCharacter2 = 0;
        this.characters = Object.values(CHARACTERS_CONFIG)

        this.pad = Pads.get(0);
        this.pad2 = Pads.get(1);
    }

    render() {
        this.renderBackground();
        this.pad.update();
        this.pad2.update();

        this.headerFrame.draw(22, 10)

        this.faceset = new Image(this.characters[this.selectedCharacter].Faceset)
        this.playerOneCharacter = new Image(this.characters[this.selectedCharacter].SpriteSheet)
        Draw.rect(20, 93, 132, 305, this.characters[this.selectedCharacter].Color);
        this.pattern.draw(20, 93)

        this.faceset2 = new Image(this.characters[this.selectedCharacter2].Faceset)
        this.player2Character = new Image(this.characters[this.selectedCharacter2].SpriteSheet)
        Draw.rect(160, 93, 132, 305, this.characters[this.selectedCharacter2].Color);
        this.pattern.draw(160, 93)

        this.playerSelectFrame.draw(14, 76)

        this.arrow.width = -Math.abs(32);
        this.arrow.draw(36, 208)

        this.arrow.width = Math.abs(32);
        this.arrow.draw(136, 208)

        if (this.pad.justPressed(Pads.LEFT)) {
            if (this.selectedCharacter < 1) {
                this.selectedCharacter = this.characters.length - 1
            }
            else {
                this.selectedCharacter--;
            }
        }

        if (this.pad.justPressed(Pads.RIGHT)) {
            if (this.selectedCharacter >= this.characters.length - 1) {
                this.selectedCharacter = 0
            }
            else {
                this.selectedCharacter++;
            }
        }

        if (this.pad2.justPressed(Pads.LEFT)) {
            if (this.selectedCharacter2 < 1) {
                this.selectedCharacter2 = this.characters.length - 1
            }
            else {
                this.selectedCharacter2--;
            }
        }

        if (this.pad2.justPressed(Pads.RIGHT)) {
            if (this.selectedCharacter2 >= this.characters.length - 1) {
                this.selectedCharacter2 = 0
            }
            else {
                this.selectedCharacter2++;
            }
        }


        this.playerOneCharacter.startx = 0;
        this.playerOneCharacter.endx = 16;
        this.playerOneCharacter.starty = 0;
        this.playerOneCharacter.endy = 16;
        this.playerOneCharacter.width = 16 * 2;
        this.playerOneCharacter.height = 16 * 2;
        this.playerOneCharacter.draw(70, 208)

        this.player2Character.startx = 0;
        this.player2Character.endx = 16;
        this.player2Character.starty = 0;
        this.player2Character.endy = 16;
        this.player2Character.width = 16 * 2;
        this.player2Character.height = 16 * 2;
        this.player2Character.draw(160, 208)


        AnimatorSystem.animationByRows(1, 4, 4, 64, 16, true, this.playerOneCharacter)
        this.playerOneCharacter.draw(75, 369)

        AnimatorSystem.animationByRows(1, 4, 4, 64, 16, true, this.player2Character)
        this.player2Character.draw(165, 369)

        this.faceset.draw(20, 358)
        this.faceset2.draw(160, 358)

        this.players_num.startx = 0
        this.players_num.endx = 16
        this.players_num.width = 16
        this.players_num.height = 16
        this.players_num.draw(145, 389)

        this.footer.draw(0, 418)

        this.font.color = COLORS.MAIN_TEXT
        this.font.scale = FONT_SIZE.NORMAL
        this.font.print(200, 23, this.headerText)

        this.font.color = COLORS.BLACK
        this.font.scale = FONT_SIZE.XS
        this.font.print(72, 87, this.characters[this.selectedCharacter].Name)

        this.font.color = COLORS.WHITE
        this.font.scale = FONT_SIZE.SM
        this.font.print(150, 393, "1")
    }
}