import React from 'react'
import axios from 'axios'

import { Title, Navbar } from '../Components'
import { SideNav } from './Components'

function Signature() {
  const Canvas = React.forwardRef((props, ref) => (
    <canvas id="canvas" style={{border: '1px solid black'}} ref={ref}></canvas>
  ))
  const canvasRef = React.createRef()

  const config = {
    width: 400,
    height: 200
  }
  // let canvas = 0
    // , ctx = 0
    // , rect
  let last_x = 0
    , last_y = 0

  React.useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    canvasRef.current.setAttribute('width', config.width)
    canvasRef.current.setAttribute('height', config.height)

    ctx.fillStyle = 'rgba(255, 255, 255, 0)'
    ctx.fillRect(0, 0, config.width, config.height)

    ctx.lineWidth = 2
    ctx.lineJoin = 'round'

    canvasRef.current.addEventListener('touchstart', handleTouchStart, false)
    canvasRef.current.addEventListener('touchmove', handleTouchMove, false)
    canvasRef.current.addEventListener('touchend', handleTouchEnd, false)

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTouchStart = event => {
    event.preventDefault()
    const rect = canvasRef.current.getBoundingClientRect()
    const _t = event.changedTouches[0]
    last_x = _t.clientX - rect.left
    last_y = _t.clientY - rect.top
  }

  const handleTouchMove = event => {
    event.preventDefault()

    const ctx = canvasRef.current.getContext('2d')
    const rect = canvasRef.current.getBoundingClientRect()
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
    const ctx = canvasRef.current.getContext('2d')
    ctx.clearRect(0, 0, config.width, config.height)
  }

  const handleUpload = async () => {
    const d = canvasRef.current.toDataURL()
    const a = JSON.parse(sessionStorage.getItem('auth'))
    const result = await axios.post(`/api/user/signature`, {
      id: a.id,
      data_url: d
    })
    if (result.data.message) {
      window.alert(result.data.message)
      return
    }
    window.location = '#用户/用户信息'
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
                    {/*
                    <canvas id="canvas" style={{border: '1px solid black'}} ref={canvas}></canvas>
                    */}
                    <Canvas ref={canvasRef} />
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
