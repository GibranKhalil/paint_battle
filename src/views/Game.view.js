export default class GameView {
    constructor(canvas) {
        this.canvas = canvas;
        this.renderSystem = new RenderSystem();
    }

    render(entities) {
        this.renderSystem.render(entities, this.ctx);
    }
}
