# Koa后台开发模板

> 用 Koa + TypeScript 封装一个纯净的后台模板，大幅提高开发效率！
>
> by 程序员孤安



## 使用

*这里填写具体的使用说明* 

> models(操作数据库)   =>   controllers(处理业务逻辑)   =>   routers(导出路由请求方法)   =>   index.ts(挂载所有路由)

```cmd
default/
├── .husky
├── src
│   └── controllers		# 业务层逻辑
│   └── db						# 数据库配置
│      └── config.ts		# 配置不同开发环境的数据库
│      └── index.ts		# 默认数据库配置
│      └── query.ts		# 数据库连接
│   └── models				# 操作数据库模型
│   └── routers				# 路由
│   └── static				# 静态资源
│   └── utils					# 工具包
│      └── response.ts	# 定义请求响应接口
│   └── index.ts			# 入口文件
├── .cz-config.js		# Commit提交类别配置文件
├── .env						# 全局参数配置文件
├── .gitignore			# 配置忽略文件
├── .prettierrc.js	# 代码自动格式化规范
├── commitlint.config.js	# 限制Commit提交类别
├── nodemon.json		# 配置nodemon参数
├── package.json		# 依赖包配置文件
├── README.md				# 项目说明文件
├── response.ts			# 
├── ts.config.json	# ts配置文件
└── yarn.lock				# yarn日志

```

- models、controllers、routers 三个目录下以模块名开头创建文件。

  > 例：项目中用户模块已做业务开发，仅作为示例，不需要则删除并进行二次开发即可。

- Git Commit 类别配置

  > 项目引入 cz-customizable + husky 进行强制 Git 代码提交规范，开发者可以在 `.cz-config.js` 文件中配置 Commit 的提交类别，并在 `commitlint.config.js` 文件中限制提交的类别。



## 部署

本项目基于Koa开发部署，支持二次开发。

### 依赖

*如果后台中有依赖外部云上资源，需要在下方进行描述* 

- Git提交规范

  > 需要全局安装 [`commitizen`](https://www.npmjs.com/package/commitizen) 依赖包

  ```shell
  yarn add -g commitizen@4.2.4
  ```

- RESOURCE：外部资源描述

## 文档

- [koajs 框架](http://koajs.cn) 
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)  || [koa-jwt](https://www.npmjs.com/package/koa-jwt) (token)
- [腾讯云短信](https://cloud.tencent.com/document/product/382/43197) 
- [husky 原生 git 钩子](https://typicode.github.io/husky/#/) 
- 其他要参考的文档



## Licence

本项目没有开源协议文档

