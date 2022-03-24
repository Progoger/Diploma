export default class Card {
    constructor(scene, type) {
        this.render = (x, y, sprite) => {
            let card = scene.add.image(x, y, sprite).setInteractive();
            this.type = type;
            scene.input.setDraggable(card);
            return card;
        }
    }
}