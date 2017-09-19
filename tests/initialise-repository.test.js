import { expect } from 'chai'

import {
    _stringify,
    _objectSubset
} from '../src/initialise-repository'

describe('_objectSubset', () => {
    it('takes an object and an array, and returns an object', () => {
        expect(_objectSubset({}, [])).to.be.a('object')
    })
})

describe('_stringify', () => {
    it('takes an object and returns a string', () => {
        expect(_stringify({}, [])).to.be.a('string')
    })
})