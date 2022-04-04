import Card from '../helpers/card.js';
import Zone from '../helpers/zone.js';

let score = 0;

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
        this.score = 0;
    }

    preload() {
        this.load.image('backGround', 'src/assets/2.png');
        this.load.image('income_card', 'src/assets/income_card.png');
        this.load.image('expense_card', 'src/assets/income_card.png');
        this.load.image('income', 'src/assets/income.png');
        this.load.image('expense', 'src/assets/expense.png');
    }

    create() {
        let self = this;

        this.dealCards = (x, y, interval, sprite) => {
            for (let i = 0; i < 10; i++) {
                let card = new Card(this, "income");
                card.render(x + (i*interval), y, sprite);
                console.log(card.card_type);
            }
        };

        self.dealCards(100, 100, 140, "income_card");
        self.dealCards(100, 300, 140, "expense_card");

        let income = new Zone(this, "income");
        income.renderZone(100, 580, "income");
    
        let expense = new Zone(this, "expense");
        expense.renderZone(1400, 580, "expense");

        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragstart', function (pointer, gameObject) {

            this.children.bringToTop(gameObject);
    
        }, this);

        this.input.on('dragenter', function (pointer, gameObject, dropZone) {
            console.log(gameObject);
            dropZone.setTint(0x00ff00);
        });
    
        this.input.on('dragleave', function (pointer, gameObject, dropZone) {
            dropZone.clearTint();
        });
    
        this.input.on('drop', function (pointer, gameObject, dropZone) {
    
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
            gameObject.setScale(0.01);
    
            gameObject.input.enabled = false;
    
            if (dropZone.texture.key === gameObject.texture.key.split('_')[0]){
                score += 1;
            }
            console.log(score);
            console.log(dropZone.texture.key);
            console.log(gameObject.texture.key);
            dropZone.clearTint();
    
        });
    
        this.input.on('dragend', function (pointer, gameObject, dropped) {
    
            if (!dropped)
            {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
    
        });
    }

    update() {

    }
}