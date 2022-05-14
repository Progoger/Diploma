import mainMenu from "./scenes/mainMenu.js";
import Level1 from "./scenes/level1.js";
import Level2 from "./scenes/level2.js";
import Window from "./scenes/modalWindow.js";
import levelChoice from "./scenes/levelChoice.js";
import characterChoice from "./scenes/characterChoice.js";
import characterCustomization from "./scenes/characterCustomization.js";

const config = {
    type: Phaser.WEBGL,
    parent: "phaser-example",
    width: innerWidth,
    height: innerHeight,
    scene: [
        mainMenu,
        characterChoice,
        Level1,
        levelChoice,
        Level2,
        characterCustomization,
        Window
    ]
}
const game = new Phaser.Game(config);
