module.exports = {
  HOST: "localhost",
  USER: "sa",
  PASSWORD: "test@MIN2020",
  DB: "e_learning",
  dialect: "mssql",
  port: "1443",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
