const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const Router = require('@koa/router')

const config = require('../config')

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(__dirname + '/../protos/common.proto'), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
).common
const grpcClient = new proto.Common(
  `${config.bizService.host}:${config.bizService.port}`,
  grpc.credentials.createInsecure()
)

const router = new Router({
  prefix: '/api/common'
})

router
  .get('/train/', async ctx => {
    const grpcFetch = () => {
      return new Promise((resolve, reject) => {
        grpcClient.listTrain({data: ''}, (err, response) => {
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
  .get('/dept/', async ctx => {
    const grpcFetch = () => {
      return new Promise((resolve, reject) => {
        grpcClient.listDept({data: ''}, (err, response) => {
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
  .put('/dept/:id/mark-team', async ctx => {
    const grpcFetch = body => {
      return new Promise((resolve, reject) => {
        grpcClient.markTeam({data: JSON.stringify(body)}, (err, response) => {
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
  .put('/dept/:id/unmark', async ctx => {
    const grpcFetch = body => {
      return new Promise((resolve, reject) => {
        grpcClient.unmark({data: JSON.stringify(body)}, (err, response) => {
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
  .put('/dept/:id/mark-qc', async ctx => {
    const grpcFetch = body => {
      return new Promise((resolve, reject) => {
        grpcClient.markQc({data: JSON.stringify(body)}, (err, response) => {
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

router
  .get('/team/', async ctx => {
    const grpcFetch = () => {
      return new Promise((resolve, reject) => {
        grpcClient.listTeam({data: ''}, (err, response) => {
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
  .get('/qc/', async ctx => {
    const grpcFetch = () => {
      return new Promise((resolve, reject) => {
        grpcClient.listQc({data: ''}, (err, response) => {
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

module.exports = router
