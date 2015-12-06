var chai = require('chai')
var expect = chai.expect
var getToken = require('../src/getToken')
var optionsAdapter = require('../src/optionsAdapter')

describe('getToken', function () {
    context('given configuration {oo: \'u\', o: \'i\'} and string \'fooobaro\'' , function () {
        var string = 'fooobaro'
        var config = optionsAdapter({
            oo: '@u',
            o: '@i'
        })

        it('returns string token when index is 0', function () {
            var token = getToken(string, 0, config)
            expect(token).to.be.deep.equal({
                type: 'string',
                value: 'f',
                next: 1
            })
        })

        it('returns format token when index is 2', function () {
            var token = getToken(string, 2, config)
            expect(token).to.be.deep.equal({
                type: 'format',
                value: 'u',
                next: 4
            })
        })

        it('returns format token when index is 1', function () {
            var token = getToken(string, 1, config)
            expect(token).to.be.deep.equal({
                type: 'format',
                value: 'u',
                next: 3
            })
        })

        it('returns format token when index is 7', function () {
            var token = getToken(string, 7, config)
            expect(token).to.be.deep.equal({
                type: 'format',
                value: 'i',
                next: 8
            })
        })
    })

    context('given configuration {ooo: \'u\', o: \'i\'}', function () {
        var config = optionsAdapter({
            ooo: '@u',
            o: '@i'
        })

        it('returns format token when index is 1', function () {
            var token = getToken('fooobaroo', 1, config)
            expect(token).to.be.deep.equal({
                type: 'format',
                value: 'u',
                next: 4
            })
        })

        it('returns format token when index is 7', function () {
            var token = getToken('fooobaroo', 7, config)
            expect(token).to.be.deep.equal({
                type: 'format',
                value: 'i',
                next: 8
            })
        })

        it('returns string token when index is 0', function () {
            var token = getToken('fooobaroo', 4, config)
            expect(token).to.be.deep.equal({
                type: 'string',
                value: 'b',
                next: 5
            })
        })
    })
})