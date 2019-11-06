const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const Router = require('@koa/router')

const config = require('../config')

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(__dirname + '/../protos/dept.proto'), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
).dept
const grpcClient = new proto.Dept(
  `${config.bizService.host}:${config.bizService.port}`,
  grpc.credentials.createInsecure()
)

const router = new Router({
  prefix: '/api/common/dept'
})

router
  .get('/', async ctx => {
    const grpcFetch = () => {
      return new Promise((resolve, reject) => {
        grpcClient.list({data: ''}, (err, response) => {
          if (err) {
            console.error(err)
            reject(err)
            return
          }
          resolve(JSON.parse(response.data))
        })
      })
    }
    try {
      ctx.response.body = await grpcFetch()
    } catch (err) {
      console.error(err)
      ctx.response.body = {message: '服务器错误'}
    }
  })
  .post('/', async ctx => {
    const grpcFetch = body => {
      return new Promise((resolve, reject) => {
        grpcClient.save({data: JSON.stringify(body)}, (err, response) => {
          if (err) {
            console.error(err)
            reject(err)
            return
          }
          resolve(JSON.parse(response.data))
        })
      })
    }
    try {
      ctx.response.body = await grpcFetch(ctx.request.body)
    } catch (err) {
      console.error(err)
      ctx.response.body = {message: '服务器错误'}
    }
  })

router
  .get('/sub', async ctx => {
    const grpcFetch = () => {
      return new Promise((resolve, reject) => {
        grpcClient.listAllSub({data: ''}, (err, response) => {
          if (err) {
            console.error(err)
            reject(err)
            return
          }
          resolve(JSON.parse(response.data))
        })
      })
    }
    try {
      ctx.response.body = await grpcFetch()
    } catch (err) {
      console.error(err)
      ctx.response.body = {message: '服务器错误'}
    }
  })

router
  .get('/:id', async ctx => {
    const grpcFetch = body => {
      return new Promise((resolve, reject) => {
        grpcClient.get({data: JSON.stringify(body)}, (err, response) => {
          if (err) {
            console.error(err)
            reject(err)
            return
          }
          resolve(JSON.parse(response.data))
        })
      })
    }
    try {
      ctx.response.body = await grpcFetch(ctx.params)
    } catch (err) {
      console.error(err)
      ctx.response.body = {message: '服务器错误'}
    }
  })
  .put('/:id', async ctx => {
    const grpcFetch = body => {
      return new Promise((resolve, reject) => {
        grpcClient.update({data: JSON.stringify(body)}, (err, response) => {
          if (err) {
            console.error(err)
            reject(err)
            return
          }
          resolve(JSON.parse(response.data))
        })
      })
    }
    try {
      ctx.response.body = await grpcFetch(ctx.request.body)
    } catch (err) {
      console.error(err)
      ctx.response.body = {message: '服务器错误'}
    }
  })

router
  .get('/:id/sub', async ctx => {
    const grpcFetch = body => {
      return new Promise((resolve, reject) => {
        grpcClient.listSub({data: JSON.stringify(body)}, (err, response) => {
          if (err) {
            console.error(err)
            reject(err)
            return
          }
          resolve(JSON.parse(response.data))
        })
      })
    }
    try {
      ctx.response.body = await grpcFetch(ctx.params)
    } catch (err) {
      console.error(err)
      ctx.response.body = {message: '服务器错误'}
    }
  })
  .post('/:id/sub', async ctx => {
    const grpcFetch = body => {
      return new Promise((resolve, reject) => {
        grpcClient.saveSub({data: JSON.stringify(body)}, (err, response) => {
          if (err) {
            console.error(err)
            reject(err)
            return
          }
          resolve(JSON.parse(response.data))
        })
      })
    }
    try {
      ctx.request.body.master_id = ctx.params.id
      ctx.response.body = await grpcFetch(ctx.request.body)
    } catch (err) {
      console.error(err)
      ctx.response.body = {message: '服务器错误'}
    }
  })

module.exports = router
