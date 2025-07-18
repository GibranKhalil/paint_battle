export default class MovementModel {
    constructor(speed = 1) {
        this.speed = speed;
        this.velocity = { x: 0, y: 0 };
    }

    move(transform, deltaTime) {
        transform.x += this.velocity.x * this.speed * deltaTime;
        transform.y += this.velocity.y * this.speed * deltaTime;
    }
}