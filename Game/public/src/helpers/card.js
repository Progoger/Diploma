export default class Card {
    constructor(scene, card_type) {
        this.card_type = card_type;
        this.render = (x, y, sprite) => {
            let card = scene.add.image(x, y, sprite).setInteractive().setScale(0.4, 0.4);
            scene.input.setDraggable(card);
            return card;
        }
    }
}