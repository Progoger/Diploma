import MainMenu from "./scenes/mainMenu.js";
import Game from "./scenes/mainMenu.js";

const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: innerWidth,
    height: innerHeight,
    scene: [
        MainMenu
    ]
}
const game = new Phaser.Game(config);
