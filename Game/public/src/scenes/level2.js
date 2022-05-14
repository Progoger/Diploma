import Cell from '../helpers/cell.js';
import { stat_record, stat } from '../helpers/statistics.js';

export default class Level2 extends Phaser.Scene {
    
    constructor() {
        super({
            key: 'Level2'
        });
        this.win_i = 0;
        this.active_cell = 0;
        this.cells_img = [
            'cell', 
            'public_utilities', 
            'internet', 
            'products', 
            'question', 
            'transport',
            'cell',
            'question',
            'pharmacy',
            'clothes',
            'question',
            'cell'
        ];
        this.cells = [];
        this.month = 1;
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
        this.load.image('money', 'src/assets/level2/money.png');
        this.load.image('score_bomb', 'src/assets/level2/score_bomb.png');
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
        this.add.sprite(innerWidth-75, innerHeight-75, 'complete').setScale(0.09, 0.09);
        this.add.sprite(innerWidth-75, innerHeight/2-130, 'help').setScale(0.09, 0.09);
        this.add.sprite(innerWidth-75, innerHeight/2-20, 'progress').setScale(0.09, 0.09);
        this.add.sprite(innerWidth-75, innerHeight/2+90, 'statistics').setScale(0.09, 0.09);
        this.add.sprite(innerWidth-75, innerHeight/2+200, 'character').setScale(0.09, 0.09);
        this.add.sprite(175, 75, 'score').setScale(0.15, 0.15);
        this.add.sprite(500, 75, 'money').setScale(0.15, 0.15);
        this.add.sprite(825, 75, 'score_bomb').setScale(0.15, 0.15);
        this.month_view = this.add.sprite(1150, 75, 'month'+this.month).setScale(0.15, 0.15);

        let cell = new Cell(this);
        this.cells.push(cell);
        cell.render(innerWidth/12, innerHeight/3.5, this.cells_img[0]);
        for (let i = 0; i < 4; i++){
            let tmp = new Cell(this);
            this.cells.push(tmp);
            tmp.render(cell.x+cell.width, cell.y, this.cells_img[i+1]);
            cell = tmp;
        } 
        for (let i = 0; i < 3; i++){
            let tmp = new Cell(this);
            this.cells.push(tmp);
            tmp.render(cell.x, cell.y+cell.height, this.cells_img[i+5]);
            cell = tmp;
        }
        for (let i = 0; i < 4; i++){
            let tmp = new Cell(this);
            this.cells.push(tmp);
            tmp.render(cell.x-cell.width, cell.y, this.cells_img[i+8]);
            cell = tmp;
        }
        this.cells[this.active_cell].img.setTint(0xffffff);
        this.cells[this.active_cell].img.active = true;
        this.add.sprite(innerWidth/12, innerHeight*0.58, 'bomb').setScale(0.17, 0.17);
        this.add.sprite(innerWidth/12+cell.width, innerHeight*0.58, 'moneybox').setScale(0.17, 0.17);
    }

    update() {
        
    }

    createWindow(){
        let sc = this.scene.start('Window', {par:this.scene});
        this.scene.pause();
    }
}