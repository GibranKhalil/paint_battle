export default class MovementModel {
    constructor(speed = 1) {
        this.speed = speed;
        this.stepSize = 1;
    }

    moveUp(transform) {
        transform.y -= this.stepSize;
    }

    moveDown(transform) {
        transform.y += this.stepSize;
    }

    moveLeft(transform) {
        transform.x -= this.stepSize;
    }

    moveRight(transform) {
        transform.x += this.stepSize;
    }

    setSpeed(newSpeed) {
        this.speed = newSpeed;
    }

    setStepSize(newStepSize) {
        this.stepSize = newStepSize;
    }

    smoothMove(transform, targetX, targetY, deltaTime) {
        const dx = targetX - transform.x;
        const dy = targetY - transform.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0.1) {
            const moveDistance = this.speed * deltaTime;
            const ratio = Math.min(moveDistance / distance, 1);

            transform.x += dx * ratio;
            transform.y += dy * ratio;
        }
    }
}