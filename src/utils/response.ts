/**
 * 定义请求响应接口
 *  status:  响应状态(ok /error)
 *  message: 提示信息
 *  data:    响应成功时返回的数据
 *  code:    响应失败时返回的错误类型
 */
export interface IResponse {
  status: string;
  message: string;
  getHttpStatusCode(): number;
}

// 定义类SuccessResponse, 用于处理成功类型
export class SuccessResponse implements IResponse {
  status: string;
  message: string;
  data: any;
  /** 
   * @param data 获取的数据
   * @param message 提示信息
   */
  constructor(data: any, message: string = "") {
    this.status = "ok";
    this.message = message;
    this.data = data;
  }

  /**
   * 获取 HTTP status code
   */
  public getHttpStatusCode(): number {
    return 200;
  }
}

// 定义类ErrorResponse, 用于处理失败类型
export class ErrorResponse implements IResponse {
  status: string;
  message: string;
  code: number;
  /**
   * @param message 提示信息
   * @param code 状态码
   */
  constructor(message: string, code: number) {
    this.status = "error";
    this.message = message;
    this.code = code;
  }
  public getHttpStatusCode(): number {
    return this.code;
  }
}





/**
  // 引入自定义响应形式
  import {
    SuccessResponse,
    ErrorResponse,
    IResponse,
  } from "../../utils/response";
 */