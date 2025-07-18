import COMPONENTS_ID from "../../constants/components.constant.js";
import BaseEntityView from "./Base.view.js";

export default class PlayerView extends BaseEntityView {
    constructor(player) {
        super();
        this.player = player;

        this.player.getComponent(COMPONENTS_ID.ObserverModel).addObserver(this)
    }

    destroy() {
        this.player.getComponent(COMPONENTS_ID.ObserverModel).removeObserver(this)
    }

    onEntityEvent(eventType, data) {

    }
}