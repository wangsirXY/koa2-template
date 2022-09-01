import Koa from "koa";
import statics from "koa-static"; // 静态文件
import { loadControllers } from "koa-router-ts"; // 引入路由控制器
import Logger from "koa-logger"; // 日志
import moment from "moment"; // 时间格式化
import bodyParser from "koa-bodyparser"; // post请求
import path from "path";
import cors from "koa2-cors"; // 跨域处理

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

// 实例化路由
const router = loadControllers(path.join(__dirname, "routers"), {
  recurse: true,
});

app.use(router.routes()).use(router.allowedMethods());
// 设置跨域
app.use(cors());


const PORT = process.env.PORT || 3000;
app.listen(PORT);
