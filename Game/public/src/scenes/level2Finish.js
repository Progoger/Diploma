import { stat } from "../helpers/statistics.js";

let clicked = false;

export default class Level2Finish extends Phaser.Scene{
    constructor()
    {
        super({
            key: 'Level2Finish'
        });
    }

    preload() {
        this.load.image('bg', 'src/assets/level2/resultfail.png');
        this.load.image('bgsuccess', 'src/assets/level2/resultsuccess.png');
        this.load.image('home', 'src/assets/common/home.png');
        this.load.image('replay', 'src/assets/common/replay.png');
        this.load.image('complete', 'src/assets/common/complete.png');
    }

    create(data) {
        var bg;
        console.log(data.par);
        if (data.par.score < 25){
            bg = this.add.image(innerWidth*0.35, innerHeight/20, 'bg').setScale(0.3, 0.3).setOrigin(0);
            var comp = this.add.image(bg.x+bg.width*0.3*0.78, bg.y+bg.height*0.3*0.88, 'complete').setScale(0.08, 0.08).setInteractive().setTint(0x696969);
            stat.lvl1_score = this.score;
        }
        else{
            bg = this.add.image(innerWidth*0.35, innerHeight/20, 'bgsuccess').setScale(0.3, 0.3).setOrigin(0);
            var comp = this.add.image(bg.x+bg.width*0.3*0.78, bg.y+bg.height*0.3*0.88, 'complete').setScale(0.08, 0.08).setInteractive();
            stat.lvl1_score = this.score;
            stat.lvl1_completed = true;

            comp.on('pointerdown', function(event) {
                data.par.scene.stop('Level2Finish');
                data.par.scene.stop();
                data.par.scene.launch("Rule", {description: '5', sc:'Level3', par: this.scene});
            }, this);
        };
        this.cameras.main.setViewport(0, 0, innerWidth, innerHeight);
        this.add.text(bg.x+bg.width*0.3*0.53, bg.y+bg.height*0.3*0.32, data.par.score, { font: '100px Courier', fill: '#000000' });
        var home = this.add.image(bg.x+bg.width*0.3*0.22, bg.y+bg.height*0.3*0.88, 'home').setScale(0.08, 0.08).setInteractive();
        var replay = this.add.image(bg.x+bg.width*0.3*0.5, bg.y+bg.height*0.3*0.88, 'replay').setScale(0.08, 0.08).setInteractive();
        
        home.on('pointerdown', function(event) {
            data.par.scene.stop('Level2Finish');
            data.par.scene.stop('Level2');
            data.par.scene.start("mainMenu");
        }, this);
        
        replay.on('pointerdown', function(event) {
            data.par.scene.stop('Level2Finish');
            data.par.scene.stop();
            data.par.scene.start("Level2");
        }, this);
    }

    update() {
        
    }

}