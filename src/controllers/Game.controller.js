export default class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.setupSystems();
    }

    setupSystems() {
        this.model.entityManager.addSystem(new MovementSystem());
        this.model.entityManager.addSystem(new CollisionSystem());
    }

    update(deltaTime) {
        this.model.entityManager.update(deltaTime);
        this.view.render(this.model.getEntities());
    }
}