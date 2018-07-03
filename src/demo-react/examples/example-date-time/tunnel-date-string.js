const {simple} = RlfDemo.RLF.tunnels;
const {O, StringUtil} = RlfDemo.Utils;

exports.dateStr   = simple("text-ymd", {
    format: (mv) => {
        return mv && moment(mv).format("MM-DD-YYYY");
    },
    parse: (vv, getOldData) => {
        if (StringUtil.isEmpty(vv)) {
            return null;
        }

        if (vv.length < 10) {
            throw "Invalid Date";
        }

        let m = moment(vv, "MM-DD-YYYY");
        if (!m.isValid()) {
            throw "Invalid Date";
        }
        let oldData = getOldData();
        let newData = {
            ...(oldData && O.omit(moment(oldData).toObject(), ["date", "months", "years"])),
            ...O.omit(m.toObject(), ["hours", "minutes", "seconds", "milliseconds"])
        };
        return moment(newData).toISOString();
    }
});