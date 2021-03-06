import {stat, stat_record} from '../helpers/statistics.js';

export default class mainMenu extends Phaser.Scene {
    constructor() {
        super({
            key: 'mainMenu'
        });
        stat_record.gameStart();
        if (innerWidth/stat.common_width < innerHeight/stat.common_height){
            stat.koeff = innerWidth/stat.common_width;
        }
        else{
            stat.koeff = innerHeight/stat.common_height;
        }
    }

    preload() {
        this.load.image('bg', 'src/assets/common/bg.png');
        this.load.image('play', 'src/assets/mainMenu/play.png');
        this.load.image('exit', 'src/assets/mainMenu/exit.png');
        this.load.image('rules', 'src/assets/mainMenu/rules.png');
        this.load.image('statistics', 'src/assets/mainMenu/statistics.png');
        this.load.video('beginning', 'src/assets/videos/beginning.mp4');
    }

    create() {
        let self = this;
        this.add.sprite(innerWidth/2, innerHeight/2, 'bg').setScale(1, 0.866);
        var play = this.add.image(innerWidth/2, innerHeight/5, 'play').setScale(0.25*stat.koeff, 0.25*stat.koeff).setInteractive();
        var rules = this.add.image(innerWidth/2, innerHeight/5*2, 'rules').setScale(0.25*stat.koeff, 0.25*stat.koeff).setInteractive();
        this.add.image(innerWidth/2, innerHeight/5*3, 'statistics').setScale(0.25*stat.koeff, 0.25*stat.koeff);
        var exit = this.add.image(innerWidth/2, innerHeight/5*4, 'exit').setScale(0.25*stat.koeff, 0.25*stat.koeff);
        play.on('pointerdown', function (event) {
            this.scene.start("levelChoice");
          }, this);

        exit.on('pointerdown', function (event) {
            stat_record.endGame();
          }, this);

        rules.on('pointerdown', function (event) {
            this.scene.launch("Rule", {sc: '', par: this.scene});
        }, this);
    }

    update() {

    }

}