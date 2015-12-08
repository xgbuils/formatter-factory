function getToken (string, start, options) {
    var regexp = options.regexp
    var rules = options.rules
    regexp.lastIndex = start
    var matches = regexp.exec(string)
    var tokens = []
    var next
    var end
    var token
    if (matches) {
        var match = matches[1] || matches[0]
        end = regexp.lastIndex
        next = end - matches[0].length
        token = {
            next: end
        }
        if (matches[1]) {
            var value = rules[match]
            if (value[0] === '@') {
                token.type = 'format'
                token.value = value.substr(1)
            } else {
                token.type = 'substitution'
                token.value = value
            }
        } else {
            token.type = 'string'
            token.value = match[1]
        }
    } else {
        next = string.length
    }
    if (next > start) {
        tokens.push({
            type: 'string',
            value: string.substring(start, next),
            next: next
        })
    }
    if (token) {
        tokens.push(token)
    }
    return tokens
}

module.exports = getToken
