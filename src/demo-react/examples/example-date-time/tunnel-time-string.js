const omit = require("./objects").omit;

exports.timeStr = {
    // reformat: (vv) => {
    //     if (vv == null) {
    //         return null;
    //     }
    //     if (vv.length === 3 && vv.indexOf(":") === -1) {
    //         vv = vv.substring(0, 2) + ":" + vv.substring(2);
    //     }
    //     return vv;
    // },
    format: (mv) => {
        return mv && moment(mv).format("HH:mm");
    },
    parse: (vv, oldData) => {
        if (vv == null || vv.length === 0) {
            return null;
        }

        if (vv.length < 5) {
            throw "Invalid Time";
        }

        let m = moment(vv, "HH:mm");
        if (!m.isValid()) {
            throw "Invalid Date";
        }
        let oldDataYMD = (oldData && omit(moment(oldData).toObject(), ["hours", "minutes", "seconds", "milliseconds"]));
        let newData = {
            ...oldDataYMD,
            ...omit(m.toObject(), ["date", "months", "years"])
        };
        return moment(newData).toISOString();
    }
};