const assert = require('assert')
const QueryBuilder = require('../lib/query-builder')

describe('Mongodb Query Builder', () => {
  describe('match', () => {
    it('should add key/value', () => {
      const builder = new QueryBuilder()

      const conds = { key: 'value' }
      builder.match(conds)

      assert.deepEqual(builder.get(), conds)
    })

    it('should add as $and if exist', () => {
      const builder = new QueryBuilder()

      builder.match({ key: 'value1' })
      builder.match({ key: 'value2' })

      assert.deepEqual(builder.get(), {
        $and: [{
          key: 'value1'
        }, {
          key: 'value2'
        }]
      })
    })

    it('should handle null', function () {
      const builder = new QueryBuilder()

      builder.match({ key: null })
      builder.match({ key: 'value2' })

      assert.deepEqual(builder.get(), {
        $and: [{
          key: null
        }, {
          key: 'value2'
        }]
      })
    })

    it('should handle undefined', function () {
      const builder = new QueryBuilder()

      builder.match({ key: undefined })
      builder.match({ key: 'value2' })

      assert.deepEqual(builder.get(), {
        $and: [{
          key: undefined
        }, {
          key: 'value2'
        }]
      })
    })

    it('should concat if $and exist', () => {
      const builder = new QueryBuilder()

      builder.match({
        $and: [{
          key: 'value1'
        }]
      })
      builder.match({
        $and: [{
          key: 'value2'
        }]
      })

      assert.deepEqual(builder.get(), {
        $and: [{
          key: 'value1'
        }, {
          key: 'value2'
        }]
      })
    })
  })
})
