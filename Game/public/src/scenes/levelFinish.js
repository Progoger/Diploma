import { stat } from "../helpers/statistics.js";

let clicked = false;

export default class LevelFinish extends Phaser.Scene{
    constructor()
    {
        super({
            key: 'LevelFinish'
        });
    }

    preload() {
        this.load.image('bg', 'src/assets/level2/levelFinish/bg.png');
        this.load.image('input', 'src/assets/level2/levelFinish/input.png');
        this.load.image('pay', 'src/assets/level2/levelFinish/pay.png');
        this.load.image('finish', 'src/assets/level2/levelFinish/finish.png');
        this.load.image('bonus', 'src/assets/level2/levelFinish/bonus.png');
    }

    create(data) {
        var bg = this.add.image(innerWidth*0.28, innerHeight/20, 'bg').setScale(0.33, 0.33).setOrigin(0);
        this.cameras.main.setViewport(0, 0, innerWidth, innerHeight);
        this.add.image(bg.x+bg.width*0.33*0.42, bg.y+bg.height*0.33*0.51, 'input').setScale(0.22, 0.22);
        this.add.image(bg.x+bg.width*0.33*0.5, bg.y+bg.height*0.33*0.63, 'pay').setScale(0.27, 0.27);
        this.add.image(bg.x+bg.width*0.33*0.425, bg.y+bg.height*0.33*0.755, 'bonus').setScale(0.22, 0.22);
        var cont =  this.add.image(bg.x+bg.width*0.5*0.33, bg.y+bg.height*0.33*0.88, 'finish').setInteractive().setScale(0.27, 0.27);
        this.score = this.add.text(bg.x+bg.width*0.33*0.42, bg.y+bg.height*0.33*0.215, data.par.scene.score, { font: '50px Courier', fill: '#000000' });
        this.saving = this.add.text(bg.x+bg.width*0.33*0.6, bg.y+bg.height*0.33*0.295, data.par.scene.players_saving, { font: '50px Courier', fill: '#000000' });
        this.debt = this.add.text(bg.x+bg.width*0.33*0.4, bg.y+bg.height*0.33*0.365, data.par.scene.players_debt, { font: '50px Courier', fill: '#000000' });

        cont.on('pointerdown', function() {
            var par = data.par.scene;
            console.log(par.month);
            console.log(par.active_cell);
            par.cells[par.active_cell].img.active = false;
            par.cells[par.active_cell].img.setTint(0x696969);
            par.active_cell = null;
            par.complete.setTint(0xffffff);
            par.opened = false;
            par.scene.stop("LevelFinish");
            par.scene.resume();
        }, this);
    }

    update() {
        
    }

}