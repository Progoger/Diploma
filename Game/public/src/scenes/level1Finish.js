import { stat } from "../helpers/statistics.js";

let clicked = false;

export default class Level1Finish extends Phaser.Scene{
    constructor()
    {
        super({
            key: 'Level1Finish'
        });
    }

    preload() {
        this.load.image('bg', 'src/assets/level1/resultfail.png');
        this.load.image('bgsuccess', 'src/assets/level1/resultsuccess.png');
        this.load.image('home', 'src/assets/common/home.png');
        this.load.image('replay', 'src/assets/common/replay.png');
        this.load.image('complete', 'src/assets/common/complete.png');
    }

    create(data) {
        var bg;
        var bg_width;
        var bg_height;
        if (data.par.score < 14){
            bg = this.add.image(innerWidth*0.35, innerHeight/20, 'bg').setScale(0.3*stat.koeff, 0.3*stat.koeff).setOrigin(0);
            bg_width = bg.width*0.3*stat.koeff;
            bg_height = bg.height*0.3*stat.koeff;
            var comp = this.add.image(bg.x+bg_width*0.78, bg.y+bg_height*0.88, 'complete').setScale(0.1*stat.koeff, 0.1*stat.koeff).setInteractive().setTint(0x696969);
            stat.lvl1_score = this.score;
        }
        else{
            bg = this.add.image(innerWidth*0.35, innerHeight/20, 'bgsuccess').setScale(0.3*stat.koeff, 0.3*stat.koeff).setOrigin(0);
            bg_width = bg.width*0.3*stat.koeff;
            bg_height = bg.height*0.3*stat.koeff;
            var comp = this.add.image(bg.x+bg_width*0.78, bg.y+bg_height*0.88, 'complete').setScale(0.1*stat.koeff, 0.1*stat.koeff).setInteractive();
            stat.lvl1_score = this.score;
            stat.lvl1_completed = true;

            comp.on('pointerdown', function(event) {
                data.par.scene.stop('Level1Finish');
                data.par.scene.stop();
                data.par.scene.launch("Rule", {description: '5', sc:'Level2', par: this.scene});
            }, this);
        };
        this.cameras.main.setViewport(0, 0, innerWidth, innerHeight);
        this.add.text(bg.x+bg_width*0.55, bg.y+bg_height*0.37, data.par.score, { font: `${100*stat.koeff}px Courier`, fill: '#000000' });
        var home = this.add.image(bg.x+bg_width*0.22, bg.y+bg_height*0.88, 'home').setScale(0.1*stat.koeff, 0.1*stat.koeff).setInteractive();
        var replay = this.add.image(bg.x+bg_width*0.5, bg.y+bg_height*0.88, 'replay').setScale(0.1*stat.koeff, 0.1*stat.koeff).setInteractive();
        
        home.on('pointerdown', function(event) {
            data.par.scene.stop('Level1Finish');
            data.par.scene.stop();
            data.par.scene.start("mainMenu");
        }, this);
        
        replay.on('pointerdown', function(event) {
            data.par.scene.stop('Level1Finish');
            data.par.scene.stop();
            data.par.scene.start("Level1");
        }, this);
    }

    update() {
        
    }

}