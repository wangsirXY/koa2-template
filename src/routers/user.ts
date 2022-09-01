// 引入路由构造器
import { Controller, Get, Post, Put, Delete } from "koa-router-ts";

// 引入操作
import UserService from "../controllers/user";

// 创建服务实例
const service = new UserService();

// 构建路由
@Controller("/user")
export default class {
  /**
   * 获取所有用户列表
   * @param ctx 
   */
  @Get("/getUserList")
  async getUserList(ctx: any) {
    // Get 请求参数
    // const { id } = ctx.params;
    
    const result = await service.getUserList(ctx);

    ctx.body = result;
  }

  // 用户登录
  @Post("/login")
  async login(ctx: any) {
    // Post 请求参数
    const { mobile="", password="" } = ctx.request.body;


    ctx.body = await service.login(ctx, mobile, password);
  }


}
