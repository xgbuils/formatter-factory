var parser = require('./parser')
var optionsAdapter = require('./optionsAdapter')

function Formatter(options, stringBuilder) {
    this.options = optionsAdapter(options)
    this.stringBuilder = stringBuilder
}

Formatter.prototype.format = function (stringFormat, value) {
    var tokens = parser(stringFormat, this.options)
    var self = this
    return tokens.map(function (token) {
        if (token.type === 'string') {
            return token.value
        } else if (token.type === 'format') {
            return self.stringBuilder[token.value](value)
        } else if (token.type === 'substitution') {
            return self.format(token.value, value)
        } else {
            return ''
        }
    }).join('')
}

module.exports = Formatter