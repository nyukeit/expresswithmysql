const {body, validationResult} = require('express-validator');

const validateMovie = [
  // Using the escape method to avoid Cross-site scripting Vulnerabilities XSS
  body('title').isString().isLength({min: 1, max: 150}).exists().escape(), 
  body('director').isString().isLength({min: 1, max: 100}).exists().escape(), 
  body('year').isInt().exists(), 
  body('city').isString().isLength({min: 3, max: 80}).exists().escape(), 
  body('language').isString().isLength({min: 1, max: 50}).exists().escape(), 
  (req, res, next) => {
    const errors = validationResult(req);  
    if (!errors.isEmpty()) {     
      return res.status(422).json({ errors: errors.array() });   
    } else {
      next();
    }
  }
]; 

module.exports = validateMovie;
