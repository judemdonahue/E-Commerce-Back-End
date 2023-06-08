// import important parts of sequelize library
const { Model, DataTypes, DECIMAL } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns

    // id 
    // integer 
    // NOTNULL 
    // set as pk 
    // uses auto increment 

    // product_name 
    // string 
    // NOTNULL 
     
    // price 
    // DECIMAL
    // NOTNULL
    // validates value is a DECIMAL

    // stock
    // Integer
    // Doesn't allow null values
    // Set a default value of 10
    // Validates that the value is numeric

    // category_id
    // Integer
    // References the category model's id

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
