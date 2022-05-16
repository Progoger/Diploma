export default class Cell {
    constructor(scene) {
        this.render = (x, y, description) => {
            if (description.split(' ').length == 1){
                this.img = scene.add.image(x, y, description).setInteractive().setScale(0.17, 0.17);
                if (description == 'cell'){
                    this.img.type = 'startend';
                }
                else{
                    this.img.type = 'range';
                };
                this.img.description = description;
            }
            else{
                console.log(description.split(' '));
                this.img = scene.add.image(x, y, description.split(' ')[0]).setInteractive().setScale(0.17, 0.17);
                this.img.type = 'random';
                this.img.description = description.split(' ')[1];
            };
            this.img.active = false;  
            this.img.setTint(0x696969);
            this.img.on('pointerdown', function () {
                console.log(this);
                if (this.active){
                    scene.createWindow(this.type, this.description);
                };
            });
            this.width = this.img.width*0.17;
            this.height = this.img.height*0.17;
            this.x = x;
            this.y = y;
            return this.img;
        }
    }

}