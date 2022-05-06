export default class Cell {
    constructor(scene) {
        this.render = (x, y, sprite) => {
            this.img = scene.add.image(x, y, sprite).setInteractive().setScale(0.17, 0.17);
            this.img.active = false;  
            this.img.setTint(0x696969);
            this.img.on('pointerdown', function () {
                if (this.active){
                    scene.createWindow();
                }
                console.log(this);
            });
            this.width = this.img.width*0.17;
            this.height = this.img.height*0.17;
            this.x = x;
            this.y = y;
            return this.img;
        }
    }

}