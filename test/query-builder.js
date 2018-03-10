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
