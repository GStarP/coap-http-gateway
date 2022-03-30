# COAP-HTTP-Gateway

## 简要介绍

- 角色：IoT 云边端架构——协议转换网关
- 功能：实现 COAP 协议到 HTTP 协议的转换

## 工作流程

- 执行 `node index.js` 启动网关（默认端口为 `5683`，可以在 [config.js](./config.js) 中更改）
- 设备向网关发送 HTTP 请求
- 网关解析 HTTP 请求，转换为 COAP 请求发送至云/边平台
- 网关收到 COAP 响应，转换为 HTTP 响应返回给设备

## 额外说明

- 协议解析主要依赖 [node-coap](https://github.com/mcollina/node-coap) 模块
- 为了体现网关功能的完整性，添加了日志模块，详见 [logger.js](./logger.js)
