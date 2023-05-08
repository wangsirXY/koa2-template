// import {} from ""

import { Status } from "../@types/response";

/**
 * 定义请求响应接口
 *  status:  响应状态码
 *  message: 提示信息
 *  data:    响应成功时返回的数据
 */
export interface IResponse {
  status: Status;
  message: string;
  getHttpStatusCode(): number;
}

// 定义类SuccessResponse, 用于处理成功类型
export class SuccessResponse implements IResponse {
  status: Status;
  message: string;
  data: any;
  /** 
   * @param data 获取的数据
   * @param message 提示信息
   */
  constructor(data: any, message: string = "") {
    this.status = 200;
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
  status: Status;
  message: string;
  /**
   * @param message 提示信息
   * @param code 状态码
   */
  constructor(message: string, status: Status) {
    this.status = status;
    this.message = message;
  }
  public getHttpStatusCode(): Status {
    return this.status;
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