module.exports.dbConfig = {
    connectionLimit: 10, // 连接池最大连接数
    host: process.env.DB_HOST,      // 端口
    user: process.env.DB_USER,      // 用户名
    password: process.env.DB_PWD,   // 密码
    database: process.env.DB_DATABASE,  // 数据库名
}

