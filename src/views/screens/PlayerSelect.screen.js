import ASSETS_PATH from "../../constants/assetsPath.constant.js";
import CHARACTERS_CONFIG from "../../constants/characters.constant.js";
import COLORS from "../../constants/colors.constant.js";
import FONT_SIZE from "../../constants/fontSize.constant.js";
import AnimatorSystem from "../../systems/Animator.system.js";
import BaseScreen from "./Base.screen.js";

export default class PlayerSelectScreen extends BaseScreen {
    constructor() {
        super();

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
            readyLabel: new Image(`${ASSETS_PATH.Components}/ready__label.png`),
            enterToSelect: new Image(`${ASSETS_PATH.Components}/enter.png`),
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
        const startX = (Screen.getMode().width - totalWidth) / 2;

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
                pad: i < 2 ? Pads.get(i) : null,
                selectedCharacter: 0,
                isActive: false,
                isReady: false,
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

        if (!player.pad) return;

        if (this.players.filter((p) => p.isActive).length === 0) {
            if (this.players[0].pad.justPressed(Pads.CIRCLE)) {
                this.goBack();
            }
        }

        player.pad.update();

        if (!player.isActive && player.pad.justPressed(Pads.CROSS)) {
            player.isActive = true;
            return;
        }

        if (player.isActive && !player.isReady) {
            let changed = false;

            if (player.pad.justPressed(Pads.CROSS)) {
                player.isReady = true;
                return;
            }

            if (player.pad.justPressed(Pads.CIRCLE)) {
                player.isActive = false;
                return;
            }

            if (player.pad.justPressed(Pads.LEFT)) {
                player.selectedCharacter = player.selectedCharacter === 0
                    ? this.characters.length - 1
                    : player.selectedCharacter - 1;
                changed = true;
            }

            if (player.pad.justPressed(Pads.RIGHT)) {
                player.selectedCharacter = player.selectedCharacter === this.characters.length - 1
                    ? 0
                    : player.selectedCharacter + 1;
                changed = true;
            }

            if (changed && player.selectedCharacter !== player.lastSelectedCharacter) {
                const character = this.characters[player.selectedCharacter];
                this.loadCharacterAssets(character);
                player.lastSelectedCharacter = player.selectedCharacter;
            }
        }

        if (player.isActive && player.isReady) {
            if (player.pad.justPressed(Pads.CIRCLE)) {
                player.isReady = false;
                return;
            }

        }
    }

    renderEnterToSelect(x, y) {
        const width = 132;
        const height = 263;
        const sprite = this.staticAssets.enterToSelect;

        const centerX = x + 6 + (width - sprite.width) / 2;
        const centerY = y + 17 + (height - sprite.height) / 2;

        sprite.draw(centerX, centerY);
    }

    renderPlayerCharacterSprite(assets, x, y, animate = true) {
        assets.sprite.startx = 0;
        assets.sprite.endx = 16;
        assets.sprite.starty = 0;
        assets.sprite.endy = 16;
        assets.sprite.width = 16 * 2;
        assets.sprite.height = 16 * 2;

        if (animate) {
            AnimatorSystem.animationByColumns(4, 1, 6, 16, 16, true, assets.sprite, 2);
        }

        assets.sprite.draw(x, y);
    }

    renderPlayerCharacterWalk(assets, x, y) {
        AnimatorSystem.animationByRows(1, 4, 6, 64, 16, true, assets.sprite);
        assets.sprite.draw(x, y);
    }

    renderPlayer(playerIndex) {
        const { players, framePositions, characters } = this;
        const player = players[playerIndex];
        const position = framePositions[playerIndex];
        const character = characters[player.selectedCharacter] || null;
        const assets = this.getPlayerCharacterAssets(playerIndex);

        if (!player.isActive) {
            this.staticAssets.playerSelectFrame.draw(position.x, position.y);
            this.renderEnterToSelect(position.x, position.y);
            return;
        }

        this.renderCommonPlayerElements(position, character, assets);

        if (player.isReady) {
            this.renderReadyState(position, assets);
        }
        else {
            this.renderSelectionState(position, assets);
        }

        this.renderPlayerInfo(position, playerIndex, character);
    }

    renderCommonPlayerElements(position, character, assets) {
        if (character) {
            Draw.rect(position.x + 6, position.y + 17, 132, 263, character.Color);
            this.staticAssets.pattern.draw(position.x + 6, position.y + 17);
        }

        this.staticAssets.playerSelectFrame.draw(position.x, position.y);
        this.renderPlayerCharacterWalk(assets, position.x + 61, position.y + 293);

        if (assets.faceset) {
            assets.faceset.draw(position.x + 6, position.y + 282);
        }
    }

    renderReadyState(position, assets) {
        this.renderPlayerCharacterSprite(assets, position.x + 56, position.y + 132, false);
        this.staticAssets.readyLabel.draw(position.x + 6, position.y + 18);
    }

    renderSelectionState(position, assets) {
        this.staticAssets.arrow.width = -Math.abs(32);
        this.staticAssets.arrow.draw(position.x + 22, position.y + 132);

        this.staticAssets.arrow.width = Math.abs(32);
        this.staticAssets.arrow.draw(position.x + 122, position.y + 132);

        this.renderPlayerCharacterSprite(assets, position.x + 56, position.y + 132, true);
    }

    renderPlayerInfo(position, playerIndex, character) {
        const { staticAssets } = this;

        staticAssets.playersNum.startx = playerIndex * 16;
        staticAssets.playersNum.endx = (playerIndex + 1) * 16;
        staticAssets.playersNum.width = 16;
        staticAssets.playersNum.height = 16;
        staticAssets.playersNum.draw(position.x + 131, position.y + 313);

        staticAssets.font.color = COLORS.BLACK;
        staticAssets.font.scale = FONT_SIZE.XS;
        const nameX = position.x + (this.FRAME_WIDTH - staticAssets.font.getTextSize(character.Name).width) / 2;
        staticAssets.font.print(nameX, position.y + 11, character.Name);

        staticAssets.font.color = COLORS.WHITE;
        staticAssets.font.scale = FONT_SIZE.SM;
        staticAssets.font.print(position.x + 136, position.y + 317, (playerIndex + 1).toString());
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

    goBack() {
        if (this.screenManager) {
            this.screenManager.changeScreen('mainMenu', true);
        }
    }
}