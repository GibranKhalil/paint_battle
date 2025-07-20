export default class ClickableComponent {
    constructor(onClick) {
        this.onClick = onClick
    }

    onClick() {
        this.onClick();
    }
}