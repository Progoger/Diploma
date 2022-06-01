var stat_record = new StatRecord({
    "levels_names": ["1 уровень", "2 уровень", "3 уровень"]
});

class Statistics {
    constructor() {
        this.character_chosed = false;
        this.character = '1_brown_brown';
        this.lvl1_score = 0;
        this.lvl1_completed = false;
        this.lvl2_score = 0;
        this.lvl2_completed = false;
        this.lvl3_score = 0;
        this.lvl3_completed = false;
        this.gender = 'girl';
        this.lvl2_active_cell = null;
        this.active_level = null;
        this.common_width = 1920;
        this.common_height = 937;
        this.coeff = null;
    }
};

var stat = new Statistics();

export {
    stat_record,
    stat
};