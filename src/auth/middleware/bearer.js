'use strict';

const { userModel } = require('../models/index.js');

module.exports = async (req, res, next) => {
 
  if (!req.headers.authorization) { 
    next('No token fail');
  }
  try {
    let authType = req.headers.authorization.split(' ')[0];
    const token = req.headers.authorization.split(' ').pop();
    const validUser = await userModel.authenticateWithToken(token);

    if (validUser) {    
      req.user = validUser;
      req.token = validUser.token;
      next();
    }


  } catch (e) {
    // console.error(e);
    res.status(403).send('Invalid Login');
  }
};
