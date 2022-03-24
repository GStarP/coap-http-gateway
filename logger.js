import * as FS from 'fs';
import Path from 'path';

export function initLogger(config) {
  // 读取日志基路径
  const base = config.logger.base;
  // 若没有日志目录, 则创建
  if (!FS.existsSync(base)) {
    FS.mkdirSync(base);
  }
  // 若没有今日日志文件, 则创建
  const fileName = new Date().toLocaleDateString().replace(/\//g, '-');
  const filePath = Path.join(base, fileName + '.txt');
  if (!FS.existsSync(filePath)) {
    FS.writeFileSync(filePath, `[Log ${fileName}]\n\n`, 'utf-8');
  }

  return {
    log: (content) => {
      FS.appendFileSync(
        filePath,
        `${content}\t(${new Date().toLocaleTimeString()})\n`,
        'utf-8'
      );
    }
  };
}
