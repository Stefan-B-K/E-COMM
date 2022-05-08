import { validationResult } from 'express-validator'

export const handleErrors = (htmlTemplateFunc, dataCallback) => {
  return async (request, response, next) => {
    const errors = validationResult(request)
  
    if (!errors.isEmpty() ||
      ((request.file) && (request.file.mimetype.split('/')[0] !== 'image'))) {

      let data = {};
      if (dataCallback) {
        data = await dataCallback(request)
      }
      
      if ((request.file) && (request.file.mimetype.split('/')[0] !== 'image')) {
        errors.errors.push({ msg: 'Must be an image file', param: 'image'})
      }
      
      return response.send(htmlTemplateFunc({ errors, ...data }))
    }
    next()
  }
}

export const requireAuth = (request, response, next) => {
  if (!request.session.userID) return response.redirect('/login')
  next()
}