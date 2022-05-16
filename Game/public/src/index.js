import mainMenu from "./scenes/mainMenu.js";
import Level1 from "./scenes/level1.js";
import Level2 from "./scenes/level2.js";
import Window from "./scenes/modalWindow.js";
import Description from "./scenes/description.js";
import MonthEnd from "./scenes/monthEnd.js";
import levelChoice from "./scenes/levelChoice.js";
import Borrow from "./scenes/borrow.js";
import Save from "./scenes/save.js";
import LevelFinish from "./scenes/levelFinish.js";
import characterChoice from "./scenes/characterChoice.js";
import characterCustomization from "./scenes/characterCustomization.js";
import RandomWindow from "./scenes/randomWindow.js";

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
        Window,
        Description,
        MonthEnd,
        LevelFinish,
        RandomWindow,
        Borrow,
        Save,
        characterCustomization
        
    ]
}
const game = new Phaser.Game(config);
