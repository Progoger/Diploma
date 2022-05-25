export default class Button {
    constructor(scene) {
        this.render = (x, y, description) => {
            this.img = scene.add.image(x, y, description).setInteractive().setScale(0.17, 0.17);
            this.width = this.img.width*0.2;
            this.height = this.img.height*0.2;
            this.x = x;
            this.y = y;
            this.bought = false;
            this.img.on('pointerdown', function() {
                console.log(this.bought);
                if (this.bought === false){
                    scene.createWindow(description);
                }
            }, this);
            return this.img;
        }
        
    }

}