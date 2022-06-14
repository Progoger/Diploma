import {stat, stat_record} from '../helpers/statistics.js';

export default class Beginning extends Phaser.Scene {
    constructor() {
        super({
            key: 'Beginning'
        });
        stat.koeffX = innerWidth/stat.common_width;
        stat.koeffY = innerHeight/stat.common_height;

        if (stat.koeffX < stat.koeffY){
            stat.koeff = stat.koeffX;
        }
        else{
            stat.koeff = stat.koeffY;
        };
        
    }

    preload() {
        this.load.video('beginning', 'src/assets/videos/beginning.mp4', `canplaythrough`, true, false);
        this.load.video('end', 'src/assets/videos/end.mp4', `canplaythrough`, false, false);
    }

    create(data) {
        this.clicked = false;
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
            if (this.clicked === false){
                this.video.setPaused(false);
                this.clicked = true;
            }
            else{
                this.scene.start('mainMenu');
            }
        }, this);

        this.input.keyboard.on('keydown', function (event) {
            if (event.keyCode === 27){
                this.scene.start('mainMenu');
            }
            else if(event.keyCode === 32){
                this.video.setPaused(false);
                this.clicked = true;
            };

        }, this);
    }

    update() {
        if (Math.abs(this.video.getCurrentTime() - this.video.getDuration()) < 0.05){
            this.scene.start('mainMenu');
            
        };
    }

}