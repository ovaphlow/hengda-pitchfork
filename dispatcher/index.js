const cluster = require('cluster');
const http = require('http');
const os = require('os');

const Koa = require('koa');
const Router = require('@koa/router');
const mount = require('koa-mount');
const serve = require('koa-static');

const CONFIG_APP = require('./config/app');
const logger = require('./util/bunyan');

const app = new Koa();

app.env = 'production';

app.use(
  serve(`${__dirname}/../ui/build`, {
    maxage: 1000 * 60 * 60 * 24 * 7,
    gzip: true,
  }),
);

// 用户
app.use(
  mount(
    '/user',
    serve(`${__dirname}/../../hengda-user/ui/build`, {
      maxage: 1000 * 60 * 60 * 24 * 7,
      gzip: true,
    }),
  ),
);

// harold:动车组防冻排水及恢复作业记录表
app.use(
  mount(
    '/harold-007',
    serve(`${__dirname}/../../hengda-harold-007/ui/build`, {
      maxage: 1000 * 60 * 60 * 24 * 7,
      gzip: true,
    }),
  ),
);

app.use(async (ctx, next) => {
  if (ctx.request.url.indexOf('/api/') !== 0) {
    next();
    return;
  }
  logger.info(`--> ${ctx.request.method} ${ctx.request.url}`);
  await next();
  logger.info(`<-- ${ctx.request.method} ${ctx.request.url}`);
});

// 用户
app.use(mount('/', require('../../hengda-user/api/index')));

// 动车组防冻排水及恢复作业记录表
app.use(mount('/', require('../../hengda-harold-007/api/index')));

const router = new Router({
  prefix: '/api',
});

router.option('/', async (ctx) => {
  ctx.response.body = {
    name: 'hengda-pitchfork',
    title: CONFIG_APP.TITLE,
  };
});

app.use(router.routes());
app.use(router.allowedMethods());

if (cluster.isMaster) {
  logger.info(`主进程 PID:${process.pid}`);

  for (let i = 0; i < os.cpus().length; i += 1) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    logger.info(`子进程 PID:${worker.process.pid}, 端口:${CONFIG_APP.PORT}`);
  });

  cluster.on('exit', (worker, code, signal) => {
    logger.info(
      `子进程 PID:${worker.process.pid}终止，错误代码:${code}，信号:${signal}`,
    );
    logger.info(`由主进程(PID:${process.pid})创建新的子进程`);
    cluster.fork();
  });
} else {
  http.createServer(app.callback()).listen(CONFIG_APP.PORT);
}
