let clicked = false;
import {stat} from '../helpers/statistics.js';

export default class levelChoice extends Phaser.Scene {
    constructor() {
        super({
            key: 'levelChoice'
        });
    }

    preload() {
        this.load.image('bg', 'src/assets/common/bg.png');
        this.load.image('character', 'src/assets/levelChoice/character.png');
        this.load.image('block', 'src/assets/levelChoice/block.png');
        this.load.image('level1', 'src/assets/levelChoice/level1.png');
        this.load.image('level2', 'src/assets/levelChoice/level2.png');
        this.load.image('level3', 'src/assets/levelChoice/level3.png');
        this.load.image('help', 'src/assets/levelChoice/help.png');
        this.load.image('hint', 'src/assets/levelChoice/hint.png');
    }

    create() {
        let self = this;
        this.add.sprite(innerWidth/2, innerHeight/2, 'bg').setScale(1, 0.866);
        var character = this.add.image(innerWidth/2, innerHeight/5, 'character').setScale(0.25, 0.25).setInteractive();
        var help = this.add.image(innerWidth*2/3, innerHeight/5, 'help').setScale(0.1, 0.1).setInteractive();
        var hint = this.add.image(innerWidth*3/4, innerHeight/5, 'hint').setScale(0, 0);
        if (stat.character_chosed){
            var level1 = this.add.image(innerWidth/2, innerHeight/5*2, 'level1').setScale(0.25, 0.25).setInteractive();
            
            level1.on('pointerdown', function (event) {
                this.scene.launch("Rule", {description: '2', sc:'Level1', par: this.scene});
            }, this);
        }
        else{
            this.add.image(innerWidth/2, innerHeight/5*2, 'block').setScale(0.25, 0.25).setInteractive();
        }
        if (stat.lvl1_completed || true) {
            var level2 = this.add.image(innerWidth/2, innerHeight/5*3, 'level2').setScale(0.25, 0.25).setInteractive();
            
            level2.on('pointerdown', function (event) {
                this.scene.launch("Rule", {description: '5', sc:'Level2', par: this.scene});
            }, this);
        }
        else{
            this.add.image(innerWidth/2, innerHeight/5*3, 'block').setScale(0.25, 0.25).setInteractive();
        }

        if (stat.lvl2_completed || true) {
            var level3 = this.add.image(innerWidth/2, innerHeight/5*4, 'level3').setScale(0.25, 0.25).setInteractive();
            
            level3.on('pointerdown', function (event) {
                this.scene.launch("Rule", {description: '5', sc:'Level3', par: this.scene});
            }, this);
        }
        else{
            this.add.image(innerWidth/2, innerHeight/5*4, 'block').setScale(0.25, 0.25).setInteractive();
        }

        help.on('pointerdown', function (event) {
            if (clicked === false){
                hint.setScale(0.1, 0.1);
                clicked = true;
            }
            else{
                hint.setScale(0, 0);
                clicked = false;
            }
        }, this);

        character.on('pointerdown', function (event) {
            this.scene.launch("Rule", {sc:'characterChoice', par: this.scene});
        }, this);
    }

    update() {

    }

}