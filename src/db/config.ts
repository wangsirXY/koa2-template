/**
 * dev: 开发环境
 * uat: 测试环境
 * prd: 生产环境
 */
module.exports.config = {
  dev: {
    connectionLimit: 10, // 最大连接数
    port: 3306,
    host: "127.0.0.1", // 主机
    user: "root", // 用户名
    password: "123456", // 密码
    database: "local_test", // 数据库名称
  },
  uat: {
    connectionLimit: 10,
    port: 3306,
    host: "127.0.0.1",
    user: "root",
    password: "123456",
    database: "local_test",
  },
  prd: {
    connectionLimit: 10,
    port: 3306,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DATABASE,
  },
};
