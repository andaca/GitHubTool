export const objectSubset = (object, fields) =>
  fields.reduce((obj, field) => {
    if (!(field in obj))
      throw `Key ${field} not in object ${obj}`
    obj[field] = object[field]
    return obj
  }, {})