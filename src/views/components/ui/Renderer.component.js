export default class RendererUIComponent {
    constructor(sprite) {
        this.sprite = new Image(sprite);
        this.visible = true;
    }

    render(transform) {
        this.sprite.draw(transform.x, transform.y)
    }
}