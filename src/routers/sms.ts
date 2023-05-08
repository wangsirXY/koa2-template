// 引入路由构造器
import { Controller, Get, Post, Put, Delete } from "koa-router-ts";

// 引入操作
import SmsService from "../controllers/sms";

// 创建服务实例
const service = new SmsService();

// 构建路由
@Controller("/sms")
export default class {
  /**
   * 获取短信验证码
   * @param ctx 
   */
  @Post("/sendsms")
  async sendsms(ctx: any) {
    // Post 请求参数
    const { mobile = "", type = "" } = ctx.request.body;

    ctx.body = await service.sendsms(ctx, mobile, type);
  }

}
