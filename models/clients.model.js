const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Ma'lumotlar bazasi ulanishi

const Clients = sequelize.define("Clients", {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
  passport: {
    type: DataTypes.STRING,
  },
  verify_img: {
    type: DataTypes.STRING,
  },
  activation_link: {
    type: DataTypes.STRING,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  refresh_token: {
    type: DataTypes.STRING,
  },
});

module.exports = Clients;
