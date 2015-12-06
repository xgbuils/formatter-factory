var getToken = require('./getToken')

function parser (string, config) {
    var i = 0
    var tokens = []
    while (true) {
        var token = getToken(string, i, config)
        if (token === undefined) {
            break
        }
        tokens.push(token)
        i = token.next
    }
    return tokens
}

module.exports = parser

