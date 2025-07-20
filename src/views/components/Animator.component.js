export default class AnimatorComponent {
    constructor() {
    }

    parallaxToDown(image, parallaxOptions) {
        if (parallaxOptions.backgroundsY[1] === 0) {
            parallaxOptions.backgroundsY[1] = parallaxOptions.screenHeight;
        }

        for (let i = 0; i < 2; i++) {
            parallaxOptions.backgroundsY[i] += parallaxOptions.speed;
            if (parallaxOptions.backgroundsY[i] >= parallaxOptions.screenHeight) {
                parallaxOptions.backgroundsY[i] -= 2 * parallaxOptions.screenHeight;
            }
        }

        image.draw(0, parallaxOptions.backgroundsY[0])
        image.draw(0, parallaxOptions.backgroundsY[1])
    }
}