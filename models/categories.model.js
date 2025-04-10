const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Category = sequelize.define("categories", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  icon_url: {
    type: DataTypes.STRING,
  },
});


module.exports = Category;
