import BaseModel from "../Base.model.js";

export default class ModelManager {
    constructor() {
        this.entities = [];
        this.systems = [];
    }

    createEntity() {
        const entity = new BaseModel();
        this.entities.push(entity);
        return entity;
    }

    removeEntity(entity) {
        const index = this.entities.indexOf(entity);
        if (index > -1) {
            this.entities.splice(index, 1);
        }
    }

    addSystem(system) {
        this.systems.push(system);
    }

    update(deltaTime) {
        this.systems.forEach(system => {
            if (system.update) {
                system.update(this.entities, deltaTime);
            }
        });
    }
}