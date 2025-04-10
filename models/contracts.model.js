const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Contract = sequelize.define("contracts", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  owner_id: {
    type: DataTypes.INTEGER,
  },
  client_id: {
    type: DataTypes.INTEGER,
  },
  machine_id: {
    type: DataTypes.INTEGER,
  },
  status_id: {
    type: DataTypes.STRING,
  },
  start_date: {
    type: DataTypes.DATE,
  },
  end_date: {
    type: DataTypes.DATE,
  },
  document_url: {
    type: DataTypes.STRING,
  },
});


module.exports = Contract;
