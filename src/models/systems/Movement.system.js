export default class MovementSystem {
    update(entities, deltaTime) {
        entities.forEach(entity => {
            const transform = entity.getComponent('transform');
            const movement = entity.getComponent('movement');

            if (transform && movement) {
                movement.move(transform, deltaTime);
            }
        });
    }
}