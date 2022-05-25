import { stat } from "../helpers/statistics.js";
import Button from '../helpers/button.js';

export default class Bonus extends Phaser.Scene{
    constructor()
    {
        super({
            key: 'Bonus'
        });

        this.buttons_img = [
            'skiing',
            'karting',
            'voucher',
            'golf',
            'ship',
            'lasertag',
            'anything',
            'saving'
        ];

        this.prices = {
            'skiing': 5000,
            'karting': 4000,
            'voucher': 4000,
            'golf': 4000,
            'ship': 3000,
            'lasertag': 2500
        }

        this.buttons = {};
    }

    preload() {
        this.load.image('bg', 'src/assets/level2/bonus/bg.png');
        this.load.image('skiing', 'src/assets/level2/bonus/skiing.png');
        this.load.image('score', 'src/assets/level2/bonus/score.png');
        this.load.image('karting', 'src/assets/level2/bonus/karting.png');
        this.load.image('voucher', 'src/assets/level2/bonus/voucher.png');
        this.load.image('golf', 'src/assets/level2/bonus/golf.png');
        this.load.image('ship', 'src/assets/level2/bonus/ship.png');
        this.load.image('lasertag', 'src/assets/level2/bonus/lasertag.png');
        this.load.image('anything', 'src/assets/level2/bonus/anything.png');
        this.load.image('saving', 'src/assets/level2/bonus/saving.png');
    }

    create(data) {
        var bg = this.add.image(innerWidth*0.15, innerHeight*0.1, 'bg').setScale(0.7, 0.7).setOrigin(0);
        this.cameras.main.setViewport(0, 0, innerWidth, innerHeight);
        this.add.image(bg.x+bg.width*0.7*0.075, bg.y+bg.height*0.7*0.075, 'score').setScale(0.3, 0.3).setOrigin(0);
        this.score_txt = this.add.text(bg.x+bg.width*0.7*0.22, bg.y+bg.height*0.7*0.10, data.par.score, { font: '50px Courier', fill: '#ffede4' });
        this.par = data.par.scene;

        for (let i = 0; i < 4; i++){
            var tmp = new Button(this);
            tmp.render(bg.x+bg.width*0.7*(0.15+0.23*(i)), bg.y+bg.height*0.7*0.4, this.buttons_img[i]);
            this.buttons[this.buttons_img[i]] = tmp;
        };

        for (let i = 0; i < 4; i++){
            var tmp = new Button(this);
            tmp.render(bg.x+bg.width*0.7*(0.15+0.23*(i)), bg.y+bg.height*0.7*0.8, this.buttons_img[i+4]);
            this.buttons[this.buttons_img[i+4]] = tmp;
        };

    }

    update() {
        
    }

    createWindow(description){
        this.scene.launch('BonusWindow', {par:this.par, bg: description, price: this.prices[description], but: this.buttons[description]});
        this.scene.pause('Bonus');
    }

}