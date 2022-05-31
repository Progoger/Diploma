import { stat } from "../helpers/statistics.js";

export default class BonusWindow extends Phaser.Scene{
    constructor()
    {
        super({
            key: 'BonusWindow'
        });
        this.click = null;
    }

    preload() {
        if (stat.active_level === 'level2')
        {
            this.load.image('skiing', 'src/assets/level2/bonusWindow/level2/skiing.png');
            this.load.image('karting', 'src/assets/level2/bonusWindow/level2/karting.png');
            this.load.image('voucher', 'src/assets/level2/bonusWindow/level2/voucher.png');
            this.load.image('golf', 'src/assets/level2/bonusWindow/level2/golf.png');
            this.load.image('lasertag', 'src/assets/level2/bonusWindow/level2/lasertag.png');
            this.load.image('ship', 'src/assets/level2/bonusWindow/level2/ship.png');
        }
        else{
            this.load.image('bike', 'src/assets/level2/bonusWindow/level3/bike.png');
            this.load.image('cottage', 'src/assets/level2/bonusWindow/level3/cottage.png');
            this.load.image('oceanarium', 'src/assets/level2/bonusWindow/level3/oceanarium.png');
            this.load.image('planetarium', 'src/assets/level2/bonusWindow/level3/planetarium.png');
            this.load.image('restaurant', 'src/assets/level2/bonusWindow/level3/restaurant.png');
            this.load.image('ship', 'src/assets/level2/bonusWindow/level3/ship.png');
        };
        this.load.image('input', 'src/assets/level2/bonusWindow/input.png');
        this.load.image('anything', 'src/assets/level2/bonusWindow/anything.png');
        this.load.image('saving', 'src/assets/level2/bonusWindow/saving.png');
        this.load.image('pay', 'src/assets/level2/bonusWindow/pay.png');
        this.load.image('pay1', 'src/assets/level2/bonusWindow/pay1.png');
        this.load.image('complete', 'src/assets/level2/bonusWindow/complete.png');
        this.load.image('cross', 'src/assets/common/cross.png');
    }

