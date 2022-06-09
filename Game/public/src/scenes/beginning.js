import {stat, stat_record} from '../helpers/statistics.js';

export default class Beginning extends Phaser.Scene {
    constructor() {
        super({
            key: 'Beginning'
        });

        if (innerWidth/stat.common_width < innerHeight/stat.common_height){
            stat.koeff = innerWidth/stat.common_width;
        }
        else{
            stat.koeff = innerHeight/stat.common_height;
        };
        stat.koeffX = innerWidth/stat.common_width;
        stat.koeffY = innerHeight/stat.common_height;
    }

    preload() {
        this.load.video('beginning', 'src/assets/videos/beginning.mp4', `canplaythrough`, true, false);
        this.load.video('end', 'src/assets/videos/end.mp4', `canplaythrough`, false, false);
    }

    create(data) {
        if (data.video)
        {
            this.video = this.add.video(innerWidth/2, innerHeight/2, data.video).setScale(1*stat.koeffX, 0.866*stat.koeffY);
        }
        else{    
        this.video = this.add.video(innerWidth/2, innerHeight/2, 'beginning').setScale(1*stat.koeffX, 0.866*stat.koeffY);
        };
        this.video.setPaused(false);
        this.video.play(true);
        this.input.on('pointerdown', function(pointer){
            this.scene.start('mainMenu');
        }, this);

        this.input.keyboard.on('keydown', function (event) {
            if (event.keyCode === 27){
                this.scene.start('mainMenu');
            }
            else if(event.keyCode === 32){
                this.video.setPaused(false);
            };

        }, this);
    }

    update() {
        if (Math.abs(this.video.getCurrentTime() - this.video.getDuration()) < 0.05){
            this.scene.start('mainMenu');
            
        };
    }

}