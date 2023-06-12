// import important parts of sequelize library
const { Model, DataTypes, DECIMAL } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // id integer NOTNULL set as pk uses auto increment 

    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // product_name string NOTNULL 
     
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    // price DECIMAL NOTNULL validates value is a DECIMAL

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true
      }
    },
    // stock Integer Doesn't allow null values Set a default value of 10 Validates that the value is numeric

    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id'
      }
    }
    // category_id Integer References the category model's id
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
