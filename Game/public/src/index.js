import mainMenu from "./scenes/mainMenu.js";
import Level1 from "./scenes/level1.js";

const config = {
    type: Phaser.WEBGL,
    parent: "phaser-example",
    width: innerWidth,
    height: innerHeight,
    scene: [
        mainMenu,
        Level1
    ]
}
const game = new Phaser.Game(config);
