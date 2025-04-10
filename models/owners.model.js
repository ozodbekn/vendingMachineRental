const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Owner = sequelize.define("owners", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING(30),
  },
  last_name: {
    type: DataTypes.STRING(30),
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING(30),
  },
  company_name: {
    type: DataTypes.STRING(30),
  },
  ref_token: {
    type: DataTypes.STRING,
  },
});



module.exports = Owner;
