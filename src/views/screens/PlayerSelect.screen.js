import ASSETS_PATH from "../../constants/assetsPath.constant.js";
import CHARACTERS_CONFIG from "../../constants/characters.constant.js";
import COLORS from "../../constants/colors.constant.js";
import FONT_SIZE from "../../constants/fontSize.constant.js";
import AnimatorSystem from "../../systems/Animator.system.js";
import BaseScreen from "./Base.screen.js";

export default class PlayerSelectScreen extends BaseScreen {
    constructor() {
        super();

        this.SCREEN_WIDTH = 640;
        this.SCREEN_HEIGHT = 448;
        this.FRAME_WIDTH = 144;
        this.FRAME_HEIGHT = 327;
        this.FRAME_SPACING = 12;
        this.MAX_PLAYERS = 4;
        this.MAX_CACHED_ASSETS = 4;

        this.staticAssets = this.loadStaticAssets();

        this.assetCache = new Map();
        this.cacheOrder = [];

        this.players = [];
        this.characters = Object.values(CHARACTERS_CONFIG);
        this.framePositions = [];

        this.initializePlayers();
        this.calculateFramePositions();

        this.preloadInitialAssets();
    }

    loadStaticAssets() {
        return {
            headerFrame: new Image(`${ASSETS_PATH.Components}/header_frame.png`),
            pattern: new Image(`${ASSETS_PATH.Backgrounds}/pattern.png`),
            playerSelectFrame: new Image(`${ASSETS_PATH.Components}/player-select-frame.png`),
            playersNum: new Image(`${ASSETS_PATH.Components}/player-num.png`),
            arrow: (() => {
                const arrow = new Image(`${ASSETS_PATH.Components}/arrow.png`);
                arrow.height = 32;
                return arrow;
            })(),
            footer: new Image(`${ASSETS_PATH.Components}/player-select-footer.png`),
            font: new Font(`${ASSETS_PATH.Fonts}/NormalFont.ttf`)
        };
    }

    preloadInitialAssets() {
        this.loadCharacterAssets(this.characters[0]);
    }

    calculateFramePositions() {
        const totalWidth = (this.FRAME_WIDTH * this.MAX_PLAYERS) + (this.FRAME_SPACING * (this.MAX_PLAYERS - 1));
        const startX = (this.SCREEN_WIDTH - totalWidth) / 2;

        this.framePositions = [];
        for (let i = 0; i < this.MAX_PLAYERS; i++) {
            this.framePositions.push({
                x: startX + (i * (this.FRAME_WIDTH + this.FRAME_SPACING)),
                y: 76
            });
        }
    }

    initializePlayers() {
        for (let i = 0; i < this.MAX_PLAYERS; i++) {
            this.players.push({
                pad: i < 2 ? Pads.get(i) : Pads.get(1),
                selectedCharacter: 0,
                isActive: i === 0,
                lastSelectedCharacter: -1
            });
        }
    }

    updateCacheOrder(cacheKey) {
        const index = this.cacheOrder.indexOf(cacheKey);
        if (index > -1) {
            this.cacheOrder.splice(index, 1);
        }
        this.cacheOrder.unshift(cacheKey);
    }

    cleanOldCacheEntries() {
        while (this.cacheOrder.length > this.MAX_CACHED_ASSETS) {
            const oldKey = this.cacheOrder.pop();
            const oldAssets = this.assetCache.get(oldKey);

            if (oldAssets) {
                if (oldAssets.faceset && oldAssets.faceset.pixels) {
                    oldAssets.faceset.pixels = null;
                }
                if (oldAssets.sprite && oldAssets.sprite.pixels) {
                    oldAssets.sprite.pixels = null;
                }
                this.assetCache.delete(oldKey);
            }
        }
    }

    loadCharacterAssets(character) {
        const cacheKey = character.Name;

        if (this.assetCache.has(cacheKey)) {
            this.updateCacheOrder(cacheKey);
            return this.assetCache.get(cacheKey);
        }

        const assets = {
            faceset: new Image(character.Faceset),
            sprite: new Image(character.SpriteSheet)
        };

        this.assetCache.set(cacheKey, assets);
        this.updateCacheOrder(cacheKey);

        this.cleanOldCacheEntries();

        return assets;
    }

    getPlayerCharacterAssets(playerIndex) {
        const player = this.players[playerIndex];
        const character = this.characters[player.selectedCharacter];
        return this.loadCharacterAssets(character);
    }

