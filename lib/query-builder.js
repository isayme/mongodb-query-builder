class QueryBuilder {
  constructor (match = {}) {
    this.$match = match
  }

  match (conds) {
    const $match = this.$match

    for (let key in conds) {
      const cacheValue = $match[key]

      if (cacheValue) {
        if (key === '$and') {
          $match[key] = $match[key].concat(conds[key])
        } else {
          this.match({
            $and: [{
              [key]: cacheValue
            }, {
              [key]: conds[key]
            }]
          })
          delete $match[key]
        }
      } else {
        $match[key] = conds[key]
      }
    }

    return this
  }

  get () {
    return this.$match
  }
}

module.exports = QueryBuilder
