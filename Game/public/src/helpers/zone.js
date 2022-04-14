export default class Zone {
    constructor(scene, zone_type) {
        this.zone_type = zone_type;

        this.renderZone = (x, y, sprite) => {
            let dropZone = scene.add.image(x, y, sprite).setInteractive().setScale(0.1, 0.1);
            dropZone.input.dropZone = true;
            return dropZone;
        }
    }
}