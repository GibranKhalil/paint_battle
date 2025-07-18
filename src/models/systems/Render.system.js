export default class RenderSystem {
    render(entities, ctx) {
        entities.forEach(entity => {
            const transform = entity.getComponent('transform');
            const renderer = entity.getComponent('renderer');

            if (transform && renderer) {
                renderer.render(ctx, transform);
            }
        });
    }
}