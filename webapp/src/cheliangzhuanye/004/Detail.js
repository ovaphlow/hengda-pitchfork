import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { Title, Navbar } from '../../Components'
import { SideNav } from '../Components'
import { Toolbar, Form } from './Components'

function Detail() {
  const { id } = useParams()
  const [data, setData] = React.useState(0)

  React.useEffect(() => {
    const fetchData = async id => {
      const res = await axios.get(`/api/cheliang/004/${id}`)
      if (res.data.message) {
        window.alert(res.data.message)
        return
      }
      setData(res.data.content)
    }
    fetchData(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleReject = async () => {
    const content = window.prompt('请输入驳回原因')
    if (!!!content) return
    const res = await axios.put(`/api/cheliang/004/${data.id}/reject`, {
      id: data.id,
      reject: content
    })
    if (res.data.message) {
      window.alert(res.data.message)
      return
    }
    window.location = '#车辆专业/004'
  }

  return (
    <>
      <Title />

      <Navbar category="车辆专业" />

      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-3 col-lg-2">
            <SideNav category="004" />
          </div>

          <div className="col-9 col-lg-10">
            <h2>一体化作业申请单</h2>
            <hr />
            <Toolbar />
            <div className="card shadow mt-2 mb-5">
              <div className="card-body">
                <Form mode="read" data={data} />
              </div>

              <div className="card-footer">
                <div className="btn-group">
                  <button type="button" className="btn btn-outline-danger" onClick={handleReject}>
                    <i className="fa fa-fw fa-mail-reply"></i>
                    驳回
                  </button>
                </div>

                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-primary">
                    <i className="fa fa-fw fa-check"></i>
                    操作按钮
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

export default Detail
