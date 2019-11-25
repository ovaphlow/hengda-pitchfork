import React from 'react'
import axios from 'axios'

import { Title, Navbar } from '../../Components'
import { SideNav } from '../Components'
import { Toolbar, ListItem } from './Components'

function RejectList() {
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/cheliang/004/reject/`)
      if (res.data.message) {
        window.alert(res.data.message)
        return
      }
      setData(res.data.content)
      console.info(res.data)
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
            <h2>一体化作业申请单 - 已驳回申请</h2>
            <hr />
            <Toolbar />
            <div className="card shadow mt-2 mb-5">
              <div className="card-body">
                <ul className="list-group">
                  {data.map(it => (
                    <ListItem key={it.id} data={it} auth={{}} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RejectList
