import ModelManager from "./managers/Model.manager.js";

export default class GameModel {
    constructor() {
        this.entityManager = new ModelManager();
        this.gameState = 'playing';
    }

    getEntities() {
        return this.entityManager.entities;
    }
}