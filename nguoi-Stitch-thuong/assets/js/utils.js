let UTILS = {
    sortByDate: function (tree) {
        return tree.sort(function (a, b) {
            return b.path.split('-')[3] - a.path.split('-')[3];
        })
    },
}