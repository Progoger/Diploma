import { stat } from "../helpers/statistics.js";

let clicked = false;

export default class RandomWindow extends Phaser.Scene{
    constructor()
    {
        super({
            key: 'RandomWindow'
        });
    }

    preload() {
        var active = stat.lvl2_active_cell.split(' ');
        this.load.image('bg', `src/assets/level2/${active[0]}/bg.png`);
        this.load.image('text', `src/assets/level2/${active[0]}/${active[1]}.png`);
        if (active[0] !== 'sidejob'){
            this.load.image('pay', `src/assets/level2/${active[0]}/pay.png`);
            this.load.image('np', `src/assets/level2/${active[0]}/dontpay.png`);
            this.load.image('pay1', `src/assets/level2/${active[0]}/pay1.png`);
        }
        else{
            this.load.image('work', `src/assets/level2/${active[0]}/work.png`);
            this.load.image('nw', `src/assets/level2/${active[0]}/nw.png`);
        }
        this.load.image('cross', 'src/assets/common/cross.png');
    }

    create(data) {
        let cell = data.description.split(' ');
        data.par.scene.paused = false;
        var bg = this.add.image(innerWidth/3, innerHeight/12, 'bg').setScale(0.34, 0.34).setOrigin(0);
        this.cameras.main.setViewport(0, 0, innerWidth, innerHeight);
        if (cell[0] === 'expense'){
            this.add.image(bg.x+bg.width*0.34*0.08, bg.y+bg.height*0.34*0.3, 'text').setScale(0.33, 0.33).setOrigin(0);
        }
        else{
            this.add.image(bg.x+bg.width*0.34*0.08, bg.y+bg.height*0.34*0.2, 'text').setScale(0.33, 0.33).setOrigin(0);  
        };
        if (cell[0] !== 'sidejob'){
            var pay = this.add.image(bg.x+bg.width*0.34*0.42, bg.y+bg.height*0.34*0.64, 'pay').setScale(0.22, 0.22).setInteractive();
            var pay1 = this.add.image(bg.x+bg.width*0.34*0.42, bg.y+bg.height*0.34*0.765, 'pay1').setScale(0.22, 0.22).setInteractive();
            var np = this.add.image(bg.x+bg.width*0.34*0.42, bg.y+bg.height*0.34*0.89, 'np').setScale(0.22, 0.22).setInteractive();
        
            pay.on('pointerdown', function() {
                let par = data.par.scene;
                if (par.players_money >= par.random_windows[cell[0]][cell[1]])
                {
                    par.players_money -= par.random_windows[cell[0]][cell[1]];
                    par.score += 1;
                    par.money.setText(par.players_money);
                    par.score_txt.setText(par.score);
                    
                    par.cells[par.active_cell].img.active = false;
                    par.cells[par.active_cell].img.setTint(0x696969);
                    par.active_cell++;
                    par.cells[par.active_cell].img.active = true;
                    par.cells[par.active_cell].img.setTint(0xffffff);

                    par.opened = false;
                    par.scene.stop("RandomWindow");
                    par.scene.resume();
                }
            }, this);

            pay1.on('pointerdown', function() {
                let par = data.par.scene;
                let cell = data.description.split(' ');
                if (par.players_saving >= par.random_windows[cell[0]][cell[1]])
                {
                    par.players_saving -= par.random_windows[cell[0]][cell[1]];
                    par.score += 1;
                    par.saving.setText(par.players_saving);
                    par.score_txt.setText(par.score);
                    
                    par.cells[par.active_cell].img.active = false;
                    par.cells[par.active_cell].img.setTint(0x696969);
                    par.active_cell++;
                    par.cells[par.active_cell].img.active = true;
                    par.cells[par.active_cell].img.setTint(0xffffff);
                    
                    par.opened = false;
                    par.scene.stop("RandomWindow");
                    par.scene.resume();
                }
            }, this);

            np.on('pointerdown', function() {
                let par = data.par.scene;
                let cell = data.description.split(' ');
                par.players_debt += par.random_windows[cell[0]][cell[1]];
                par.debt.setText(par.players_debt);
                
                par.cells[par.active_cell].img.active = false;
                par.cells[par.active_cell].img.setTint(0x696969);
                par.active_cell++;
                par.cells[par.active_cell].img.active = true;
                par.cells[par.active_cell].img.setTint(0xffffff);

                par.opened = false;
                par.scene.stop("RandomWindow");
                par.scene.resume();
            }, this);
        }
        else{
            var work = this.add.image(bg.x+bg.width*0.34*0.42, bg.y+bg.height*0.34*0.65, 'work').setScale(0.35, 0.35).setInteractive();
            var nw = this.add.image(bg.x+bg.width*0.34*0.5, bg.y+bg.height*0.34*0.85, 'nw').setScale(0.34, 0.34).setInteractive();
            
            work.on('pointerdown', function() {
                let par = data.par.scene;
                let cell = data.description.split(' ');
                par.players_money += par.random_windows[cell[0]][cell[1]];
                par.money.setText(par.players_money);
                
                par.cells[par.active_cell].img.active = false;
                par.cells[par.active_cell].img.setTint(0x696969);
                par.active_cell++;
                par.cells[par.active_cell].img.active = true;
                par.cells[par.active_cell].img.setTint(0xffffff);

                par.opened = false;
                par.scene.stop("RandomWindow");
                par.scene.resume();
            }, this);

            nw.on('pointerdown', function() {
                let par = data.par.scene;
                let cell = data.description.split(' ');
                
                par.cells[par.active_cell].img.active = false;
                par.cells[par.active_cell].img.setTint(0x696969);
                par.active_cell++;
                par.cells[par.active_cell].img.active = true;
                par.cells[par.active_cell].img.setTint(0xffffff);

                par.opened = false;
                par.scene.stop("RandomWindow");
                par.scene.resume();
            }, this);
        };

    }

    update() {
        
    }

}