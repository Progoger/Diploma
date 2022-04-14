export default class Cell {
    constructor(scene) {
        this.render = (x, y, sprite) => {
            let cell = scene.add.image(x, y, sprite).setInteractive().setScale(0.8, 0.8);
            cell.on('pointerdown', function () {
                scene.createWindow();
            });
            this.width = cell.width*0.8;
            this.height = cell.height*0.8;
            this.x = x;
            this.y = y;
            return cell;
        }
    }

}