const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Admin = sequelize.define("admins", {
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
  is_active: {
    type: DataTypes.BOOLEAN,
  },
  is_creator: {
    type: DataTypes.BOOLEAN,
  },
  ref_token: {
    type: DataTypes.STRING,
    allowNull:true
  },

});

module.exports = Admin;
