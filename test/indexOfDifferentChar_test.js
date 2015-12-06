var chai = require('chai')
var expect = chai.expect
var indexOfDifferentChar = require('../src/indexOfDifferentChar')

describe('indexOfDifferentChar', function () {
    describe('given string and starter index greater than length of string', function () {
        it('returns length of string', function () {
            var index = 8
            var string = 'foobar'
            expect(indexOfDifferentChar(string, index)).to.be.equal(string.length)
        })
    })

    describe('given string and starter index equal to length of string', function () {
        it('returns length of string', function () {
            var index = 6
            var string = 'foobar'
            expect(indexOfDifferentChar(string, index)).to.be.equal(string.length)
        })
    })

    describe('given string and starter index lower than length of string', function () {
        it('returns index of first character distinct to string[starter_index] if exists', function () {
            var index = 4
            var string = 'aaabbbbbcccdd'
            expect(indexOfDifferentChar(string, index)).to.be.equal(8)
        })
    })

    describe('given string and starter index lower than length of string', function () {
        it('returns length of string if does not exist index greater such that string[starter_index] is distinct to', function () {
            var index = 4
            var string = 'aaabbbbb'
            expect(indexOfDifferentChar(string, index)).to.be.equal(8)
        })
    })
})