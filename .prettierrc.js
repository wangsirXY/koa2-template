module.exports = {
  // 使能每一种语言默认格式化规则
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  // 缩进字节数
  tabWidth: 2,
  // 句尾添加分号
  semi: true,
  // 使用单引号代替双引号
  singleQuote: false,
  // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  bracketSpacing: true,
  // 不需要格式化的文件，单独设置
  disableLanguages: ["vue"],
  // 结尾是 \n \r \n\r auto
  endOfLine: "\n\r",
  // 在jsx中使用单引号代替双引号
  jsxSingleQuote: false,
  // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  trailingComma: "es5",
};
