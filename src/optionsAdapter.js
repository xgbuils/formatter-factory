var substitutionRegexp = /([$?|.+*\^\\(){}\[\]])/g

function optionsAdapter (options) {
    var rules = options.rules || {}
    var escape = options.escape || {}
    var prefix = escape.prefix || ''
    var sufix = escape.sufix || ''
    prefix = prefix.replace(substitutionRegexp, '\\$1')
    sufix = sufix.replace(substitutionRegexp, '\\$1')
    var keys = Object.keys(rules).filter(function (key) {
        if (/^[a-z]\w*$/i.test(key)) {
            return true
        }
        throw new Error('key `' + key + '`: keys must be composed of alphabetic characters')
    })

    var regexp
    if (keys.length > 0) {
        var pattern = keys.sort(function (a, b) {
            var value = b.length - a.length
            if (value !== 0) {
                return value
            } else {
                return b > a ? 1 : -1
            }
        }).join('|')
        regexp = new RegExp('\\\\.|' + prefix + '(' + pattern + ')' + sufix, 'g')
    } else {
        throw new Error('Is needed at least one rule')
    }
    return {
        rules: rules,
        regexp: regexp
    }
}

module.exports = optionsAdapter
