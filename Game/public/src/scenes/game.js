import Card from '../helpers/card.js';
import Zone from '../helpers/zone.js';

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        this.load.image('backGround', 'src/assets/2.png');
        this.load.image('card', 'src/assets/card.png');
        this.load.image('income', 'src/assets/income.png');
        this.load.image('expense', 'src/assets/expense.png');
    }

    create() {
        let self = this;

        this.dealCards = (x, y, interval) => {
            for (let i = 0; i < 10; i++) {
                let card = new Card(this, "income");
                card.render(x + (i*interval), y, "card");
                console.log(card.card_type);
            }
        };

        self.dealCards(100, 100, 160);
        self.dealCards(100, 300, 160);

        let income = new Zone(this, "income");
        income.renderZone(100, 773, "income");
    
        let expense = new Zone(this, "expense");
        expense.renderZone(1540, 773, "expense");

        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragstart', function (pointer, gameObject) {

            this.children.bringToTop(gameObject);
    
        }, this);

        this.input.on('dragenter', function (pointer, gameObject, dropZone) {
            if (dropZone.texture.key === "income"){
                dropZone.setTint(0x00ff00);
            }
            else{
                expense.setTint(0x00ff00);
            }
        });
    
        this.input.on('dragleave', function (pointer, gameObject, dropZone) {
            if (dropZone.texture.key === "income"){
                dropZone.clearTint();
            }
            else{
                expense.clearTint();
            }
        });
    
        this.input.on('drop', function (pointer, gameObject, dropZone) {
    
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
            gameObject.setScale(0.01);
    
            gameObject.input.enabled = false;
    
            if (dropZone.texture.key === "income"){
                dropZone.clearTint();
            }
            else{
                expense.clearTint();
            }
    
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