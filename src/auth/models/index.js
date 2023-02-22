'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users.js');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DB_URL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'development' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
} : {};

const db = new Sequelize(DATABASE_URL, DATABASE_CONFIG);
const userModel = userSchema(db, DataTypes);

module.exports = { db, userModel };