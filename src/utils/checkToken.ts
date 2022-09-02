const jwt = require("jsonwebtoken");

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

    /** 解码：如果token过期：decoded的值为 undefined，err抛出异常 JsonWebTokenError: invalid token
     *   await jwt.verify(token, TOKEN_KEY, (err, decoded) => {})
     */
    try {
      const decoded = await jwt.verify(token, process.env.TOKEN_KEY);
      await next();
    } catch (err: any) {
      // 解构错误信息
      const { name, message, expiredAt } = err;
      
      /** status Token状态码
       * 10010: 过期 TokenExpiredError
       * 10011: 无效 JsonWebTokenError
       * 10012: 未激活 NotBeforeError
       */
      let status: number = 500;
      if (name == "TokenExpiredError") {
        status = 10010;
      } else if (name == "JsonWebTokenError") {
        status = 10011;
      } else if (name == "NotBeforeError") {
        status = 10012;
      }
      
      ctx.body = { status, name, message }
    }
  }
}
