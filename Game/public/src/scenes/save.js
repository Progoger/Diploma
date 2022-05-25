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
        this.load.image('get', 'src/assets/level2/save/get.png');
        this.load.image('bonus', 'src/assets/level2/save/bonus.png');
        this.load.image('cross', 'src/assets/common/cross.png');
        this.load.image('input', 'src/assets/level2/save/input.png');
    }

    create(data) {
        var bg = this.add.image(innerWidth/3, innerHeight/12, 'bg').setScale(0.33, 0.33).setOrigin(0);
        this.cameras.main.setViewport(0, 0, innerWidth, innerHeight);
        var input = this.add.image(bg.x+bg.width*0.33*0.5, bg.y+bg.height*0.33*0.48, 'input').setScale(0.275, 0.275);
        var textEntry = this.add.text(bg.x+bg.width*0.33*0.2, bg.y+bg.height*0.33*0.46, '', { font: '58px Courier', fill: '#ffff00' });
        var save = this.add.image(bg.x+bg.width*0.33*0.4, bg.y+bg.height*0.33*0.61, 'save').setInteractive().setScale(0.2, 0.2);
        var get = this.add.image(bg.x+bg.width*0.33*0.4, bg.y+bg.height*0.33*0.74, 'get').setInteractive().setScale(0.2, 0.2);
        var bonus = this.add.image(bg.x+bg.width*0.33*0.5, bg.y+bg.height*0.33*0.88, 'bonus').setInteractive().setScale(0.265, 0.265);
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
        
        if (data.par.scene.active_cell === data.par.scene.cells.length-1){
            save.on('pointerdown', function() {
                let par = data.par.scene;
                var number = parseInt(textEntry.text);
                if (number <= par.players_money && number > 0){
                    par.score += 1;
                    par.players_money -= parseInt(textEntry.text);
                    par.players_saving += parseInt(textEntry.text);
                    par.money.setText(par.players_money);
                    par.saving.setText(par.players_saving);
                    par.score_txt.setText(par.score);
                    par.scene.stop("Save");
                    par.scene.resume();
                }
            }, this);
        }
        else{
            save.setTint(0x696969);
        }
        

        get.on('pointerdown', function() {
            let par = data.par.scene;
            var number = parseInt(textEntry.text);
            if (number <= par.players_saving){
                par.players_money += parseInt(textEntry.text);
                par.players_saving -= parseInt(textEntry.text);
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