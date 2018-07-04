exports.dateStr   = {
    format: (mv) => {
        return mv && moment(mv).format("MM/DD/YYYY");
    },
    parse: (vv) => {
        if (vv == null) {
            return null;
        }

        if (vv.length < 10) {
            throw "Invalid Date";
        }
        let m = moment(vv, "MM-DD-YYYY");
        if (!m.isValid()) {
            throw "Invalid Date";
        }
        return m.toISOString();
    }
};