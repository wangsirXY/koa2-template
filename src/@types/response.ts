/**
 * 请求状态码
 * @param 200 请求成功，返回数据
 * @param 201 请求成功，没有数据，返回空数据
 * @param 202 请求成功，但不需要处理（一般用于字段未传值）
 * @param 203 请求成功，在响应不使用此状态码便会返回200 OK的情况下才是合适的
 * @param 204 请求成功，但不需要返回数据
 * @param 300 重定向
 * @param 400 请求失败，请求无法被服务器理解
 * @param 401 请求失败，Token 过期
 * @param 402 请求失败，Token 无效
 * @param 403 请求失败，Token 未激活
 * @param 404 请求失败，访问资源不存在（一般用于获取不到数据）
 * @param 500 服务器错误
 */
export type Status = 200 | 201 | 202 | 203 | 204 | 300 | 400 | 401 | 402 | 403 | 404 | 500;