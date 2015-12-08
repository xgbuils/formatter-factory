var chai = require('chai')
var expect = chai.expect
var getChunkOfTokens = require('../src/getChunkOfTokens')

describe('getChunkOfTokens', function () {
    context('given rules `oo -> @u` and `o -> @i` and string \'yyy\'', function () {
        var string = 'yyy'
        var options = {
            rules: {
                oo: '@u',
                o: '@i'
            },
            regexp: new RegExp('\\\\.|(oo|o)', 'g')
        }

        it('returns chunk with string token when index is 0', function () {
            var chunkOfTokens = getChunkOfTokens(string, 0, options)
            expect(chunkOfTokens).to.be.deep.equal([{
                type: 'string',
                value: 'yyy',
                next: 3
            }])
        })
    })

    context('given rules `oo -> @u` and `o -> @i` and string \'fooobaro\'' , function () {
        var string = 'fooobaro'
        var options = {
            rules: {
                oo: '@u',
                o: '@i'
            },
            regexp: new RegExp('\\\\.|(oo|o)', 'g')
        }

        it('returns chunk with string and format tokens when index is 0', function () {
            var chunkOfTokens = getChunkOfTokens(string, 0, options)
            expect(chunkOfTokens).to.be.deep.equal([{
                type: 'string',
                value: 'f',
                next: 1
            }, {
                type: 'format',
                value: 'u',
                next: 3
            }])
        })

        it('returns chunk with format token when index is 1', function () {
            var chunkOfTokens = getChunkOfTokens(string, 1, options)
            expect(chunkOfTokens).to.be.deep.equal([{
                type: 'format',
                value: 'u',
                next: 3
            }])
        })

        it('returns chunk with format token when index is 2', function () {
            var chunkOfTokens = getChunkOfTokens(string, 2, options)
            expect(chunkOfTokens).to.be.deep.equal([{
                type: 'format',
                value: 'u',
                next: 4
            }])
        })

        it('returns chunk with format token when index is 3', function () {
            var chunkOfTokens = getChunkOfTokens(string, 3, options)
            expect(chunkOfTokens).to.be.deep.equal([{
                type: 'format',
                value: 'i',
                next: 4
            }])
        })

        it('returns format token when index is 7', function () {
            var chunkOfTokens = getChunkOfTokens(string, 5, options)
            expect(chunkOfTokens).to.be.deep.equal([{
                type: 'string',
                value: 'ar',
                next: 7
            }, {
                type: 'format',
                value: 'i',
                next: 8
            }])
        })

        it('returns format token when index is 7', function () {
            var chunkOfTokens = getChunkOfTokens(string, 7, options)
            expect(chunkOfTokens).to.be.deep.equal([{
                type: 'format',
                value: 'i',
                next: 8
            }])
        })
    })

    context('given rules `ooo -> @u` and `o -> @i` and string \'fooobaro\'', function () {
        var string = 'fooobaro'
        var options = {
            rules: {
                ooo: '@u',
                o: '@i'
            },
            regexp: new RegExp('\\\\.|(ooo|o)', 'g')
        }

        it('returns chunk with format token when index is 1', function () {
            var token = getChunkOfTokens(string, 1, options)
            expect(token).to.be.deep.equal([{
                type: 'format',
                value: 'u',
                next: 4
            }])
        })

        it('returns chunk with format token when index is 7', function () {
            var token = getChunkOfTokens(string, 7, options)
            expect(token).to.be.deep.equal([{
                type: 'format',
                value: 'i',
                next: 8
            }])
        })

        it('returns chunk with format token when index is 4', function () {
            var token = getChunkOfTokens(string, 4, options)
            expect(token).to.be.deep.equal([{
                type: 'string',
                value: 'bar',
                next: 7
            }, {
                type: 'format',
                value: 'i',
                next: 8
            }])
        })
    })

    context('given rules `ooo -> @u` and `o -> @i` and string \'fo\\oobar\\on\'', function () {
        var string = 'fo\\oobar\\on'
        var options = {
            rules: {
                ooo: '@u',
                o: '@i'
            },
            regexp: new RegExp('\\\\.|(ooo|o)', 'g')
        }

        it('returns chunk with format token when index is 0', function () {
            var token = getChunkOfTokens(string, 0, options)
            expect(token).to.be.deep.equal([{
                type: 'string',
                value: 'f',
                next: 1
            }, {
                type: 'format',
                value: 'i',
                next: 2
            }])
        })

        it('returns chunk with format token when index is 2', function () {
            var token = getChunkOfTokens(string, 2, options)
            expect(token).to.be.deep.equal([{
                type: 'string',
                value: 'o',
                next: 4
            }])
        })

        it('returns chunk with format token when index is 5', function () {
            var token = getChunkOfTokens(string, 5, options)
            expect(token).to.be.deep.equal([{
                type: 'string',
                value: 'bar',
                next: 8
            }, {
                type: 'string',
                value: 'o',
                next: 10
            }])
        })
    })

    context('given rules `ooo -> @u` and `o -> @i`, string \'f%ooo$;baron\' and prefix & sufix escape characters', function () {
        var string = 'f%ooo$;baron'
        var options = {
            rules: {
                ooo: '@u',
                o: '@i'
            },
            regexp: new RegExp('\\\\.|%(ooo|o)\\$;', 'g')
        }

        it('returns chunk with format token when index is 0', function () {
            var token = getChunkOfTokens(string, 0, options)
            expect(token).to.be.deep.equal([{
                type: 'string',
                value: 'f',
                next: 1
            }, {
                type: 'format',
                value: 'u',
                next: 7
            }])
        })

        it('returns chunk with format token when index is 8', function () {
            var token = getChunkOfTokens(string, 8, options)
            expect(token).to.be.deep.equal([{
                type: 'string',
                value: 'aron',
                next: 12
            }])
        })
    })
})