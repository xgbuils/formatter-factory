var chai = require('chai')
var expect = chai.expect
var parser = require('../src/parser')

describe('parser', function () {
    context('given configuration with method references', function () {
        var options = {
            rules: {
                oo: '@fooMethod',
                o: '@getBar'
            },
            regexp: /(oo|o)/g
        }

        it('returns string token if string is \'oo\'', function () {
            var tokens = parser('oo', options)
            expect(tokens).to.be.deep.equal([{
                type: 'format',
                value: 'fooMethod',
                next: 2
            }])
        })

        it('returns string tokenif string is \'fooobaro\'', function () {
            var tokens = parser('fooobaro', options)
            expect(tokens).to.be.deep.equal([{
                type: 'string',
                value: 'f',
                next: 1
            }, {
                type: 'format',
                value: 'fooMethod',
                next: 3
            }, {
                type: 'format',
                value: 'getBar',
                next: 4
            }, {
                type: 'string',
                value: 'bar',
                next: 7
            }, {
                type: 'format',
                value: 'getBar',
                next: 8
            }])
        })
    })

    context('given configuration with substitutions', function () {
        var options = {
            rules: {
                oo: '@fooMethod',
                o: '@getBar',
                a: 'oo-o',
                b: 'ooo'
            },
            regexp: /(oo|o|b|a)/g
        }

        it('returns string token if string is \'a\'', function () {
            var tokens = parser('a', options)
            expect(tokens).to.be.deep.equal([{
                type: 'substitution',
                value: 'oo-o',
                next: 1
            }])
        })

        it('returns strings, format and substitution tokens if string is \'fooobaro\'', function () {
            var tokens = parser('fooobaro', options)
            expect(tokens).to.be.deep.equal([{
                type: 'string',
                value: 'f',
                next: 1
            }, {
                type: 'format',
                value: 'fooMethod',
                next: 3
            }, {
                type: 'format',
                value: 'getBar',
                next: 4
            }, {
                type: 'substitution',
                value: 'ooo',
                next: 5
            }, {
                type: 'substitution',
                value: 'oo-o',
                next: 6
            }, {
                type: 'string',
                value: 'r',
                next: 7
            }, {
                type: 'format',
                value: 'getBar',
                next: 8
            }])
        })
    })
})