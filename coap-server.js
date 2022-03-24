import COAP from 'coap';

export function initCOAPServer(config, axios, logger) {
  // 创建 COAP 服务器
  const server = COAP.createServer({
    // 使用 IPv4
    type: 'udp4'
  });

  // COAP 请求处理
  server.on('request', (req, res) => {
    logger.log(`[COAP]\t${req.method}\t${req.url}`);

    if (req.method === 'POST') {
      if (isTelemetryApi(req.url)) {
        // 将二进制格式的载荷转为字符串格式
        const json = req.payload.toString();
        // 提取请求路径
        const pathname = req.url;
        // 将 COAP 请求转换为 HTTP 请求发送到服务端
        const httpURL = `http://${config.server.host}:${config.server.port}${pathname}`;
        logger.log(`=>[HTTP]\t${req.method}\t${httpURL}`);
        axios
          .post(httpURL, json)
          .then((httpRes) => {
            // COAP 兼容 HTTP 的状态码
            res.code = httpRes.statusCode;
            // 将服务器的响应回传
            res.end(httpRes.data || null);
          })
          .catch((e) => {
            logger.log(`[HTTP](X) ${e}`);
            // 请求出错返回 5.02 Bad Gateway
            res.code = 5.02;
            res.end('Gateway HTTP Failed');
          });
      }
    } else {
      // 其它请求认为是 4.00 Bad Request
      res.code = 4.0;
      res.end('Bad Request');
    }
  });

  // COAP 服务器监听指定端口
  server.listen(config.coapServer.port, () => {
    console.log(`COAP Server listening on port ${config.coapServer.port}`);
  });

  return server;
}

/**
 * 判断是否符合: 遥测数据上报接口
 * @param {String} url
 * @returns {Boolean}
 */
function isTelemetryApi(url) {
  const l = url.split('/');
  return l.at(-1) === 'telemetry';
}
