const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns

    // integer
    // doesnt allow null values 
    // set as pk 
    // uses auto increment 

    // category_name 
    // string 
    // doesnt allow null values 
    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
