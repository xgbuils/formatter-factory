var indexOfDifferentChar = require('./indexOfDifferentChar')

function optionsAdapter(options) {
    var config = {}
    for (var key in options) {
        var ch = getCharacterRepetition(key)
        if (ch) {
            if (!config[ch]) {
                config[ch] = {
                    min: Infinity,
                    max: 1
                }
            }
            var obj = config[ch]
            var min = obj.min
            var max = obj.max
            obj[key] = options[key]
            obj.min = Math.min(min, key.length)
            obj.max = Math.max(max, key.length)
        } else {
            throw new Error(key + ' must be a repetition of characters')
        }
    }
    return config
}

function getCharacterRepetition (string) {
    var index = indexOfDifferentChar(string)
    return string.length === index ? string[0] : undefined
}

module.exports = optionsAdapter