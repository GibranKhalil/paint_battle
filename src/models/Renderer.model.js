export default class RendererComponent {
    constructor(sprite) {
        this.image = new Image(sprite);
        this.visible = true;
    }

    render(transform) {
        this.image.draw(transform.x, transform.y)
    }
}