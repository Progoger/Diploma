import characterCard from '../helpers/characterCard.js';
import { stat_record, stat } from '../helpers/statistics.js';

export default class characterChoice extends Phaser.Scene {
    constructor() {
        super({
            key: 'characterChoice'
        });
        this.characters = [];
        this.activeChar = 0;
        this.appearence = [
            '_brown_brown',
            '_blue_blonde',
            '_green_ginger',
            '_grey_black',
            '_blue_brown'
        ];
    }

    preload() {
        this.load.image('bg', 'src/assets/common/bg.png');
        this.load.image('home', 'src/assets/common/home.png');
        this.load.image('complete', 'src/assets/common/complete.png');
        this.load.image('charCustom', 'src/assets/characterChoice/characterCustomization.png');
        this.load.image('girl1', 'src/assets/characterChoice/girl1.png');
        this.load.image('girl2', 'src/assets/characterChoice/girl2.png');
        this.load.image('girl3', 'src/assets/characterChoice/girl3.png');
        this.load.image('girl4', 'src/assets/characterChoice/girl4.png');
        this.load.image('girl5', 'src/assets/characterChoice/girl5.png');
        }

    create() {
        this.add.sprite(innerWidth/2, innerHeight/2, 'bg').setScale(1, 0.866);
        var home = this.add.image(innerWidth/23, innerHeight/12, 'home').setScale(0.1, 0.1).setInteractive();
        var complete = this.add.sprite(innerWidth-75, innerHeight-75, 'complete').setScale(0.1, 0.1).setInteractive();
        for (let i = 0; i < 5; i++){
            let tmp = new characterCard(this);
            this.characters.push(tmp);
            tmp.render(innerWidth*(0.11+0.195*i), innerHeight/2, 'girl'+(i+1), i);
        }
        var customChar = this.add.sprite(innerWidth/2, innerHeight*0.9, 'charCustom').setScale(0.5, 0.5).setInteractive();
        complete.on('pointerdown', function (event) {
            if (this.activeChar !== null)
            {
                stat.character = (this.activeChar+1)+this.appearence[this.activeChar];
                stat.character_chosed = true;
            }
            this.scene.start("mainMenu");
        }, this);
        customChar.on('pointerdown', function (event) {
            if (this.scene.activeChar || this.scene.activeChar === 0){
                this.scene.scene.start("characterCustomization", {'appereance':  (this.scene.activeChar+1)+this.scene.appearence[this.scene.activeChar]});
            }
        })
    }

    update() {

    }

}