    create(data) {
        var comp = null;
        var pay = null;
        var cross = null;
        if (data.bg === 'saving'){
            var bg = this.add.image(innerWidth*0.2, innerHeight*0.1, data.bg).setScale(0.58, 0.58).setOrigin(0);
            this.add.text(bg.x+bg.width*0.58*0.61, bg.y+bg.height*0.58*0.39, data.par.scene.players_saving, { font: '80px Courier', fill: '#ffede4' });
            this.cameras.main.setViewport(0, 0, innerWidth, innerHeight);
            comp = this.add.image(bg.x+bg.width*0.58*0.5, bg.y+bg.height*0.58*0.74, 'complete').setScale(0.475, 0.475).setInteractive();
            var cross = this.add.image(bg.x+bg.width*0.58*0.965, bg.y+bg.height*0.58*0.02, 'cross').setScale(0.09, 0.09).setInteractive();
        }
        else if(data.bg === 'anything'){
            var bg = this.add.image(innerWidth*0.3, innerHeight*0.03, data.bg).setScale(0.4, 0.4).setOrigin(0);
            this.add.text(bg.x+bg.width*0.4*0.6, bg.y+bg.height*0.4*0.17, data.par.scene.players_saving, { font: '60px Courier', fill: '#ffede4' });
            this.cameras.main.setViewport(0, 0, innerWidth, innerHeight);
            var inp = this.add.image(bg.x+bg.width*0.4*0.43, bg.y+bg.height*0.4*0.415, 'input').setScale(0.27, 0.27).setInteractive();
            this.goal = this.add.text(bg.x+bg.width*0.4*0.18, bg.y+bg.height*0.4*0.39, '', { font: '50px Courier', fill: '#ffede4' });
            var inp1 = this.add.image(bg.x+bg.width*0.4*0.43, bg.y+bg.height*0.4*0.61, 'input').setScale(0.27, 0.27).setInteractive();
            this.price = this.add.text(bg.x+bg.width*0.4*0.18, bg.y+bg.height*0.4*0.585, '', { font: '50px Courier', fill: '#ffede4' });
            pay = this.add.image(bg.x+bg.width*0.4*0.43, bg.y+bg.height*0.4*0.73, 'pay1').setScale(0.27, 0.27).setInteractive();
            comp = this.add.image(bg.x+bg.width*0.4*0.5, bg.y+bg.height*0.4*0.875, 'complete').setScale(0.32, 0.32).setInteractive();
            cross = this.add.image(bg.x+bg.width*0.4*0.965, bg.y+bg.height*0.4*0.02, 'cross').setScale(0.09, 0.09).setInteractive();

            inp.on('pointerdown', function() {
                this.click = 'goal';
            }, this);

            inp1.on('pointerdown', function() {
                this.click = 'price';
            }, this);

            pay.on('pointerdown', function() {
                let par = data.par.scene;
                var number = parseInt(this.price.text);
                if (par.players_saving >= number){
                    par.players_saving -= number;

                    if (number < 500 && number !== 0){
                        par.score += 0.5;
                    }
                    else{
                        par.score += number/500;
                    };
                    par.score_txt.setText(par.score);
                    par.saving.setText(par.players_saving);
                    data.but.bought = true;
                    data.but.img.setTint(0x696969);
                    data.but.img.scene.score_txt.setText(par.score);
                    par.scene.stop("BonusWindow");
                    par.scene.resume('Bonus');
                }
                
            }, this);

            this.input.keyboard.on('keydown', function (event) {
                console.log(event.keyCode);
                if (this.click === 'price'){
                    if (event.keyCode === 8 && this.price.text.length > 0)
                    {
                        var tmp = this.price.text.substr(0, this.price.text.length - 1);
                        this.price.setText(tmp);
                    }
                    else if (event.keyCode >= 48 && event.keyCode < 58)
                    {
                        this.price.setText(this.price.text+event.key);
                    }
                }
                else if (this.click === 'goal'){
                    if (event.keyCode === 8 && this.price.text.length > 0)
                    {
                        var tmp = this.goal.text.substr(0, this.goal.text.length - 1);
                        this.goal.setText(tmp);
                    }
                    else if(event.keyCode > 64 && event.keyCode < 123){
                        this.goal.setText(this.goal.text+event.key);
                    }
                };

            }, this);
        }
        else{
            var bg = this.add.image(innerWidth*0.3, innerHeight*0.05, data.bg).setScale(0.46, 0.46).setOrigin(0);
            this.add.text(bg.x+bg.width*0.46*0.62, bg.y+bg.height*0.46*0.335, data.par.scene.players_saving, { font: '70px Courier', fill: '#ffede4' });
            this.cameras.main.setViewport(0, 0, innerWidth, innerHeight);
            pay = this.add.image(bg.x+bg.width*0.46*0.425, bg.y+bg.height*0.46*0.65, 'pay').setScale(0.3, 0.3).setInteractive();
            comp = this.add.image(bg.x+bg.width*0.46*0.5, bg.y+bg.height*0.46*0.835, 'complete').setScale(0.37, 0.37).setInteractive();
            cross = this.add.image(bg.x+bg.width*0.46*0.965, bg.y+bg.height*0.46*0.02, 'cross').setScale(0.09, 0.09).setInteractive();
        
            pay.on('pointerdown', function() {
                let par = data.par.scene;
                if (par.players_saving >= data.price){
                    par.players_saving -= data.price;

                    if (data.price < 500){
                        par.score += 0.5;
                    }
                    else{
                        par.score += data.price/500;
                    };
                    par.score_txt.setText(par.score);
                    par.saving.setText(par.players_saving);
                    data.but.bought = true;
                    data.but.img.setTint(0x696969);
                    data.but.img.scene.score_txt.setText(par.score);
                    console.log(data.but);
                    par.scene.stop("BonusWindow");
                    par.scene.resume('Bonus');
                }
                
            }, this);
        };
        

        comp.on('pointerdown', function() {
            let par = data.par.scene;
            if (par.players_saving < 500 && par.players_saving !== 0){
                par.score += 0.5;
            }
            else{
                par.score += par.players_saving/500;
            };
            par.players_saving = 0;
            par.score_txt.setText(par.score);
            par.saving.setText(par.players_saving);
            if (stat.active_level === 'level2'){
                par.scene.launch("Level2Finish", {par: par});
            }
            else{
                par.scene.launch("Level3Finish", {par: par});
            };
            par.scene.stop("BonusWindow");
            par.scene.stop('Bonus');
            par.scene.stop('LevelFinish');
        }, this);
    
        cross.on('pointerdown', function() {
            let par = data.par.scene;
            par.scene.stop("BonusWindow");
            par.scene.resume('Bonus');
        }, this);
    }

    update() {
        
    }

}