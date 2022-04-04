export default class MainMenu extends Phaser.Scene {
    constructor() {
        super({
            key: 'MainMenu'
        });
        this.score = 0;
    }

    preload() {
        this.load.image('backGround', 'src/assets/bg.png');
        this.load.image('play', 'src/assets/play.png');
        this.load.image('rules', 'src/assets/rules.png');
        this.load.image('statistics', 'src/assets/statistics.png');
        this.load.image('help', 'src/assets/help.png');
    }

    create() {
        this.add.image(innerWidth/2, innerHeight/2, 'backGround').setInteractive();
        this.add.image(innerWidth/2, innerHeight/2, 'play').setInteractive();
        
    }

    update() {

    }
}