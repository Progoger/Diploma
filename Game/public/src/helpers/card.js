export default class Card {
    constructor(scene, card_type) {
        this.card_type = card_type;
        this.render = (x, y, sprite) => {
            let card = scene.add.image(x, y, sprite).setInteractive();
            scene.input.setDraggable(card);
            return card;
        }
    }
}