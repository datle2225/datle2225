let UTILS = {
    sortByDate: function (tree) {
        return tree.sort(function (a, b) {
            return b.path.split('-')[0] - a.path.split('-')[0];
        })
    },
}