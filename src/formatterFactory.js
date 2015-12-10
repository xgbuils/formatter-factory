var parser = require('./parser')
var optionsAdapter = require('./optionsAdapter')

function Formatter (stringBuilder) {
    this.stringBuilder = stringBuilder
    this.options = optionsAdapter(getConfig(stringBuilder))
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

function getConfig (object) {
    if (!object || typeof object.getConfig !== 'function') {
        throw new Error('stringBuilder parameter must implement `getConfig` method')
    } else {
        return object.getConfig()
    }
}

module.exports = Formatter
