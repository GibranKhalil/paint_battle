export default class ModelFactory {
    static createTransform(x = 0, y = 0) {
        return new Transform(x, y);
    }

    static createMovement(speed = 1) {
        return new Movement(speed);
    }

    static createHealth(maxHealth = 100) {
        return new Health(maxHealth);
    }
}