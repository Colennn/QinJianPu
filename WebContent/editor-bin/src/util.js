const IS_OBJECT = { 'funtion': true, 'object': true }
const isObject = obj => IS_OBJECT[typeof obj] && !!obj

export const objEach = (obj, callback) => {
  if (isObject(obj)) {
    Object.keys(obj).forEach(key => { callback(obj[key], key) })
  }
}

export const extend = (obj, ext) => {
  objEach(ext, (val, key) => { obj[key] = val })
  return obj
}

export const near = (a, b) => Math.abs(a - b) < 0.00001

const isAccessorProperty = value => isObject(value) &&
        (typeof value.get === 'function' || typeof value.set === 'function')

/**
 * Define ES5 getter/setter properties
 * @param {Object} obj - The object to be defined.
 * @param {Object} props - ES5 getter/setter properties.
 * For example:
 * ```
 * {
 *   name: {
 *     get: function () {...},
 *     set: function () {...}
 *   },
 *   age: {
 *      get:...
 *   }
 * }
 * ```
 */
export const defineProperties = (obj, props) => {
  objEach(props, (value, prop) => {
    var descriptor
    if (isAccessorProperty(value)) {
      descriptor = value
    } else if (typeof value === 'function') {
      descriptor = { value: value }
    } else if (isObject(value) && value.constant) {
      descriptor = { value: value.constant }
    } else {
      descriptor = {
        value: value,
        writable: true,
        enumerable: true
      }
    }
    Object.defineProperty(obj, prop, descriptor)
  })
}

let toJSONWithDefault = true

export const makeToJSON = (values, elName) => function () {
  if (this.isEmpty) return

  const result = {}

  objEach(values, (defaultValue, prop) => {
    if (toJSONWithDefault || this[prop] !== defaultValue) {
      result[prop] = this[prop]
    }
  })
  if (!elName) return result

  const res = {}
  res[elName] = result
  return res
}
