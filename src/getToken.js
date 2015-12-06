var indexOfDifferentChar = require('./indexOfDifferentChar')

function getToken(string, start, config) {
    var end = indexOfDifferentChar(string, start)
    if (end > start) {
        var ch = string[start]
        var obj = config[ch]
        if (obj) {
            var length = Math.min(obj.max, end - start)
            for (var len = length; len >= obj.min; --len) {
                var key = string.substr(start, len)
                var value = obj[key]
                if (value) {
                    var token = {
                        next: start + len
                    }
                    if (value[0] === '@') {
                        token.type = 'format'
                        token.value = value.substring(1)
                    } else {
                        token.type = 'substitution'
                        token.value = value
                    }
                    return token
                }
            }
        }
        return {
            type: 'string',
            value: string.substring(start, end),
            next: end
        }
    }
}

module.exports = getToken