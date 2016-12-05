'use strict'

const {encode, isFunction} = require('./helpers')

module.exports = class Vouchers {
  constructor (client) {
    this.client = client
  }

  create (voucher, callback) {
    return this.client.post(`/vouchers/${encode(voucher.code)}`, voucher, callback)
  }

  get (code, callback) {
    return this.client.get(`/vouchers/${encode(code)}`, null, callback)
  }

  update (voucher, callback) {
    return this.client.put(`/vouchers/${encode(voucher.code)}`, voucher, callback)
  }

  delete (code, params = {}, callback = null) {
    if (isFunction(params)) {
      callback = params
      params = {}
    }

    return this.client.delete(`/vouchers/${encode(code)}`, callback, {
      qs: {force: !!params.force}
    })
  }

  list (params, callback) {
    if (isFunction(params)) {
      callback = params
      params = {}
    }

    return this.client.get('/vouchers', params, callback)
  }

  enable (code, callback) {
    return this.client.post(`/vouchers/${encode(code)}/enable`, null, callback)
  }

  disable (code, callback) {
    return this.client.post(`/vouchers/${encode(code)}/disable`, null, callback)
  }

  import (vouchers, callback) {
    return this.client.post(`/vouchers/import`, vouchers, callback)
  }
}