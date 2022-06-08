import {stat, stat_record} from '../helpers/statistics.js';

export default class Beginning extends Phaser.Scene {
    constructor() {
        super({
            key: 'Beginning'
        });
    }

    preload() {
        this.load.video('beginning', 'src/assets/videos/beginning.mp4', 'canplaythrough', false, true);
        this.load.video('end', 'src/assets/videos/end.mp4', 'canplaythrough', false, true);
    }

    create(data) {
        if (data.video)
        {
            this.video = this.add.video(innerWidth/2, innerHeight/2, data.video).setScale(0.8, 0.66);
        }
        else{    
        this.video = this.add.video(innerWidth/2, innerHeight/2, 'beginning').setScale(0.8, 0.66);
        };
        this.video.setPaused(false);
        this.video.play(true);

        this.input.keyboard.on('keydown', function (event) {
            if (event.keyCode === 27){
                this.scene.start('mainMenu');
            }

        }, this);
    }

    update() {
        if (Math.abs(this.video.getCurrentTime() - this.video.getDuration()) < 0.001){
            this.scene.start('mainMenu');
            
        };
    }

}