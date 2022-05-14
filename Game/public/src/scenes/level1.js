import Card from '../helpers/card.js';
import Zone from '../helpers/zone.js';
import { getRandomInt } from '../helpers/functions.js';'../helpers/functions.js';
import { stat_record, stat } from '../helpers/statistics.js';

export default class Level1 extends Phaser.Scene {
    
    constructor() {
        super({
            key: 'Level1'
        });

        this.len = 19;
    }

    preload() {
        this.load.image('bg', 'src/assets/common/bg.png');
        this.load.image('complete', 'src/assets/common/complete.png');
        this.load.image('help', 'src/assets/common/help.png');
        this.load.image('progress', 'src/assets/common/progress.png');
        this.load.image('statistics', 'src/assets/common/statistics.png');
        this.load.image('score', 'src/assets/common/score.png');
        this.load.image('expense_0', 'src/assets/level1/expense0.png');
        this.load.image('expense_1', 'src/assets/level1/expense1.png');
        this.load.image('expense_2', 'src/assets/level1/expense2.png');
        this.load.image('expense_3', 'src/assets/level1/expense3.png');
        this.load.image('expense_4', 'src/assets/level1/expense4.png');
        this.load.image('expense_5', 'src/assets/level1/expense5.png');
        this.load.image('expense_6', 'src/assets/level1/expense6.png');
        this.load.image('expense_7', 'src/assets/level1/expense7.png');
        this.load.image('expense_8', 'src/assets/level1/expense8.png');
        this.load.image('expense_9', 'src/assets/level1/expense9.png');
        this.load.image('income_0', 'src/assets/level1/income0.png');
        this.load.image('income_1', 'src/assets/level1/income1.png');
        this.load.image('income_2', 'src/assets/level1/income2.png');
        this.load.image('income_3', 'src/assets/level1/income3.png');
        this.load.image('income_4', 'src/assets/level1/income4.png');
        this.load.image('income_5', 'src/assets/level1/income5.png');
        this.load.image('income_6', 'src/assets/level1/income6.png');
        this.load.image('income_7', 'src/assets/level1/income7.png');
        this.load.image('income_8', 'src/assets/level1/income8.png');
        this.load.image('income_9', 'src/assets/level1/income9.png');
        this.load.image('income', 'src/assets/level1/income.png');
        this.load.image('expense', 'src/assets/level1/expense.png');
        this.load.image('avatar', `src/assets/appereance/${stat.gender}/${stat.character.split('_')[0]}/${stat.character}.png`);
    }

    create() {
        this.score = 0;

        this.cards = new Array(
            'income_0',
            'income_1',
            'income_2',
            'income_3',
            'income_4',
            'income_5',
            'income_6',
            'income_7',
            'income_8',
            'income_9',
            'expense_0',
            'expense_1',
            'expense_2',
            'expense_3',
            'expense_4',
            'expense_5',
            'expense_6',
            'expense_7',
            'expense_8',
            'expense_9'
        )
        
        this.add.sprite(innerWidth/2, innerHeight/2, 'bg').setScale(1, 0.866);
        this.add.image(innerWidth*0.945, innerHeight*0.15, 'avatar').setScale(0.2, 0.2);
        var complete = this.add.sprite(innerWidth-75, innerHeight-75, 'complete').setInteractive().setScale(0.1, 0.1);
        this.add.sprite(innerWidth-75, innerHeight/2-135, 'help').setScale(0.1, 0.1);
        this.add.sprite(innerWidth-75, innerHeight/2, 'progress').setScale(0.1, 0.1);
        this.add.sprite(innerWidth-75, innerHeight/2+135, 'statistics').setScale(0.1, 0.1);
        this.add.sprite(175, 75, 'score').setScale(0.15, 0.15);
        console.log(this);
        var textEntry = this.add.text(220, 40, this.score, { font: '75px Courier', fill: '#ffede4' });

        let index = getRandomInt(this.len);
        let card = new Card(this, this.cards[index].split('_')[0]);
        card.render(175, innerHeight/2, this.cards[index]);
        this.cards.splice(index, 1);
        index = getRandomInt(this.len-1);
        card = new Card(this, this.cards[index].split('_')[0]);
        card.render(175+252*1.15, innerHeight/2, this.cards[index]);
        this.cards.splice(index, 1);

        this.dealCards = (x, y, interval, a, n) => {
            for (let i = a; i < n; i++) {
                index = getRandomInt(this.len-i-2);
                card = new Card(this, this.cards[index].split('_')[0]);
                card.render(x - ((i+1)*interval), y, this.cards[index]);
                this.cards.splice(index, 1);
            }
        };

        this.dealCards(innerWidth-378, innerHeight/2, 252*0.15, 0, 17);

        card = new Card(this, this.cards[0].split('_')[0]);
        card.render(175+252*2.3, innerHeight/2, this.cards[0]);
        this.cards.splice(0, 1);

        let income = new Zone(this, "income");
        income.renderZone(innerWidth*7/10, innerHeight*0.95, "income");
    
        let expense = new Zone(this, "expense");
        expense.renderZone(200, innerHeight*9/10, "expense");

        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragstart', function (pointer, gameObject) {

            this.children.bringToTop(gameObject);
    
        }, this);

        this.input.on('dragenter', function (pointer, gameObject, dropZone) {
            dropZone.setTint(0x00ff00);
        });
    
        this.input.on('dragleave', function (pointer, gameObject, dropZone) {
            dropZone.clearTint();
        });
    
        this.input.on('drop', function (pointer, gameObject, dropZone) {
    
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
            gameObject.setScale(0);
    
            gameObject.input.enabled = false;
    
            if (dropZone.texture.key === gameObject.texture.key.split('_')[0]){
                console.log(this);
                this.scene.score += 1;
                textEntry.setText(this.scene.score);
            }
            dropZone.clearTint();
    
        });
    
        this.input.on('dragend', function (pointer, gameObject, dropped) {
    
            if (!dropped)
            {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        });

        complete.on('pointerdown', function(event) {
            if (stat.lvl1_completed == false && this.score > 14){
                stat.lvl1_completed = true;
            }
            stat.lvl1_score = this.score;
            this.scene.start("mainMenu");
        }, this)
    }

    update() {

    }

}