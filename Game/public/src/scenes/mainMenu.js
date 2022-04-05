export default class mainMenu extends Phaser.Scene {
    constructor() {
        super({
            key: 'mainMenu'
        });
    }

    preload() {
        this.load.image('bg', 'src/assets/bg.png');
        this.load.image('play', 'src/assets/play.png');
        this.load.image('exit', 'src/assets/exit.png');
        this.load.image('rules', 'src/assets/rules.png');
        this.load.image('settings', 'src/assets/settings.png');
        this.load.image('statistics', 'src/assets/statistics.png');
    }

    create() {
        let self = this;
        this.add.sprite(innerWidth/2, innerHeight/2, 'bg').setScale(1, 0.866);
        var play = this.add.image(innerWidth/2, innerHeight/5, 'play').setScale(0.25, 0.25).setInteractive();
        this.add.image(innerWidth/2, innerHeight/5*2, 'rules').setScale(0.25, 0.25);
        this.add.image(innerWidth/2, innerHeight/5*3, 'statistics').setScale(0.25, 0.25);
        this.add.image(innerWidth/2, innerHeight/5*4, 'exit').setScale(0.25, 0.25);
        this.add.image(innerWidth/23, innerHeight/12, 'settings').setScale(0.1, 0.1);
        console.log(play);
        play.on('pointerdown', function (event) {
            console.log('1');
            this.scene.start("Level1");
          }, this);
    }

    update() {

    }

    go_to_play(){
        this.scene.start("Level1");
        console.log('1');
    }

}