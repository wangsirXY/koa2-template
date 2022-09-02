// 实现Token
const jwt = require('jsonwebtoken');

// 引入自定义响应形式
import {
  SuccessResponse,
  ErrorResponse,
  IResponse,
} from "../utils/response";

// 引入表模板
import UserDetails from '../models/user';

// 创建表模板实例
const details = new UserDetails();


// 用户模块业务层
export default class UserService {
  /**
   * 获取所有用户列表
   * @param ctx 
   * @returns 返回用户的 ID、用户名...
   */
  async getUserList(ctx: any): Promise<IResponse> {
    try {
      const result = await details.getUserList();
      if (!result) {
        return new ErrorResponse("找不到该数据", 404);
      }
      return new SuccessResponse(result, "成功获取数据");
    } catch (error) {
      return ctx.throw(500, error);
    }
  }

  /**
   * 用户登录
   * @param mobile 手机号
   * @param password 密码
   * @returns 登录成功返回账号和token，登录失败返回失败信息
   */
  async login(ctx: any, mobile: string, password: string): Promise<IResponse> {
    try {
      // 非空校验
      if (!mobile || !password) return new ErrorResponse("用户名和密码不能为空", 401);
      
      let result = await details.login(mobile, password);
      
      // 用户没有注册
      if (!result[0]) {
        return new ErrorResponse("请输入正确的用户名和密码", 404);
      }
      
      /**
       * 生成Token
       * jwt.sign({ token数据 }, '编码私钥', { expiresIn: '有效期' })
       */
      result[0].token = jwt.sign({ mobile }, 'Coder-GuAn', { expiresIn: '2d' })  // d: 天, h: 小时

      return new SuccessResponse(result[0], "登录成功");
    } catch (error) {
      return ctx.throw(500, error);
    }
  }

  
}
