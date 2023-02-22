'use strict';

const express = require('express');
const authRoutes = express.Router();

const basicAuth = require('../middleware/basic.js');
const bearerAuth = require('../middleware/bearer.js');
const {
  handleSignin,
  handleSignup,
  handleGetUsers,
  handleSecret,
} = require('./handlers.js');

authRoutes.post('/signup', handleSignup);
authRoutes.post('/signin', basicAuth, handleSignin);
authRoutes.get('/users', bearerAuth, handleGetUsers);
authRoutes.get('/secret', bearerAuth, handleSecret);

module.exports = authRoutes;
