import Game from "./scenes/game.js";

const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: innerWidth,
    height: innerHeight,
    scene: [
        Game
    ]
}
const game = new Phaser.Game(config);
