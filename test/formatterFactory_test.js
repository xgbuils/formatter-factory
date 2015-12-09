var chai = require('chai')
var expect = chai.expect
var Formatter = require('../src/formatter')

describe('FormatterFactory', function () {
    context('given configuration and price string builder', function () {
        var priceStringBuilder = givenPriceStringBuilder('.', '$')
        var config = {
            rules: {
                ii: '@getIntegerPart',
                dd: '@getDecimalPart',
                s: '@getSeparator',
                c: '@getCurrency',
                ff: 'iisdd',
                FF: 'ddsii',
                pp: 'ff c'
            }
        }
        var formatter = new Formatter(config, priceStringBuilder)

        it('returns "123"', function () {
            expect(formatter.format('ii', 123.34)).to.be.equal('123')
        })

        it('returns "34"', function () {
            expect(formatter.format('dd', 123.34)).to.be.equal('34')
        })

        it('returns "."', function () {
            expect(formatter.format('s', 123.34)).to.be.equal('.')
        })

        it('returns "$"', function () {
            expect(formatter.format('c', 123.34)).to.be.equal('$')
        })

        it('returns "123.34"', function () {
            expect(formatter.format('ff', 123.34)).to.be.equal('123.34')
        })

        it('returns "34.123"', function () {
            expect(formatter.format('FF', 123.34)).to.be.equal('34.123')
        })

        it('returns "123.34 $"', function () {
            expect(formatter.format('pp', 123.34)).to.be.equal('123.34 $')
        })

        it('returns "a.d 123.34 $ -- F 34.123+"', function () {
            expect(formatter.format('asd pp -- F FF+', 123.34)).to.be.equal('a.d 123.34 $ -- F 34.123+')
        })
    })

    context('given configuration and price string builder and prefix escape character', function () {
        var priceStringBuilder = givenPriceStringBuilder('.', '$')
        var config = {
            rules: {
                i: '@getIntegerPart',
                d: '@getDecimalPart',
                s: '@getSeparator',
                c: '@getCurrency',
                f: '%i[%s[%d[',
                F: '%d[%s[%i[',
                p: '%f[ %c['
            },
            escape: {
                prefix: '%',
                sufix: '['
            }
        }
        var formatter = new Formatter(config, priceStringBuilder)

        it('returns "123"', function () {
            expect(formatter.format('%i[', 123.34)).to.be.equal('123')
        })

        it('returns "%i"', function () {
            expect(formatter.format('\\%i[', 123.34)).to.be.equal('%i[')
        })

        it('returns "34"', function () {
            expect(formatter.format('%d[', 123.34)).to.be.equal('34')
        })

        it('returns "."', function () {
            expect(formatter.format('%s[', 123.34)).to.be.equal('.')
        })

        it('returns "$"', function () {
            expect(formatter.format('%c[', 123.34)).to.be.equal('$')
        })

        it('returns "123.34"', function () {
            expect(formatter.format('%f[', 123.34)).to.be.equal('123.34')
        })

        it('returns "34.123"', function () {
            expect(formatter.format('%F[', 123.34)).to.be.equal('34.123')
        })

        it('returns "123.34 $"', function () {
            expect(formatter.format('%p[', 123.34)).to.be.equal('123.34 $')
        })

        it('returns "a%sd 123.34 $ -- %F 34.123+"', function () {
            expect(formatter.format('a\\%s[d %p[ -- %F %F[+', 123.34)).to.be.equal('a%s[d 123.34 $ -- %F 34.123+')
        })
    })
})

function givenPriceStringBuilder (separator, currency) {
    var priceStringBuilder = {}
    priceStringBuilder.getIntegerPart = function (price) {
        return Math.floor(price)
    }
    priceStringBuilder.getSeparator = function () {
        return separator
    }
    priceStringBuilder.getDecimalPart = function (price) {
        return Math.floor((price % 1) * 100)
    }
    priceStringBuilder.getCurrency = function () {
        return currency
    }
    return priceStringBuilder
}
