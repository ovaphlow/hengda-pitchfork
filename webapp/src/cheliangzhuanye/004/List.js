import React from 'react'
import axios from 'axios'

import { Title, Navbar } from '../../Components'
import { SideNav } from '../Components'
import { Toolbar, ListItem } from './Components'

function List() {
  const [auth, setAuth] = React.useState(0)
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    const a = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!a) return
    setAuth(a)
  }, [])

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/api/cheliang/004`)
      if (result.data.message) {
        window.alert(result.data.message)
        return
      }
      setData(result.data.content)
    }
    fetchData()
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
                <ul className="list-group">
                  {
                    data.map(it => (
                      <ListItem key={it.id} data={it} auth={auth} />
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default List
