import { stat } from "../helpers/statistics.js";

let clicked = false;

export default class MonthEnd extends Phaser.Scene{
    constructor()
    {
        super({
            key: 'MonthEnd'
        });
    }

    preload() {
        this.load.image('bg1', 'src/assets/level2/ends/end1.png');
        this.load.image('bg2', 'src/assets/level2/ends/end2.png');
        this.load.image('input', 'src/assets/level2/ends/input.png');
        this.load.image('pay', 'src/assets/level2/ends/pay.png');
        this.load.image('continue', 'src/assets/level2/ends/continue.png');
    }

    create(data) {
        this.borrow_payed = 0;
        var bg = this.add.image(innerWidth*0.28, innerHeight/20, `bg${data.par.scene.month}`).setScale(0.33, 0.33).setOrigin(0);
        this.cameras.main.setViewport(0, 0, innerWidth, innerHeight);
        this.add.image(bg.x+bg.width*0.33*0.42, bg.y+bg.height*0.33*0.53, 'input').setScale(0.22, 0.22);
        var textEntry = this.add.text(bg.x+bg.width*0.33*0.22, bg.y+bg.height*0.33*0.50, '', { font: '58px Courier', fill: '#ffff00' });
        var pay = this.add.image(bg.x+bg.width*0.33*0.5, bg.y+bg.height*0.33*0.68, 'pay').setScale(0.27, 0.27).setInteractive();
        var cont =  this.add.image(bg.x+bg.width*0.43*0.33, bg.y+bg.height*0.33*0.85, 'continue').setInteractive().setScale(0.22, 0.22);
        this.score = this.add.text(bg.x+bg.width*0.33*0.42, bg.y+bg.height*0.33*0.215, data.par.scene.score, { font: '50px Courier', fill: '#000000' });
        this.saving = this.add.text(bg.x+bg.width*0.33*0.6, bg.y+bg.height*0.33*0.295, data.par.scene.players_saving, { font: '50px Courier', fill: '#000000' });
        this.debt = this.add.text(bg.x+bg.width*0.33*0.4, bg.y+bg.height*0.33*0.365, data.par.scene.players_debt, { font: '50px Courier', fill: '#000000' });
        
        cont.on('pointerdown', function() {
            let par = data.par.scene;
            par.players_borrow = 0;
            par.cells[par.active_cell].img.active = false;
            par.cells[par.active_cell].img.setTint(0x696969);
            par.active_cell = 0;
            par.cells[par.active_cell].img.active = true;
            par.cells[par.active_cell].img.setTint(0xffffff);
            par.month_view.destroy();
            par.month += 1;
            par.month_view = par.add.sprite(1500, 75, 'month'+par.month).setScale(0.15, 0.15);
            par.opened = false;
            par.scene.stop("MonthEnd");
            par.scene.resume();
        });

        pay.on('pointerdown', function() {
            let par = data.par.scene;
            let number = parseInt(textEntry.text);
            if (par.players_saving >= number && par.players_debt >= number && number != 0){
                par.players_saving -= number;
                par.players_debt -= number;
                par.saving.setText(par.players_saving);
                par.debt.setText(par.players_debt);
                this.saving.setText(par.players_saving);
                this.debt.setText(par.players_debt);
                textEntry.setText('');
                if (par.players_borrow != 0 && par.players_borrow > number){
                    let tmp = this.borrow_payed;
                    this.borrow_payed += number;
                    console.log();
                    console.log();
                    if (tmp === 0){
                        par.score += 0.5;
                    }
                    par.score += (Math.floor(this.borrow_payed/500))*0.5 - (Math.floor(tmp/500))*0.5; 
                    par.players_borrow -= number;
                }
                else if(par.players_borrow != 0){
                    let tmp = this.borrow_payed;
                    this.borrow_payed = this.borrow_payed + par.players_borrow;
                    if (tmp === 0){
                        par.score += 0.5;
                    }
                    par.score += (Math.floor(this.borrow_payed/500))*0.5 - (Math.floor(tmp/500))*0.5;
                    par.players_borrow = 0;
                };
                par.score_txt.setText(par.score);
                this.score.setText(par.score);
            }
        }, this);

        this.input.keyboard.on('keydown', function (event) {
            if (event.keyCode === 8 && textEntry.text.length > 0)
            {
                var tmp = textEntry.text.substr(0, textEntry.text.length - 1);
                textEntry.setText(tmp);
            }
            else if (event.keyCode >= 48 && event.keyCode < 58)
            {
                textEntry.setText(textEntry.text+event.key);
            }
        });
    }

    update() {
        
    }

}