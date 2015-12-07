function getToken(string, start, options) {
    var regexp = options.regexp
    var rules = options.rules
    regexp.lastIndex = start
    var match = regexp.exec(string)
    var tokens = []
    var next
    var end
    var token
    if (match) {
        match = match[1]
        var value = rules[match]
        end = regexp.lastIndex
        next = end - match.length

        token = {
            next: end
        }
        if (value[0] === '@') {
            token.type = 'format'
            token.value = value.substr(1)
        } else {
            token.type = 'substitution'
            token.value = value
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