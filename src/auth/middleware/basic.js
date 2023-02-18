'use strict';

const base64 = require('base-64');
const { userModel } = require('../models/index.js');

module.exports = async (req, res, next) => {

  // if (!req.headers.authorization) { return _authError(); }
  if (!req.headers.authorization) { next('Not Authorized');}
  

  let basic = req.headers.authorization;
  let credentials = basic.split(' ');
  console.log(credentials);
  let [username, pass] = base64.decode(credentials[1]).split(':');

  try {
    req.user = await userModel.authenticateBasic(username, pass);
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

};

