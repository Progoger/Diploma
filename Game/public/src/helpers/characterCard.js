export default class characterCard {
    constructor(scene) {
        this.render = (x, y, sprite, index) => {
            this.img = scene.add.image(x, y, sprite).setScale(0.3, 0.3).setInteractive();
            this.index = index;
            this.img.on('pointerdown', function (event) {
                if (this.index === scene.activeChar){
                    this.img.setScale(0.3, 0.3);
                    scene.activeChar = null;
                }
                else{
                    this.img.setScale(0.35, 0.35);
                    if (scene.activeChar !== null){
                        scene.characters[scene.activeChar].img.setScale(0.3, 0.3);
                    }
                    scene.activeChar = this.index;
                }
            }, this);
            return this.img;
        }
    }
}