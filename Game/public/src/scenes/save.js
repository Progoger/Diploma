import { stat } from "../helpers/statistics.js";

let clicked = false;

export default class Save extends Phaser.Scene{
    constructor()
    {
        super({
            key: 'Save'
        });
        this.tries = 0;
    }

    preload() {
        this.load.image('bg', `src/assets/level2/save/bg.png`);
        this.load.image('save', 'src/assets/level2/save/save.png');
        this.load.image('bonus', 'src/assets/level2/save/bonus.png');
        this.load.image('cross', 'src/assets/common/cross.png');
        this.load.image('input', 'src/assets/level2/save/input.png');
    }

    create(data) {
        var bg = this.add.image(innerWidth/3, innerHeight/12, 'bg').setScale(0.33, 0.33).setOrigin(0);
        this.cameras.main.setViewport(0, 0, innerWidth, innerHeight);
        var input = this.add.image(bg.x+bg.width*0.33*0.5, bg.y+bg.height*0.33*0.55, 'input').setScale(0.28, 0.28);
        var textEntry = this.add.text(bg.x+bg.width*0.33*0.2, bg.y+bg.height*0.33*0.53, '', { font: '58px Courier', fill: '#ffff00' });
        var save = this.add.image(bg.x+bg.width*0.33*0.43, bg.y+bg.height*0.33*0.7, 'save').setInteractive().setScale(0.22, 0.22);
        var bonus = this.add.image(bg.x+bg.width*0.33*0.5, bg.y+bg.height*0.33*0.86, 'bonus').setInteractive().setScale(0.27, 0.27);
        var cross = this.add.image(bg.x+bg.width*0.33*0.97, bg.y*1.05, 'cross').setScale(0.09, 0.09).setInteractive();

        this.input.keyboard.on('keydown', function (event) {
            if (event.keyCode === 8 && textEntry.text.length > 0)
            {
                var tmp = textEntry.text.substr(0, textEntry.text.length - 1);
                textEntry.setText(tmp);
            }
            else if (event.keyCode >= 48 && event.keyCode < 58)
            {
                textEntry.setText(textEntry.text+event.key);
            };

        });

        save.on('pointerdown', function() {
            let par = data.par.scene;
            var number = parseInt(textEntry.text);
            if (number <= par.players_money){
                par.players_money -= parseInt(textEntry.text);
                par.players_saving += parseInt(textEntry.text);
                par.money.setText(par.players_money);
                par.saving.setText(par.players_saving);
                par.scene.stop("Save");
                par.scene.resume();
            }
        }, this);

        cross.on('pointerdown', function() {
            let par = data.par.scene;
            par.scene.stop("Save");
            par.scene.resume();
        }, this);
    }

    update() {
        
    }
}