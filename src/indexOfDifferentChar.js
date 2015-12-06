function indexOfDifferentChar(string, start) {
    start || (start = 0)
    var ch = string[start]
    var n = string.length
    if (ch) {
        for (var i = start + 1; i < n; ++i) {
            if (ch !== string[i]) {
                return i
            }
        }
    }
    return string.length
}

module.exports = indexOfDifferentChar