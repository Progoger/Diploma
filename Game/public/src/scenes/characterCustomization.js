import characterCard from '../helpers/characterCard.js';
import { stat_record, stat } from '../helpers/statistics.js';

export default class characterCustomization extends Phaser.Scene {
    constructor() {
        super({
            key: 'characterCustomization'
        });
        this.characters = [];
        this.activeChar = null;
        this.appearence = [
            
        ];
    }

    preload() {
        this.load.image('bg', 'src/assets/common/bg.png');
        this.load.image('back', 'src/assets/common/back.png');
        this.load.image('appCustom', 'src/assets/characterCustomization/appereanceCustomization.png');
        this.load.image('apply', 'src/assets/characterCustomization/apply.png');
        this.load.image('continue', 'src/assets/characterCustomization/continue.png');
        this.load.image('black', 'src/assets/characterCustomization/black.png');
        this.load.image('blonde', 'src/assets/characterCustomization/blonde.png');
        this.load.image('blue', 'src/assets/characterCustomization/blue.png');
        this.load.image('brown', 'src/assets/characterCustomization/brown.png');
        this.load.image('ginger', 'src/assets/characterCustomization/ginger.png');
        this.load.image('green', 'src/assets/characterCustomization/green.png');
        this.load.image('grey', 'src/assets/characterCustomization/grey.png');
        this.load.image('platform', 'src/assets/characterCustomization/platform.png');
        this.load.image('1_blue_black', 'src/assets/characterCustomization/1/blue_black.png');
        this.load.image('1_blue_blonde', 'src/assets/characterCustomization/1/blue_blonde.png');
        this.load.image('1_blue_brown', 'src/assets/characterCustomization/1/blue_brown.png');
        this.load.image('1_blue_ginger', 'src/assets/characterCustomization/1/blue_ginger.png');
        this.load.image('1_brown_black', 'src/assets/characterCustomization/1/brown_black.png');
        this.load.image('1_brown_blonde', 'src/assets/characterCustomization/1/brown_blonde.png');
        this.load.image('1_brown_brown', 'src/assets/characterCustomization/1/brown_brown.png');
        this.load.image('1_brown_ginger', 'src/assets/characterCustomization/1/brown_ginger.png');
        this.load.image('1_green_black', 'src/assets/characterCustomization/1/green_black.png');
        this.load.image('1_green_blonde', 'src/assets/characterCustomization/1/green_blonde.png');
        this.load.image('1_green_brown', 'src/assets/characterCustomization/1/green_brown.png');
        this.load.image('1_green_ginger', 'src/assets/characterCustomization/1/green_ginger.png');
        this.load.image('1_grey_black', 'src/assets/characterCustomization/1/grey_black.png');
        this.load.image('1_grey_blonde', 'src/assets/characterCustomization/1/grey_blonde.png');
        this.load.image('1_grey_brown', 'src/assets/characterCustomization/1/grey_brown.png');
        this.load.image('1_grey_ginger', 'src/assets/characterCustomization/1/grey_ginger.png');
        }

    create(data) {
        this.add.sprite(innerWidth/2, innerHeight/2, 'bg').setScale(1, 0.866);
        var appCustom = this.add.sprite(innerWidth*0.75, innerHeight/2, 'appCustom').setScale(0.8, 0.8);
        this.add.image(innerWidth/23, innerHeight/12, 'back').setScale(0.1, 0.1).setInteractive();
        this.add.image(innerWidth*0.67, innerHeight/3, 'green').setScale(0.14, 0.14).setInteractive();
        this.add.image(innerWidth*0.7525, innerHeight/3, 'grey').setScale(0.14, 0.14).setInteractive();
        this.add.image(innerWidth*0.835, innerHeight/3, 'blue').setScale(0.14, 0.14).setInteractive();
        this.add.image(innerWidth*0.9175, innerHeight/3, 'brown').setScale(0.14, 0.14).setInteractive();
        this.add.image(innerWidth*0.67, innerHeight*0.6, 'black').setScale(0.14, 0.14).setInteractive();
        this.add.image(innerWidth*0.7525, innerHeight*0.6, 'blonde').setScale(0.14, 0.14).setInteractive();
        this.add.image(innerWidth*0.835, innerHeight*0.6, 'ginger').setScale(0.14, 0.14).setInteractive();
        this.add.image(innerWidth*0.9175, innerHeight*0.6, 'brown').setScale(0.14, 0.14).setInteractive();
        this.add.image(innerWidth*0.675, innerHeight*0.86, 'apply').setScale(0.18, 0.18).setInteractive();
        this.add.image(innerWidth*0.87, innerHeight*0.86, 'continue').setScale(0.18, 0.18).setInteractive();
        this.add.image(innerWidth*0.275, innerHeight*0.9, 'platform').setScale(0.4, 0.4).setInteractive();
        this.add.image(innerWidth*0.275, innerHeight*0.5, data['appereance']).setScale(0.14, 0.14).setInteractive();
        
    }

    update() {

    }

}