import React from 'react'
import axios from 'axios'

import { Title, Navbar } from '../../Components'
import { SideNav } from '../Components'
import { Toolbar } from './Components'

function List() {
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/api/cheliangzhuanye/004`)
      if (result.data.message) {
        window.alert(result.data.message)
        return
      }
      setData(result.data.content)
    }
    // fetchData()
  }, [])

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
              <div className="card-header">
                <span className="lead">查询条件</span>
              </div>

              <div className="card-body">
                列表
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default List
