var stat_record = new StatRecord();

class Statistics {
    constructor() {
        this.character_chosed = false;
        this.character = '1_brown_brown';
        this.lvl1_score = 0;
        this.lvl1_completed = false;
        this.lvl2_score = 0;
        this.lvl2_completed = false;
        this.lvl3_score = 0;
        this.gender = 'girl';
        this.lvl2_active_cell = null;
    }
}

var stat = new Statistics();

export {
    stat_record,
    stat
}