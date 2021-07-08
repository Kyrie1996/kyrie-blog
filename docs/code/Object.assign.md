# Object.assign

Object.assign2 = function(target, ...source) {
  if(target == null ) {
    throw new TypeError('Cannont convert undefined or null to object')
  }
  let ret = Object(target)
  source.forEach(obj => {
    if(obj!==null) {
      for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
          ret[key] = obj[key]
        }
      }
    }
  })
  return ret
}
