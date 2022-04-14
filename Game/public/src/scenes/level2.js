import Cell from '../helpers/cell.js';
import Window from '../scenes/modalWindow.js';

export default class Level2 extends Phaser.Scene {
    
    constructor() {
        super({
            key: 'Level2'
        });
        this.win_i = 0;
    }

    preload() {
        
        this.load.image('bg', 'src/assets/common/bg.png');
        this.load.image('cell', 'src/assets/level2/cell.png');  
    }

    create() {
        this.add.sprite(innerWidth/2, innerHeight/2, 'bg').setScale(1, 0.866);
        let cell = new Cell(this);
        cell.render(innerWidth/12, innerHeight/5, 'cell');
        for (let i = 0; i < 4; i++){
            let tmp = new Cell(this);
            tmp.render(cell.x+cell.width, cell.y, 'cell');
            cell = tmp;
        } 
        for (let i = 0; i < 3; i++){
            let tmp = new Cell(this);
            tmp.render(cell.x, cell.y+cell.height, 'cell');
            cell = tmp;
        }
        for (let i = 0; i < 4; i++){
            let tmp = new Cell(this);
            tmp.render(cell.x-cell.width, cell.y, 'cell');
            cell = tmp;
        }
    }

    update() {
        
    }

    createWindow()
    {
        var x = Phaser.Math.Between(400, 600);
        var y = Phaser.Math.Between(64, 128);

        var handle = 'Window'+this.win_i;

        var win = this.add.zone(innerWidth/3, innerHeight/3, innerWidth*2/3, innerHeight*2/3).setInteractive().setOrigin(0);

        var demo = new Window(handle, win, this, this.win_i, 0, 0);

        this.scene.add(handle, demo, true);

        this.win_i += 1;
    }
    
}