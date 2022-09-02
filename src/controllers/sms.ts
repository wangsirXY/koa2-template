// 引入自定义响应形式
import {
  SuccessResponse,
  ErrorResponse,
  IResponse,
} from "../utils/response";

// 引入腾讯云短信云
import SmsDetails from "../utils/sms-tencentcloud";

// 创建短信云实例
const details = new SmsDetails();


// 短信模块业务层
export default class SmsService {
  /**
   * 发送短信验证码
   * @param mobile 手机号
   * @param type 短信类型(change | register)
   * @returns 短信验证码
   */
  async sendsms(ctx: any, mobile: string, type: string): Promise<IResponse> {
    try {
      // 获取6位数验证码
      const code = details.getRandomByLength(6);
      const result = await details.sendsms(mobile, code, type);

      if (result.SendStatusSet[0].Code == "Ok") {
        return new SuccessResponse(code, "短信发送成功");
      }
      
      // 短信发送异常状态
      const state = result.SendStatusSet[0].Code.split(".")[1];

      // 频繁发送拦截 PhoneNumberOneHourLimit
      if (state == "PhoneNumberOneHourLimit") {
        return new ErrorResponse("验证码一小时内发送上限，请稍后再试", 201);
      }
      // 频繁发送拦截 PhoneNumberDailyLimit
      if (state == "PhoneNumberDailyLimit") {
        return new ErrorResponse("验证码一天内发送上限，请稍后再试", 201);
      }

      // 腾讯云套餐包余量不足
      if (state == "InsufficientBalanceInSmsPackage") {
        return new ErrorResponse("暂时无法获取验证码", 500);
      }

      return new ErrorResponse("短信发送失败", 404);

    } catch (error) {
      return ctx.throw(500, error);
    }
  }

  
}
