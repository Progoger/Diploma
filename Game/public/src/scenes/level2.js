import Cell from '../helpers/cell.js';
import { stat_record, stat } from '../helpers/statistics.js';
import { getRandomInt } from '../helpers/functions.js';'../helpers/functions.js';

export default class Level2 extends Phaser.Scene {
    
    constructor() {
        super({
            key: 'Level2'
        });
        this.win_i = 0;
        this.active_cell = 0;
        this.players_money = 0;
        this.players_debt = 1000;
        this.players_saving = 0;
        this.cells_description = [
            'cell', 
            'public_utilities', 
            'internet', 
            'products', 
            'question expense', 
            'transport',
            'household',
            'question sidejob',
            'pharmacy',
            'clothes',
            'question entertainment',
            'cell'
        ];
        this.cells = [];
        this.month = 1;

        this.range_payments = {
            'public_utilities': [1500, 2000],
            'internet': [900, 1000],
            'products': [1000, 1500],
            'transport': [1500, 2000],
            'household': [1000, 2000],
            'pharmacy': [700, 900],
            'clothes': [10000, 11000]
        };

        this.random_windows = {
            'expense': [1000, 1000, 700, 300, 2000, 600, 700, 500, 1000, 1000],
            'sidejob': [2000, 2000, 1000, 2000, 900, 1000, 1000],
            'entertainment': [600, 700, 600, 300, 300, 900, 800, 800, 700, 500]
        };

        this.score = 0;

        this.opened = true;
    }

    preload() {
        
        this.load.image('bg', 'src/assets/common/bg.png');
        this.load.image('cell', 'src/assets/level2/cell.png');
        this.load.image('bomb', 'src/assets/level2/bomb.png');
        this.load.image('clothes', 'src/assets/level2/clothes.png');
        this.load.image('internet', 'src/assets/level2/internet.png');
        this.load.image('moneybox', 'src/assets/level2/moneybox.png');
        this.load.image('pharmacy', 'src/assets/level2/pharmacy.png');
        this.load.image('products', 'src/assets/level2/products.png');
        this.load.image('public_utilities', 'src/assets/level2/public_utilities.png');
        this.load.image('household', 'src/assets/level2/household.png');
        this.load.image('question', 'src/assets/level2/question.png');
        this.load.image('transport', 'src/assets/level2/transport.png');
        this.load.image('money', 'src/assets/level2/money.png');
        this.load.image('debt', 'src/assets/level2/debt.png');
        this.load.image('saving', 'src/assets/level2/saving.png');
        this.load.image('month1', 'src/assets/level2/month1.png');
        this.load.image('month2', 'src/assets/level2/month2.png');
        this.load.image('month3', 'src/assets/level2/month3.png');
        this.load.image('complete', 'src/assets/common/complete.png');
        this.load.image('help', 'src/assets/common/help.png');
        this.load.image('progress', 'src/assets/common/progress.png');
        this.load.image('statistics', 'src/assets/common/statistics.png');
        this.load.image('score', 'src/assets/common/score.png');
        this.load.image('character', 'src/assets/common/character.png');
        this.load.image('avatar', `src/assets/appereance/${stat.gender}/${stat.character.split('_')[0]}/${stat.character}.png`);
    }

