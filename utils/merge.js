// Object.defineProperty(Array.prototype, 'flat', {
//   value: function(depth = 1) {
//     return this.reduce(function(flat, toFlatten) {
//       return flat.concat(
//         Array.isArray(toFlatten) && depth - 1
//           ? toFlatten.flat(depth - 1)
//           : toFlatten
//       )
//     }, [])
//   }
// })

function prefixIds(array, prefix, separator = '_') {
  array.forEach(element => {
    if (element.id) {
      let id = element.id
      element.id = {}
      element.id[prefix] = id
    }
  })
}

function concatenateAndPrefixIds(data) {
  data.forEach(element => {
    prefixIds(element.data, element.name)
  })
  let arrays = data.map(element => element.data)
  return arrays.flat()
}

function removeEntriesWithoutPrimaryKey(array, key) {
  return array.filter(element => element.email)
}

function sortByKey(array, key) {
  return array.sort(function(a, b) {
    const A = a[key].toLowerCase()
    const B = b[key].toLowerCase()
    if (A < B) return -1
    if (A > B) {
      return 1
    }
    return 0
  })
}

function getUniquePrimaryKeys(array, key) {
  let uniques = []

  let value = null
  array.forEach(element => {
    if (value !== element[key]) {
      uniques.push(element[key])
      value = element[key]
    }
  })

  return uniques
}

export const getAllKeys = array => {
  let keys = []
  array.forEach(entry => {
    Object.keys(entry).forEach(key => {
      if (!keys.includes(key)) {
        keys.push(key)
      }
    })
  })
  return keys
}

function consolidateEntriesByUniqueKey(array, key, uniques) {
  return uniques.map(unique => {
    return array.filter(element => {
      return element[key] === unique
    })
  })
}

function mergeEntriesByKeys(array, keys) {
  return array.map(element => {
    let item = {}
    keys.forEach(key => {
      let values = []
      element.forEach(entry => {
        values.push(entry[key])
      })
      item[key] = values
    })
    return item
  })
}

function getUniqueNonNullValues(array, key) {
  let uniques = []

  let value = null
  array.forEach(element => {
    if (element && value !== element) {
      uniques.push(element)
      value = element
    }
  })

  return uniques
}

function flattenArrays(array) {
  if (array.length === 0) {
    return null
  }
  if (array.length === 1) {
    return array[0]
  }
  return array.sort()
}

function mergeValues(array, keys) {
  return array.map(element => {
    keys.forEach(key => {
      element[key] = getUniqueNonNullValues(element[key], key)
      element[key] = flattenArrays(element[key])
    })
    return element
  })
}

function mergeIds(array) {
  return array.map(element => {
    if (element.id.length) {
      element.id = Object.assign(...element.id)
    }
    return element
  })
}

export const merge = (data, key = 'email') => {
  data = concatenateAndPrefixIds(data)
  data = removeEntriesWithoutPrimaryKey(data, key)
  data = sortByKey(data, key)

  const keys = getAllKeys(data)
  const uniques = getUniquePrimaryKeys(data, key)

  data = consolidateEntriesByUniqueKey(data, key, uniques)
  data = mergeEntriesByKeys(data, keys)
  data = mergeValues(data, keys)
  data = mergeIds(data)

  return data
}
