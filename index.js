import CONFIG from './config.js';
import { initAxios } from './axios.js';
import { initCOAPServer } from './coap-server.js';
import { initLogger } from './logger.js';

// 初始化全局 Axios 实例
const axios = initAxios();

// 初始化全局 Logger 实例
const logger = initLogger(CONFIG);

// 初始化 COAP 服务器
const coapServer = initCOAPServer(CONFIG, axios, logger);
