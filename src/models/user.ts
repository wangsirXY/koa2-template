const { query } = require('../db/query');


export default class UserDetails {
  /** 查询所有用户信息
   * @returns 当前已注册的所有用户信息
   */
  async getUserList () {
    return await query(`select * from users;`);
  }

  /** 查询单个用户信息
   * @param mobile 手机号
   * @returns 所查询的用户信息
   */
  async getUser (mobile: string) {
    return await query(`
      select *
        from users
      where
        mobile='${mobile}'
    ;`);
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
        mobile='${mobile}' and password='${password}'
    ;`);
  }


}