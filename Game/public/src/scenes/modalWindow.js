let clicked = false;

export default class Window extends Phaser.Scene{
    constructor(handle, parent, lvl2, win_i, x, y)
    {
        super(handle);
        this.parent = parent;
        this.x = x;
        this.y = y;
        this.lvl2 = lvl2;
        this.win_i = win_i;
    }

    preload() {
        this.load.image('bg', 'src/assets/windows/public_utilities/bg.png');
        this.load.image('pay', 'src/assets/windows/pay.png');
        this.load.image('input', 'src/assets/windows/input.png');
        this.load.image('help', 'src/assets/windows/help.png');
        this.load.image('hint', 'src/assets/windows/hint.png');
    }

    create () {
        var bg = this.add.image(0, 0, 'bg').setScale(0.7, 0.7).setOrigin(0);
        this.cameras.main.setViewport(this.parent.x, this.parent.y, innerWidth, innerHeight);
        var input = this.add.image(innerWidth*1.2/10, innerHeight*5.85/10, 'input').setScale(0.2, 0.2);
        var textEntry = this.add.text(innerWidth/32, innerHeight*5.65/10, '', { font: '32px Courier', fill: '#ffff00' });
        var help = this.add.image(innerWidth*2.55/10, innerHeight*5.85/10, 'help').setInteractive().setScale(0.08, 0.08);
        var hint = this.add.image(innerWidth*3.75/10, innerHeight*5.2/10, 'hint').setScale(0, 0);
        var pay =  this.add.image(innerWidth*1.5/10, innerHeight*7/10, 'pay').setInteractive().setScale(0.2, 0.2);
        pay.lvl2 = this.lvl2;
        pay.win_i = this.win_i;
        pay.on('pointerdown', function() {
            console.log(textEntry.text);
            let par = this.lvl2.scene.scene;
            console.log(par);
            par.cells[par.active_cell].img.active = false;
            par.cells[par.active_cell].img.setTint(0x696969);
            par.active_cell += 1;
            par.cells[par.active_cell].img.active = true;
            par.cells[par.active_cell].img.setTint(0xffffff);
            this.lvl2.scene.remove("Window"+this.win_i);
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

}