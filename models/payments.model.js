const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Payment = sequelize.define("payments", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
  },
  amount: {
    type: DataTypes.STRING,
  },
  is_transacted: {
    type: DataTypes.BOOLEAN,
  },
  contract_id: {
    type: DataTypes.BIGINT,
  },
});


module.exports = Payment;
