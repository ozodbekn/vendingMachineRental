const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Machine = sequelize.define("machines", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category_id: {
    type: DataTypes.STRING(30),
  },
  status: {
    type: DataTypes.STRING(30),
  },
  location: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  model: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
});


module.exports = Machine;
