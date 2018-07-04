function omit(o, attrs) {
    let ret = {};
    for (const k in o) {
        if (attrs.indexOf(k) === -1) {
            ret[k] = o[k];
        }
    }
    return ret;
}

exports.omit = omit;