var Formatter = require('./formatter')

function FormatterFactory() {
    this.formatters = {}
}

FormatterFactory.prototype.getFormatter = function (formatterType) {
    return this.formatters[formatterType]
}

FormatterFactory.prototype.putFormatter = function (formatterType, options, stringBuilder) {
    this.formatters[formatterType] = new Formatter(options, stringBuilder)
}