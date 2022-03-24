export default class Zone {
    constructor(scene, type) {
        this.renderZone = (x, y, sprite) => {
            let dropZone = scene.add.image(x, y, sprite).setInteractive();
            this.type = type;
            dropZone.input.dropZone = true;
            return dropZone;
        }
    }
}