var getChunkOfTokens = require('./getChunkOfTokens')

function parser (string, options) {
    var i = 0
    var tokens = []
    while (true) {
        var chunkOfTokens = getChunkOfTokens(string, i, options)
        if (chunkOfTokens.length === 0) {
            break
        }
        var last = chunkOfTokens.length - 1
        tokens.push.apply(tokens, chunkOfTokens)
        i = chunkOfTokens[last].next
    }
    return tokens
}

module.exports = parser

