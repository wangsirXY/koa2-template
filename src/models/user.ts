const { query } = require('../db/query');

export default class UserDetails {
  /**
   * @param ctx 
   * @returns 查询所有用户
   */
  async getUserList () {
    return await query(`select * from users;`);
  }

  /**
   * 用户登录
   * @param mobile 手机号
   * @param password 密码
   * @returns 如果没有返回结果，代表用户没有注册
   */
  async login (mobile: string, password: string) {
    return await query(`
      select * 
        from users
      where
        cname='${mobile}' and cname='${password}'
    ;`);
  }


}