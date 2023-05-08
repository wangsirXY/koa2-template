/**
  * @description 连接数据库
  * @author GuAn
  * @time 2023-05-08 10:25:28
  */
var mysql = require('mysql');
const { config } = require('./config');

// 配置数据库信息
const dbConfig = config[process.env.DB_ENV as string];

// 连接数据库配置信息
var pool = mysql.createPool(dbConfig);


//  创建连接   sql：sql语句
module.exports.query = (sql: string, values: any) => {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err: any, connection: { query: (arg0: string, arg1: any, arg2: (error: any, results: any, fields: any) => void) => void; release: () => void; }) {
      if (err) throw err; // not connected!  没有连接上

      // Use the connection   使用连接 发送sql语句到数据库mysql，mysql中的letaodb数据库会执行sql语句，
      // 执行结果 在回调函数中参数二返回
      connection.query(sql, values, function (error, results, fields) {
        // When done with the connection, release it.   没连接上之拿到返回数据的之后，会把当前连接释放掉
        connection.release();

        // Handle error after the release.  抛出异常
        if (error) throw error;

        resolve(results);

        // Don't use the connection here, it has been returned to the pool.
      });
    });
  });
}