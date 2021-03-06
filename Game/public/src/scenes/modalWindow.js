import { stat_record, stat } from '../helpers/statistics.js';

let clicked = false;

export default class Window extends Phaser.Scene{
    constructor()
    {
        super({
            key: 'Window'
        });
        this.tries = 0;
    }

    preload() {
        this.load.image('bg', `src/assets/windows/bgs/${stat.active_level}/${stat.lvl2_active_cell}.png`);
        this.load.image('pay', 'src/assets/windows/pay.png');
        this.load.image('cross', 'src/assets/common/cross.png');
        this.load.image('input', 'src/assets/level2/save/input.png');
        this.load.image('help', 'src/assets/windows/help.png');
        this.load.image('hint', `src/assets/level2/hints/${stat.lvl2_active_cell} common.png`);
        this.load.image('hint_uni', `src/assets/level2/hints/${stat.lvl2_active_cell} unique.png`);
    }

    create(data) {
        var bg = this.add.image(innerWidth/3, innerHeight/12, 'bg').setScale(0.6*stat.koeff, 0.6*stat.koeff).setOrigin(0).setInteractive();
        var bg_width = bg.width*0.6*stat.koeff;
        var bg_height = bg.height*0.6*stat.koeff;
        this.cameras.main.setViewport(0, 0, innerWidth, innerHeight);
        var pay = null;
        var cross = this.add.image(bg.x+bg_width*0.97, bg.y*1.05, 'cross').setScale(0.09*stat.koeff, 0.09*stat.koeff).setInteractive();
        if (data.type.split('_').length>1){
            var input = this.add.image(bg.x+bg_width*0.41, bg.y+bg_height*0.73, 'input').setScale(0.22*stat.koeff, 0.22*stat.koeff);
            var textEntry = this.add.text(bg.x+bg_width*0.2, bg.y+bg_height*0.705, '', { font: `${58*stat.koeff}px Courier`, fill: '#000000' });
            pay = this.add.image(bg.x+bg_width*0.5, bg.y+bg_height*0.88, 'pay').setInteractive().setScale(0.22*stat.koeff, 0.22*stat.koeff);
        
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
        else{
            pay = this.add.image(bg.x+bg_width*0.3, bg.y+bg_height*0.475, 'pay').setInteractive().setScale(0.22*stat.koeff, 0.22*stat.koeff);
            var notpay = this.add.image(bg.x+bg_width*0.3, bg.y+bg_height*0.525, 'pay').setInteractive().setScale(0.22*stat.koeff, 0.22*stat.koeff);
        };
        var help = this.add.image(bg.x+bg_width*0.85, bg.y+bg_height*0.73, 'help').setInteractive().setScale(0.08*stat.koeff, 0.08*stat.koeff).setTint(0x696969);;
        var hint;
        if (data.par.scene.month === data.par.scene.unique_hints[data.description]){
            hint = this.add.image(bg.x+bg_width*1.08, bg.y+bg_height*0.68, 'hint_uni').setScale(0, 0);        
        }
        else{
            hint = this.add.image(bg.x+bg_width*1.08, bg.y+bg_height*0.68, 'hint').setScale(0, 0);        
        }       
        
        cross.on('pointerdown', function() {
            let par = data.par.scene;
            par.scene.stop("Window");
            par.scene.resume();
        }, this);

        pay.on('pointerdown', function() {
            let par = data.par.scene;
            if (data.type.split('_').length > 1 && this.tries <= 3){
                var number = parseInt(textEntry.text);
                var range = par.range_payments[data.type.split('_')[1]+par.month][data.description];
                if (typeof range !== 'number' && number >= range[0] && number <= range[1] && number <= par.players_money){
                    if (this.tries < 3){
                        par.score += 1;
                    };
                    par.players_money -= number;
                    par.money.setText(par.players_money);
                    par.score_txt.setText(par.score);
                    this.tries = 0;

                    stat_record.sendAnswer({
                        'correct': true
                    });
                    stat_record.enterLevel({
                        'answer_number': 1
                    });

                    this.move(par);
                }
                else if(number >= range && number <= par.players_money){
                    if (this.tries < 3){
                        par.score += 1;
                    };
                    par.players_money -= number;
                    par.money.setText(par.players_money);
                    par.score_txt.setText(par.score);
                    this.tries = 0;
                    
                    stat_record.sendAnswer({
                        'correct': true
                    });
                    stat_record.enterLevel({
                        'answer_number': 1
                    });
                    
                    this.move(par);
                };
                textEntry.setText('');
            };
            this.tries += 1;

            stat_record.sendAnswer({
                'correct': false
            });
            stat_record.enterLevel({
                'answer_number': 1
            });

            if (this.tries === 3){
                help.setTint(0xffffff);
            };
        }, this);

        help.on('pointerdown', function (event) {
            if (clicked === false && this.tries >= 3){
                hint.setScale(0.2*stat.koeff, 0.2*stat.koeff);
                clicked = true;
            }
            else{
                hint.setScale(0, 0);
                clicked = false;
            }
        }, this);
    }

    update() {
        
    }

    move(par){
        par.cells[par.active_cell].img.active = false;
        par.cells[par.active_cell].img.setTint(0x696969);
        par.active_cell++;
        
        if (par.active_cell != null){
            par.cells[par.active_cell].img.active = true;
            par.cells[par.active_cell].img.setTint(0xffffff);
        }

        par.opened = false;
        par.scene.stop("Window");
        par.scene.resume();
    }

}