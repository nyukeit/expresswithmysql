const { body, validationResult } = require('express-validator')

const validateUser = [
  body('firstname').isString().isLength({min: 3, max: 255}).exists().escape(), 
  body('lastname').isString().isLength({min: 3, max: 255}).exists().escape(), 
  body('email').isEmail().exists(), 
  body('city').isString().isLength({min: 3, max: 80}).exists().escape(), 
  body('language').isString().isLength({min: 3, max: 50}).exists().escape(), 
  (req, res, next) => {
    const errors = validationResult(req);  
    if (!errors.isEmpty()) {     
      return res.status(422).json({ errors: errors.array() });   
    } else {
      next();
    }
  }
];   

module.exports = validateUser;