export default class TransformComponent {
    constructor(x = 0, y = 0, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
}