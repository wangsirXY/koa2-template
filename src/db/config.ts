module.exports.config = {
  dev: {
    connectionLimit: 10, // 最大连接数
    port: 3306,
    host: "127.0.0.1", // 主机
    user: "root", // 用户名
    password: "wangxinyu0428", // 密码
    database: "local_test", // 数据库名称
  },
  uat: {
    connectionLimit: 10, // 最大连接数
    port: 3306,
    host: "127.0.0.1", // 主机
    user: "root", // 用户名
    password: "wangxinyu0428", // 密码
    database: "local_test", // 数据库名称
  },
  prd: {
    connectionLimit: 10, // 最大连接数
    port: 3306,
    host: "127.0.0.1", // 主机
    user: "root", // 用户名
    password: "wangxinyu0428", // 密码
    database: "local_test", // 数据库名称
  },
};
