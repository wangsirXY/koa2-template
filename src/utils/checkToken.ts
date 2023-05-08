const jwt = require("jsonwebtoken");
import { Status } from "../@types/response";

// Token 鉴权
module.exports = async (ctx: any, next: () => any) => {
  let url = ctx.request.url;

  // 不需要tooken的请求
  let noToken = [
    "/users/login", // 登录
  ];

  // 跳过不需要token的路由
  if (noToken.filter(item => item == url).length) await next();

  else {
    // 规定 Token 写在 header 的 'autohrization'
    let token = ctx.request.headers["authorization"];

    try {
      /** 解码
       * 如果token过期：decoded的值为 undefined，err抛出异常 JsonWebTokenError: invalid token
       *   await jwt.verify(token.replace("Bearer ", ""), TOKEN_KEY, (err, decoded) => {})
       */
      const decoded = await jwt.verify(token.replace("Bearer ", ""), process.env.TOKEN_KEY);
      const { mobile, iat, exp } = decoded;
      await next();
    } catch (err: any) {
      // 解构错误信息
      const { name, message, expiredAt } = err;

      // 状态码
      let status: Status = 500;
      // 获取状态码
      switch (name) {
        // Token过期 TokenExpiredError
        case "TokenExpiredError":
          status = 401;
          break;
        // Token无效 JsonWebTokenError
        case "JsonWebTokenError":
          status = 402;
          break;
        // Token未激活 NotBeforeError
        case "NotBeforeError":
          status = 403;
          break;
        default:
          status = 500;
      }

      ctx.body = { status, name, message }
    }
  }
}
