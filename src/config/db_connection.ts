import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const db_host = process.env.DB_HOST as string;
const db_username = process.env.DB_USER as string;
const db_pass = process.env.DB_PASS as string;
const db_name = process.env.DB_NAME as string;

const sequelizeConnection = new Sequelize(db_name, db_username, db_pass, {
  host: db_host,
  dialect: "mysql",
});

export default sequelizeConnection;
