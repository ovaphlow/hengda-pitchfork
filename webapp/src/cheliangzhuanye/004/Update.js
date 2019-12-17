import React from 'react'
import { useParams } from 'react-router-dom'

import { Title, Navbar } from '../../Components'
import { SideNav } from '../Components'
import { Toolbar, Form } from './Components'

function Update() {
  const { id } = useParams()
  const [data, setData] = React.useState(0)

  React.useEffect(() => {
    const fetchData = async id => {
      const response = await fetch(`/api/cheliang/004/${id}`)
      const res = await response.json()
      setData(res.content)
    }
    fetchData(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleUpdate = async () => {
    if (!!!data.p_yq_xdc || !!!data.p_yq_jcw || !!!data.p_yq_zydd) {
      window.alert('请完整填写所需信息')
      return
    }
    const response = await fetch(`/api/cheliang/004/${id}`, {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(data)
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.location.reload(true)
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

            <div className="card shadow mt-2">
              <div className="card-body">
                {
                  data !== 0 && data.id > 0 && (
                    <Form data={data} handleChange={handleChange} />
                  )
                }
              </div>

              <div className="card-footer">
                <div className="btn-group">
                  <button type="button" className="btn btn-outline-dark"
                    onClick={() => window.close()}
                  >
                    关闭
                  </button>
                </div>

                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-primary" onClick={handleUpdate}>
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

export default Update