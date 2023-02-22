'use strict';

const { start } = require('./src/server');
const { db } = require('./src/auth/models/index.js');

// Start up DB Server
db.sync()
  .then(() => {
    start(process.env.PORT);
  });

