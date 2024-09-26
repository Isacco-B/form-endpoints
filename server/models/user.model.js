import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.users.db",
});

const User = sequelize.define("User", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  hash: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  verified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});


const initDb = async () => {
  await sequelize.sync();
};

export { User, initDb };
