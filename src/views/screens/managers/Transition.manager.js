import ASSETS_PATH from "../../../constants/assetsPath.constant.js";

export default class TransitionManager {
    constructor() {
        this.transitionImage = new Image(`${ASSETS_PATH.Backgrounds}/Transition.png`);

        this.isTransitioning = false;
        this.transitionProgress = 0;
        this.transitionSpeed = Math.fround(0.05);
        this.columnWidth = 8;

        this.screenWidth = Screen.getMode().width;
        this.screenHeight = Screen.getMode().height;
        this.totalColumns = Math.ceil(this.screenWidth / this.columnWidth);

        this.onTransitionComplete = null;
        this.targetScreen = null;
        this.currentScreen = null;
    }

    startTransition(fromScreen, toScreen, callback = null) {
        if (this.isTransitioning) return false;

        this.currentScreen = fromScreen;
        this.targetScreen = toScreen;
        this.onTransitionComplete = callback;
        this.isTransitioning = true;
        this.transitionProgress = 0;

        return true;
    }

    update() {
        if (!this.isTransitioning) return;

        this.transitionProgress = Math.min(1, this.transitionProgress + this.transitionSpeed);

        if (this.transitionProgress === 1) {
            this._completeTransition();
        }
    }

    render() {
        if (!this.isTransitioning) return;

        if (this.currentScreen) {
            this.currentScreen.render();
        }

        const visibleColumns = Math.floor(this.totalColumns * this.transitionProgress);

        for (let col = 0; col < visibleColumns; col++) {
            const x = col * this.columnWidth;
            const width = Math.min(this.columnWidth, this.screenWidth - x);

            const sourceX = (x / this.screenWidth) * this.transitionImage.width;
            const sourceWidth = (width / this.screenWidth) * this.transitionImage.width;

            this.transitionImage.startx = sourceX;
            this.transitionImage.endx = sourceX + sourceWidth;

            this.transitionImage.draw(x, 0);
        }
    }

    _completeTransition() {
        this.isTransitioning = false;
        if (this.onTransitionComplete) this.onTransitionComplete();

        this.currentScreen = this.targetScreen = null;
        this.onTransitionComplete = null;
    }


    isInTransition() {
        return this.isTransitioning;
    }

    cancelTransition() {
        this.isTransitioning = false;
        this.transitionProgress = 0;
        this.currentScreen = null;
        this.targetScreen = null;
        this.onTransitionComplete = null;
    }

    setTransitionSpeed(speed) {
        this.transitionSpeed = Math.max(Math.fround(0.01), Math.min(1, speed));
    }

    setColumnWidth(width) {
        this.columnWidth = Math.max(1, width);
        this.totalColumns = Math.ceil(this.screenWidth / this.columnWidth);
    }
}