import { stat } from "../helpers/statistics.js";

let clicked = false;

export default class Description extends Phaser.Scene{
    constructor()
    {
        super({
            key: 'Description'
        });
    }

    preload() {
        this.load.image('bg', `src/assets/descriptions/level21.png`);
        this.load.image('button', 'src/assets/descriptions/button.png');
    }

    create(data) {
        var bg = this.add.image(innerWidth*0.28, innerHeight/20, 'bg').setScale(0.44, 0.44).setOrigin(0);
        this.cameras.main.setViewport(0, 0, innerWidth, innerHeight);
        var get =  this.add.image(bg.x+bg.width*0.44*0.4, bg.y+bg.height*0.44*0.87, 'button').setInteractive().setScale(0.3, 0.3);
    
        get.on('pointerdown', function() {
            let par = data.par.scene;
            par.players_money += 20000;
            par.money.setText(par.players_money);

            par.cells[par.active_cell].img.active = false;
            par.cells[par.active_cell].img.setTint(0x696969);
            par.active_cell += 1;

            par.active_cell = 7;

            par.cells[par.active_cell].img.active = true;
            par.cells[par.active_cell].img.setTint(0xffffff);            
            par.opened = false;
            par.scene.stop("Description");
            par.scene.resume();
        });
    }

    update() {
        
    }

}