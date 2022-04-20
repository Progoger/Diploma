var stat_record = new StatRecord();

class Statistics {
    constructor() {
        this.character_chosed = false;
        this.lvl1_score = 0;
        this.lvl1_completed = false;
        this.lvl2_score = 0;
        this.lvl2_completed = false;
        this.lvl3_score = 0;
    }
}

var stat = new Statistics();

export {
    stat_record,
    stat
}

