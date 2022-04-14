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
        this.load.image('bg', 'src/assets/level2/cell.png');
        this.load.image('pay', 'src/assets/mainMenu/settings.png');
    }

    create () {
        var bg = this.add.image(0, 0, 'bg').setOrigin(0);
        this.cameras.main.setViewport(this.parent.x, this.parent.y, innerWidth/2, innerHeight/2);
        textEntry = this.add.text(0, 0, 'Hello World', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#FF9500'});
        this.add.text(0, 50, 'Exercise', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: '#FF9900'});
        var textEntry = this.add.text(0, 100, '', { font: '32px Courier', fill: '#ffff00' });
        var pay =  this.add.image(170, 170, 'pay').setInteractive().setScale(0.05, 0.05);
        pay.lvl2 = this.lvl2;
        pay.win_i = this.win_i;
        pay.on('pointerdown', function() {
            console.log(textEntry.text);
            console.log(this.win_i);
            this.lvl2.scene.stop("Window"+this.win_i);
        })
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