/**
  * @description 腾讯云SDK封装
  * @author GuAn
  * @time 2023-05-08 10:20:16
  */
export default class SmsDetails {
  /**
   * 短信发送功能
   * @param mobile 手机号
   * @param smscode 短信验证码
   * @param type 短信模板类型
   * @returns 验证码
   */
  async sendsms(mobile: string, smscode: number, type = "change") {
    const tencentcloud = require("tencentcloud-sdk-nodejs")

    /**
     * 选择短信模板
     *  change:   修改密码
     *  register: 注册用户
     */
    let TemplateId: string;
    if (type == "change") {
      TemplateId = process.env.TemplateIdChange as string;
    } else if (type == "register") {
      TemplateId = process.env.TemplateIdRegister as string;
    } else {
      return new Error("短信模板类型未填写");
    }

    // 导入对应产品模块的client models。
    const smsClient = tencentcloud.sms.v20210111.Client

    /* 实例化要请求产品(以sms为例)的client对象 */
    const client = new smsClient({
      credential: {
        /* 必填：腾讯云账户密钥对secretId，secretKey。
        * 这里采用的是从环境变量读取的方式，需要在环境变量中先设置这两个值。
        * 你也可以直接在代码中写死密钥对，但是小心不要将代码复制、上传或者分享给他人，
        * 以免泄露密钥对危及你的财产安全。
        * CAM密匙查询: https://console.cloud.tencent.com/cam/capi */
        secretId: process.env.secretId,
        secretKey: process.env.secretKey,
      },
      /* 必填：地域信息，可以直接填写字符串ap-guangzhou，或者引用预设的常量 */
      region: "ap-guangzhou",
      /* 非必填:
      * 客户端配置对象，可以指定超时时间等配置 */
      profile: {
        /* SDK默认用TC3-HMAC-SHA256进行签名，非必要请不要修改这个字段 */
        signMethod: "HmacSHA256",
        httpProfile: {
          /* SDK默认使用POST方法。
          * 如果你一定要使用GET方法，可以在这里设置。GET方法无法处理一些较大的请求 */
          reqMethod: "POST",
          /* SDK有默认的超时时间，非必要请不要进行调整
          * 如有需要请在代码中查阅以获取最新的默认值 */
          reqTimeout: 30,
          /**
           * SDK会自动指定域名。通常是不需要特地指定域名的，但是如果你访问的是金融区的服务
           * 则必须手动指定域名，例如sms的上海金融区域名： sms.ap-shanghai-fsi.tencentcloudapi.com
           */
          endpoint: "sms.tencentcloudapi.com"
        },
      },
    })

    /* 请求参数，根据调用的接口和实际情况，可以进一步设置请求参数
    * 属性可能是基本类型，也可能引用了另一个数据结构
    * 推荐使用IDE进行开发，可以方便的跳转查阅各个接口和数据结构的文档说明 */
    const params = {
      /* 短信应用ID: 短信SmsSdkAppId在 [短信控制台] 添加应用后生成的实际SmsSdkAppId，示例如1400006666 */
      SmsSdkAppId: process.env.SmsSdkAppId,
      /* 短信签名内容: 使用 UTF-8 编码，必须填写已审核通过的签名，签名信息可登录 [短信控制台] 查看 */
      SignName: process.env.SignName,
      /* 短信码号扩展号: 默认未开通，如需开通请联系 [sms helper] */
      ExtendCode: "",
      /* 国际/港澳台短信 senderid: 国内短信填空，默认未开通，如需开通请联系 [sms helper] */
      SenderId: "",
      /* 用户的 session 内容: 可以携带用户侧 ID 等上下文信息，server 会原样返回 */
      SessionContext: "",
      /* 下发手机号码，采用 e.164 标准，+[国家或地区码][手机号]
      * 示例如：+8613711112222， 其中前面有一个+号 ，86为国家码，13711112222为手机号，最多不要超过200个手机号*/
      PhoneNumberSet: [`+86${mobile}`],
      /* 模板 ID: 必须填写已审核通过的模板 ID。模板ID可登录 [短信控制台] 查看 */
      TemplateId: TemplateId,
      /* 模板参数: 若无模板参数，则设置为空*/
      TemplateParamSet: [smscode],
    }
    // 通过client对象调用想要访问的接口，需要传入请求对象以及响应回调函数
    return await client.SendSms(params)
  }

  /**
   * 生成指定位数的随机正数
   * @param len 验证码长度
   * @returns 验证码
   */
  getRandomByLength(len: number) {
    let code = '';
    for (let i = 0; i < len; i++) {
      //  每次遍历 都会拼接随机整数
      code += this.getRandom(0, 9);
    }
    // 指定位数随机整数
    return Number(code);
  }

  /**
   * 生成从min到max随机整数
   * @param min 最小值
   * @param max 最大值
   * @returns 返回一位随机数
   */
  getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}