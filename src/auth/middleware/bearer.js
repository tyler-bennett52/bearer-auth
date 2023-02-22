'use strict';

const { userModel } = require('../models/index.js');

module.exports = async (req, res, next) => {
 
  if (!req.headers.authorization) { 
    next('No token fail');
  }
  try {
    let authType = req.headers.authorization.split(' ')[0];
    if (authType === 'Bearer') {
      const token = req.headers.authorization.split(' ')[1];
      console.log('token from bearer.js:', token);
      const validUser = await userModel.authenticateToken(token);

      if (validUser) {    
        req.user = validUser;
        req.token = validUser.token;
        next();
      }
    } else {
      throw new Error();
    }



  } catch (e) {
    // console.error(e);
    res.status(403).send('Invalid Login');
  }
};