    create() {
        this.add.sprite(innerWidth/2, innerHeight/2, 'bg').setScale(1, 0.866);
        this.add.image(innerWidth*0.945, innerHeight*0.15, 'avatar').setScale(0.2, 0.2);
        this.complete = this.add.sprite(innerWidth-75, innerHeight-75, 'complete').setScale(0.09, 0.09).setInteractive().setTint(0x696969);
        this.add.sprite(innerWidth-75, innerHeight/2-130, 'help').setScale(0.09, 0.09);
        this.add.sprite(innerWidth-75, innerHeight/2-20, 'progress').setScale(0.09, 0.09);
        this.add.sprite(innerWidth-75, innerHeight/2+90, 'statistics').setScale(0.09, 0.09);
        this.add.sprite(innerWidth-75, innerHeight/2+200, 'character').setScale(0.09, 0.09);
        this.add.sprite(175, 75, 'score').setScale(0.15, 0.15);
        this.score_txt = this.add.text(195, 40, this.score, { font: '75px Courier', fill: '#ffede4' });
        this.add.sprite(500, 75, 'money').setScale(0.15, 0.15);
        this.money = this.add.text(450, 53, this.players_money, { font: '60px Courier', fill: '#ffede4' });
        this.add.sprite(825, 75, 'saving').setScale(0.15, 0.15);
        this.saving = this.add.text(825, 53, this.players_saving, { font: '50px Courier', fill: '#ffede4' });
        this.add.sprite(1150, 75, 'debt').setScale(0.15, 0.15);
        this.debt = this.add.text(1125, 53, this.players_debt, { font: '50px Courier', fill: '#ffede4' });
        this.month_view = this.add.sprite(1500, 75, 'month'+this.month).setScale(0.15, 0.15);

        let cell = new Cell(this);
        this.cells.push(cell);
        cell.render(innerWidth/12, innerHeight/3.5, this.cells_description[0]);
        cell.img.description = 'start';
        for (let i = 0; i < 4; i++){
            let tmp = new Cell(this);
            this.cells.push(tmp);
            tmp.render(cell.x+cell.width, cell.y, this.cells_description[i+1]);
            cell = tmp;
        } 
        for (let i = 0; i < 3; i++){
            let tmp = new Cell(this);
            this.cells.push(tmp);
            tmp.render(cell.x, cell.y+cell.height, this.cells_description[i+5]);
            cell = tmp;
        }
        for (let i = 0; i < 4; i++){
            let tmp = new Cell(this);
            this.cells.push(tmp);
            tmp.render(cell.x-cell.width, cell.y, this.cells_description[i+8]);
            cell = tmp;
        }
        cell.img.description = 'end';
        this.cells[this.active_cell].img.setTint(0xffffff);
        this.cells[this.active_cell].img.active = true;
        stat.lvl2_active_cell = this.cells_description[this.active_cell];
        var borrow = this.add.sprite(innerWidth/12, innerHeight*0.58, 'bomb').setScale(0.17, 0.17).setInteractive();
        var save = this.add.sprite(innerWidth/12+cell.width, innerHeight*0.58, 'moneybox').setScale(0.17, 0.17).setInteractive();
        
        borrow.on('pointerdown', function() {
            this.scene.launch('Borrow', {par:this.scene});
            this.scene.pause();
        }, this);

        save.on('pointerdown', function() {
            this.scene.launch('Save', {par:this.scene});
            this.scene.pause();
        }, this);

        this.complete.on('pointerdown', function() {
            if (this.active_cell === null){
                console.log('cool');
                stat.lvl2_score = this.score;
                this.scene.start("mainMenu");
            }
        }, this);

        this.scene.launch('Description', {par:this.scene});
        this.scene.pause();
    }

    update() {
        if (this.active_cell !== null && this.opened === false){
            var tmp = this.cells[this.active_cell].img;
            this.createWindow(tmp.type, tmp.description);
        }
    }

    createWindow(type, description){
        this.opened = true;
        if (description === 'end'){
            if (this.month < 3){
                this.players_saving += this.players_money;
                this.players_money = 0;
                this.money.setText(this.players_money);
                this.saving.setText(this.players_saving);
                this.scene.launch('MonthEnd', {par:this.scene});
            }
            else{
                this.scene.launch('LevelFinish', {par:this.scene});
            }
            this.scene.pause();
        }
        else if (description === 'start'){
            this.scene.launch('Description', {par:this.scene});
            this.scene.pause();
        }
        else if (type === 'random'){
            description = description + ' ' + getRandomInt(this.random_windows[description].length);
            stat.lvl2_active_cell = description;
            this.scene.launch('RandomWindow', {par:this.scene, type: type, description: description});
        }
        else{
            stat.lvl2_active_cell = description;
            this.scene.launch('Window', {par:this.scene, type: type, description: description});
            this.scene.pause();
        }
    }
}