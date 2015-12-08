var chai = require('chai')
var expect = chai.expect
var optionsAdapter = require('../src/optionsAdapter')

describe('optionsAdapter', function () {
    describe('given empty options', function () {
        it('returns empty options', function () {
            expect(function () {
                optionsAdapter({})
            }).to.Throw(Error)
        })
    })

    describe('given options with one property', function () {
        it('returns correct format', function () {
            var options = {
                rules: {
                    cc: '@blublu'
                }
            }
            expect(optionsAdapter(options)).to.be.deep.equal({
                rules: {
                    cc: '@blublu'
                },
                regexp: new RegExp('\\\\.|(cc)', 'g')
            })
        })
    })

    describe('given keys with the same characters', function () {
        it('returns correct format', function () {
            var options = {
                rules: {
                    bb: '@blublu',
                    c: '@foo',
                    bbbb: '@blablablabla',
                    b: '@blo'
                }
            }
            expect(optionsAdapter(options)).to.be.deep.equal({
                rules: {
                    bb: '@blublu',
                    c: '@foo',
                    bbbb: '@blablablabla',
                    b: '@blo'
                },
                regexp: new RegExp('\\\\.|(bbbb|bb|c|b)', 'g')
            })
        })
    })

    describe('given key with name `escape`', function () {
        it('escape.prefix and escape.sufix are used in creation of regexp key', function () {
            var options = {
                rules: {
                    bb: '@blublu',
                    c: '@foo'
                },
                escape: {
                    prefix: '%',
                    sufix: '$;'
                }
            }
            expect(optionsAdapter(options)).to.be.deep.equal({
                rules: {
                    bb: '@blublu',
                    c: '@foo'
                },
                regexp: new RegExp('\\\\.|%(bb|c)\\$;', 'g')
            })
        })
    })
})
