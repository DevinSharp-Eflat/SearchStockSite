import sequelize from "../config/connection.js";
import { UserFactory } from "./User.js";
import { Stock } from "./StockModel.js";
const User = UserFactory(sequelize);

export { sequelize, User, Stock };
