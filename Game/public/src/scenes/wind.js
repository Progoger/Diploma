let clicked = false;

export default class Wind extends Phaser.Scene {
    constructor() {
        super({
            key: 'Wind'
        });
    }

    preload() {
        this.load.image('bg', 'src/assets/windows/public_utilities/bg.png');
        this.load.image('pay', 'src/assets/windows/pay.png');
        this.load.image('input', 'src/assets/windows/input.png');
        this.load.image('help', 'src/assets/windows/help.png');
        this.load.image('hint', 'src/assets/windows/hint.png');
    }

    create(data) {
        this.parent = data.par.scene;
        var bg = this.add.image(innerWidth/3, innerHeight/10, 'bg').setScale(0.7, 0.7).setOrigin(0);
        console.log(this.parent);
        this.cameras.main.setViewport(0, 0, innerWidth, innerHeight);
        var input = this.add.image(bg.x+bg.width*0.285, bg.y+bg.height*0.51, 'input').setScale(0.2, 0.2);
        var textEntry = this.add.text(bg.x+bg.width*0.08, bg.y+bg.height*0.485, '', { font: '58px Courier', fill: '#ffff00' });
        var help = this.add.image(bg.x+bg.width*0.6, bg.y+bg.height*0.51, 'help').setInteractive().setScale(0.08, 0.08);
        var hint = this.add.image(bg.x+bg.width*0.87, bg.y+bg.height*0.435, 'hint').setScale(0, 0);
        var pay =  this.add.image(bg.x+bg.width*0.35, bg.y+bg.height*0.615, 'pay').setInteractive().setScale(0.2, 0.2);
        
        pay.on('pointerdown', function() {
            console.log(textEntry.text);
            let par = data.par.scene;
            console.log(par);
            par.cells[par.active_cell].img.active = false;
            par.cells[par.active_cell].img.setTint(0x696969);
            par.active_cell += 1;
            if (par.cells.length === par.active_cell){
                par.active_cell = 0;
                if (par.month < 3){
                    par.month_view.destroy();
                    par.month += 1;
                    par.month_view = par.add.sprite(1150, 75, 'month'+par.month).setScale(0.15, 0.15);
                }
                else{
                    par.active_cell = null;
                }
            }
            console.log(par.active_cell);
            if (par.active_cell != null){
                par.cells[par.active_cell].img.active = true;
                par.cells[par.active_cell].img.setTint(0xffffff);
            }
            par.scene.stop("Wind");
            par.scene.resume();
        });

        help.on('pointerdown', function (event) {
            if (clicked === false){
                hint.setScale(0.2, 0.2);
                clicked = true;
            }
            else{
                hint.setScale(0, 0);
                clicked = false;
            }
        }, this);

        this.input.keyboard.on('keydown', function (event) {
            if (event.keyCode === 8 && textEntry.text.length > 0)
            {
                var tmp = textEntry.text.substr(0, textEntry.text.length - 1);
                textEntry.setText(tmp);
            }
            else if (event.keyCode >= 48 && event.keyCode < 58)
            {
                textEntry.setText(textEntry.text+event.key);
            }

        });
    }

    update() {
        
    }
}