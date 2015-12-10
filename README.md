# format-factory

![travis ci](https://travis-ci.org/xgbuils/format-factory.svg?branch=master)

A generic javascript format factory for Node.js and browser with [browserify](http://browserify.org/).

There are many values that are expressed differently depending on the language (dates, prices, etc). This package provides a class that builds a formatter based on a set of rules and object builder.

## Installation

``` bash
$ npm install formatter-factory
```

## Usage

``` javascript
var FormatterFactory = require('formatter-factory')
var PriceStringBuilder('./price-string-builder')
var priceStringBuilder = new PriceStringBuilder()
priceStringBuilder.setConfig({
    rules: {
        i: '@getIntegerPart',
        d: '@getDecimalPart',
        s: '@getSeparator',
        c: '@getCurrency',
        f: '%i%s%d',
        p: '%f %c'
    },
    escape: {
        prefix: '%',
    }
})

var priceFormatter = new FormatterFactory(priceStringBuilder)

priceFormatter.format('%i is integer part and %d is decimal part', 12.35) 
// '12 is integer part and 35 is decimal part'
priceFormatter.format('%f', 12.35) // '12,35'
priceFormatter.format('%p', 12.35) // '12,35 €'
priceFormatter.format('<span class="integer-part">%d</span>%s<span class="decimal-part">%d</span>', 12.35) 
// '<span class="integer-part">12</span>,<span class="decimal-part">35</span>'
```

``` javascript
// price-string-builder.js
function PriceStringBuilder() {}

PriceStringBuilder.prototype = {
    setConfig: function (config) {
        this.config = config
    },
    // getConfig is required to build formatter
    getConfig: function (config) {
        return config
    },
    getIntegerPart: function (price) {
        return Math.floor(price)
    },
    getDecimalPart: function (price) {
        return Math.floor((price % 1) * 100)
    },
    getSeparator: function () {
        return ','
    },
    getCurrency: function () {
        return '€'
    }
}
```
