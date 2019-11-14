import React from 'react'

import { Title, Navbar } from '../Components'
import { SideNav } from './Components'

const Signature = () => {
  // const [auth, setAuth] = React.useState(0)
  const config = {
    width: 400,
    height: 200
  }
  let canvas = 0
    , ctx = 0
    , rect
    , last_x = 0
    , last_y = 0

  // React.useEffect(() => {
  //   let a = JSON.parse(sessionStorage.getItem('auth'))
  //   console.info(a)
  //   if (!!!a) {
  //     window.location = '#登录'
  //     return
  //   }
  //   setAuth(a)
  // }, [])

  React.useEffect(() => {
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')
    rect = canvas.getBoundingClientRect()

    canvas.setAttribute('width', config.width)
    canvas.setAttribute('height', config.height)

    ctx.fillStyle = 'rgba(255, 255, 255, 0)'
    ctx.fillRect(0, 0, config.width, config.height)

    ctx.lineWidth = 2
    ctx.lineJoin = 'round'

    canvas.addEventListener('touchstart', handleTouchStart, false)
    canvas.addEventListener('touchmove', handleTouchMove, false)
    canvas.addEventListener('touchend', handleTouchEnd, false)

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart)
    }
  }, [])

  const handleTouchStart = event => {
    event.preventDefault()
    const _t = event.changedTouches[0]
    last_x = _t.clientX - rect.left
    last_y = _t.clientY - rect.top
  }

  const handleTouchMove = event => {
    event.preventDefault()

    const _t = event.changedTouches[0]
    ctx.beginPath()
    ctx.moveTo(last_x, last_y)
    ctx.lineTo(_t.clientX - rect.left, _t.clientY - rect.top)
    ctx.stroke()

    last_x = _t.clientX - rect.left
    last_y = _t.clientY - rect.top
  }

  const handleTouchEnd = event => {
    event.preventDefault()
  }

  const handleReset = () => {
    ctx.clearRect(0, 0, config.width, config.height)
  }

  const handleUpload = async () => {
    const d = canvas.toDataURL()
    console.info(d.length)
    const a = JSON.parse(sessionStorage.getItem('auth'))
    console.info(a)
    // const result = await axios.post(`/api/user/signature` {
    //   id: a.id,
    //   signature: d
    // })

  }

  return (
    <>
      <Title />

      <Navbar category="home" />

      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-3 col-lg-2">
            <SideNav category="signature" />
          </div>

          <div className="col-9 col-lg-10">
            <h2>设置签名</h2>
            <hr />

            <div className="card shadow">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <canvas id="canvas" style={{border: '1px solid black'}}></canvas>
                  </div>

                  <div className="col-3">
                    <span className="pull-right">
                      <button type="button" className="btn btn-outline-secondary" onClick={handleReset}>
                        <i className="fa fa-fw fa-refresh"></i>
                        重置
                      </button>
                    </span>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-primary" onClick={handleUpload}>
                    <i className="fa fa-fw fa-check"></i>
                    确定
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signature