    updatePlayerInput(playerIndex) {
        const player = this.players[playerIndex];
        player.pad.update();

        if (!player.isActive && player.pad.justPressed(Pads.CROSS)) {
            player.isActive = true;
        }

        if (player.isActive) {
            let characterChanged = false;

            if (player.pad.justPressed(Pads.LEFT)) {
                player.selectedCharacter = player.selectedCharacter < 1
                    ? this.characters.length - 1
                    : player.selectedCharacter - 1;
                characterChanged = true;
            }

            if (player.pad.justPressed(Pads.RIGHT)) {
                player.selectedCharacter = player.selectedCharacter >= this.characters.length - 1
                    ? 0
                    : player.selectedCharacter + 1;
                characterChanged = true;
            }

            if (characterChanged && player.selectedCharacter !== player.lastSelectedCharacter) {
                const character = this.characters[player.selectedCharacter];
                this.loadCharacterAssets(character);
                player.lastSelectedCharacter = player.selectedCharacter;
            }
        }
    }

    renderPlayerCharacterSprite(assets, x, y) {
        assets.sprite.startx = 0;
        assets.sprite.endx = 16;
        assets.sprite.starty = 0;
        assets.sprite.endy = 16;
        assets.sprite.width = 16 * 2;
        assets.sprite.height = 16 * 2;

        AnimatorSystem.animationByColumns(4, 1, 6, 16, 16, true, assets.sprite, 2);
        assets.sprite.draw(x, y);
    }

    renderPlayerCharacterWalk(assets, x, y) {
        AnimatorSystem.animationByRows(1, 4, 6, 64, 16, true, assets.sprite);
        assets.sprite.draw(x, y);
    }

    renderPlayer(playerIndex) {
        if (!this.players[playerIndex].isActive) return;

        const player = this.players[playerIndex];
        const position = this.framePositions[playerIndex];
        const character = this.characters[player.selectedCharacter];
        const assets = this.getPlayerCharacterAssets(playerIndex);

        Draw.rect(position.x + 6, position.y + 17, 132, 305, character.Color);
        this.staticAssets.pattern.draw(position.x + 6, position.y + 17);

        this.staticAssets.playerSelectFrame.draw(position.x, position.y);

        this.staticAssets.arrow.width = -Math.abs(32);
        this.staticAssets.arrow.draw(position.x + 22, position.y + 132);

        this.staticAssets.arrow.width = Math.abs(32);
        this.staticAssets.arrow.draw(position.x + 122, position.y + 132);

        this.renderPlayerCharacterSprite(assets, position.x + 56, position.y + 132);

        this.renderPlayerCharacterWalk(assets, position.x + 61, position.y + 293);

        if (assets.faceset) {
            assets.faceset.draw(position.x + 6, position.y + 282);
        }

        this.staticAssets.playersNum.startx = playerIndex * 16;
        this.staticAssets.playersNum.endx = (playerIndex + 1) * 16;
        this.staticAssets.playersNum.width = 16;
        this.staticAssets.playersNum.height = 16;
        this.staticAssets.playersNum.draw(position.x + 131, position.y + 313);

        this.staticAssets.font.color = COLORS.BLACK;
        this.staticAssets.font.scale = FONT_SIZE.XS;
        this.staticAssets.font.print(position.x + 58, position.y + 11, character.Name);

        this.staticAssets.font.color = COLORS.WHITE;
        this.staticAssets.font.scale = FONT_SIZE.SM;
        this.staticAssets.font.print(position.x + 136, position.y + 317, (playerIndex + 1).toString());
    }

    render() {
        this.renderBackground();

        this.staticAssets.headerFrame.draw(22, 10);
        this.staticAssets.font.color = COLORS.MAIN_TEXT;
        this.staticAssets.font.scale = FONT_SIZE.NORMAL;
        this.staticAssets.font.print(200, 23, 'CHOOSE   YOUR   CHARACTER');

        for (let i = 0; i < this.MAX_PLAYERS; i++) {
            this.updatePlayerInput(i);
        }

        for (let i = 0; i < this.MAX_PLAYERS; i++) {
            this.renderPlayer(i);
        }

        this.staticAssets.footer.draw(0, 418);
    }

    cleanup() {
        for (const [key, assets] of this.assetCache) {
            if (assets.faceset && assets.faceset.pixels) {
                assets.faceset.pixels = null;
            }
            if (assets.sprite && assets.sprite.pixels) {
                assets.sprite.pixels = null;
            }
        }
        this.assetCache.clear();
        this.cacheOrder = [];

        Object.values(this.staticAssets).forEach(asset => {
            if (asset && asset.pixels) {
                asset.pixels = null;
            }
        });
    }
}