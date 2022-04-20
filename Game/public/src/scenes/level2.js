import Cell from '../helpers/cell.js';
import Window from '../scenes/modalWindow.js';

export default class Level2 extends Phaser.Scene {
    
    constructor() {
        super({
            key: 'Level2'
        });
        this.win_i = 0;
        this.cells = [
            'cell', 
            'public_utilities', 
            'internet', 
            'products', 
            'question', 
            'transport',
            'cell',
            'question',
            'pharmacy',
            'cell',
            'question',
            'cell'
        ]
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
        this.load.image('question', 'src/assets/level2/question.png');
        this.load.image('transport', 'src/assets/level2/transport.png');
        this.load.image('complete', 'src/assets/common/complete.png');
        this.load.image('help', 'src/assets/common/help.png');
        this.load.image('progress', 'src/assets/common/progress.png');
        this.load.image('statistics', 'src/assets/common/statistics.png');
        this.load.image('score', 'src/assets/common/score.png');
    }

    create() {
        this.add.sprite(innerWidth/2, innerHeight/2, 'bg').setScale(1, 0.866);
        this.add.sprite(innerWidth/2, innerHeight/2, 'bg').setScale(1, 0.866);
        this.add.sprite(innerWidth-75, innerHeight-75, 'complete').setScale(0.1, 0.1);
        this.add.sprite(innerWidth-75, innerHeight/2-135, 'help').setScale(0.1, 0.1);
        this.add.sprite(innerWidth-75, innerHeight/2, 'progress').setScale(0.1, 0.1);
        this.add.sprite(innerWidth-75, innerHeight/2+135, 'statistics').setScale(0.1, 0.1);
        this.add.sprite(175, 75, 'score').setScale(0.15, 0.15);

        let cell = new Cell(this);
        cell.render(innerWidth/12, innerHeight/3.5, this.cells[0]);
        for (let i = 0; i < 4; i++){
            let tmp = new Cell(this);
            tmp.render(cell.x+cell.width, cell.y, this.cells[i+1]);
            cell = tmp;
        } 
        for (let i = 0; i < 3; i++){
            let tmp = new Cell(this);
            tmp.render(cell.x, cell.y+cell.height, this.cells[i+5]);
            cell = tmp;
        }
        for (let i = 0; i < 4; i++){
            let tmp = new Cell(this);
            tmp.render(cell.x-cell.width, cell.y, this.cells[i+8]);
            cell = tmp;
        }
    }

    update() {
        
    }

    createWindow()
    {
        var handle = 'Window'+this.win_i;

        var win = this.add.zone(innerWidth/3, innerHeight/10, innerWidth*2/3, innerHeight/2).setInteractive();

        var demo = new Window(handle, win, this, this.win_i, 0, 0);

        this.scene.add(handle, demo, true);

        this.win_i += 1;
    }
    
}