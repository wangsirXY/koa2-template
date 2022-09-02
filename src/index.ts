import Koa from "koa";
import statics from "koa-static"; // 静态文件
import { loadControllers } from "koa-router-ts"; // 引入路由控制器
import Logger from "koa-logger"; // 日志
import moment from "moment"; // 时间格式化
import bodyParser from "koa-bodyparser"; // post请求
import path from "path";
import cors from "koa2-cors"; // 跨域处理
const cmd = require('node-cmd');
const iconv = require('iconv-lite');   // cmd解码为utf8


// 打印作者信息
const banner_ads = require('./utils/bannerAds');
// token校验
const checkToken = require("./utils/checkToken");

// 启动dotenv
require("dotenv").config();

// 静态文件地址
const staticPath = "./static";

// 日志时间格式化处理
const logger = new (Logger as any)((str: string) => {
  console.log(moment().format("YYYY-MM-DD HH:mm:ss") + str);
});

// 实例化koa
const app = new Koa();

// 加载中间件
app.use(bodyParser());
app.use(logger);
app.use(statics(path.join(__dirname, staticPath)));
app.use(checkToken);

/**
 *  实例化路由
 *    将路由文件夹下的所有路由都实例化
 */
const router = loadControllers(path.join(__dirname, "routers"), {
  recurse: true,  // 是否递归
});

app.use(router.routes()).use(router.allowedMethods());
// 设置跨域
app.use(cors());

// 端口及监听
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  banner_ads.map((item: string) => console.log(item));

  // 获取当前项目最后修改的时间
  cmd.run(`dir /TW`,
    function(err: any, data: any, stderr: any) {
      
      // 过滤出文件和目录
      data = data.split('\r\n').filter((item: string) => {
        // 去除空格，截取前17位时间，并转码
        item = iconv.decode(item.trim().slice(0, 17), 'utf8');
        
        // 获取所有的目录和文件
        return `${new Date(item).getTime()}` != "NaN";
      })
      
      data.sort((num1:string, num2:string) => {
        return new Date(iconv.decode(num2.trim().slice(0, 17), 'utf8')).getTime() - new Date(iconv.decode(num1.trim().slice(0, 17), 'utf8')).getTime();
      })
      
      console.log("项目最后修改时间：" + data[0].slice(0, 17).split("/").join("-").split("  ").join(" "));
    }
  );
  
  console.log(`Server is running on http://127.0.0.1:${PORT}`);

  setTimeout(() => {
    console.log("------------------------------------------------------------------------");
  }, 500)
});
