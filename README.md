# 库存与补货助手

简体中文 · [English](README.en.md)

根据销量、库存和采购周期计算补货数量。

浏览器本机运行，无需注册，也无需配置付费接口。演示资料均为虚构示例。

[在线使用](https://tianchaodaxing-beep.github.io/pandao-inventory/) · [下载版本](https://github.com/tianchaodaxing-beep/pandao-inventory/releases/latest) · [全部工具](https://github.com/tianchaodaxing-beep/pandao-open-tools)

![界面预览](docs/preview.png)

## 开始使用

从版本页面下载工具压缩包，解压后双击 `index.html`。Windows 也可以双击 `启动工具.cmd`。需要保留整个目录，不能只复制HTML文件。

1. 填写商品编号、日均销量、现有库存、在途和已占用数量。
2. 填写采购周期、安全库存天数、补货间隔、包装数量与起订量。
3. 计算单品，或下载模板进行批量测算。

## 文件与数据

表格支持 `.xlsx`、`.xls`、`.csv`、`.tsv`；只读取第一个工作表。单表最多20,000行、10 MB。文字文件的支持范围以工具说明为准。

输入资料在浏览器本机处理，不会通过本工具上传到服务器；点击外部反馈链接时会打开GitHub。导出文件由使用者保管。当前版本不自动保存输入，关闭前请导出需要的结果。

## 使用范围

建议以输入的平均销量为依据；不预测季节性、缺货损失和突发需求。库存、销量和包装须使用同一数量单位。

## 开发与许可

使用 Node.js 20 或更新版本运行 `npm test`。运行网页无需安装Node.js或其他依赖。

本项目采用MIT许可证，允许商业使用、修改和分发，需保留许可声明。第三方表格库采用独立许可证，详见 THIRD_PARTY_NOTICES.md。

## 反馈与定制需求

请通过[项目问题区](https://github.com/tianchaodaxing-beep/pandao-inventory/issues)描述使用场景、遇到的问题或希望增加的功能。公开反馈请使用演示资料，避免提交客户资料和账号凭据。

## 界面语言

保留中文使用方式，英文说明见 README.en.md。有网页的工具可点击页面上的 English 切换语言，点击“中文”返回。语言切换不会改写已有输入。
