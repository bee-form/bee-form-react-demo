const omit = require("./objects").omit;

exports.dateStr = {
    format: (mv) => {
        return mv && moment(mv).format("MM-DD-YYYY");
    },
    parse: (vv, oldData) => {
        if (vv == null || vv.length === 0) {
            return null;
        }

        if (vv.length < 10) {
            throw "Invalid Date";
        }

        let m = moment(vv, "MM-DD-YYYY");
        if (!m.isValid()) {
            throw "Invalid Date";
        }
        let newData = {
            ...(oldData && omit(moment(oldData).toObject(), ["date", "months", "years"])),
            ...omit(m.toObject(), ["hours", "minutes", "seconds", "milliseconds"])
        };
        return moment(newData).toISOString();
    }
};