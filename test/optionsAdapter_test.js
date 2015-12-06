var chai = require('chai')
var expect = chai.expect
var optionsAdapter = require('../src/optionsAdapter')

describe('optionsAdapter', function () {
    describe('given empty options', function () {
        it('returns empty options', function () {
            expect(optionsAdapter({})).to.be.deep.equal({})
        })
    })

    describe('given options with one property', function () {
        it('returns correct format', function () {
            var options = {
                cc: '@blublu'
            }
            expect(optionsAdapter(options)).to.be.deep.equal({
                c: {
                    cc: '@blublu',
                    min: 2,
                    max: 2
                }
            })
        })
    })

    describe('given keys with the same characters', function () {
        it('returns correct format', function () {
            var options = {
                bb: '@blublu',
                c: '@foo',
                bbbb: '@blablablabla',
                b: '@blo'
            }
            expect(optionsAdapter(options)).to.be.deep.equal({
                c: {
                    c: '@foo',
                    min: 1,
                    max: 1
                },
                b: {
                    bb: '@blublu',
                    bbbb: '@blablablabla',
                    b: '@blo',
                    min: 1,
                    max: 4
                }
            })
        })
    })
})