import React from 'react'

import { Title, Navbar } from '../../Components'
import { SideNav } from '../Components'
import { Toolbar, ListItem } from './Components'

function ToDoList() {
  const [auth, setAuth] = React.useState(0)
  const [dataPjsy, setDataPjsy] = React.useState([])
  const [dataPdd, setDataPdd] = React.useState([])
  const [dataPzbsz, setDataPzbsz] = React.useState([])
  const [dataTeam, setDataTeam] = React.useState([])
  const [dataQc, setDataQc] = React.useState([])
  const [dataUser, setDataUser] = React.useState([])

  React.useEffect(() => {
    const a = JSON.parse(sessionStorage.getItem('auth'))
    if (!!!a) return
    setAuth(a)

    const fetchListPjsy = async () => {
      const response = await fetch(`/api/cheliang/004/to-do/p_jsy/`)
      const res = await response.json()
      if (res.message) {
        window.console.error(res.message)
        return
      }
      setDataPjsy(res.content)
    }
    const fetchListPdd = async () => {
      const response = await fetch(`/api/cheliang/004/to-do/p_dd/`)
      const res = await response.json()
      if (res.message) {
        window.console.error(res.message)
        return
      }
      setDataPdd(res.content)
    }
    const fetchListPzbsz = async () => {
      const response = await fetch(`/api/cheliang/004/to-do/p_zbsz/`)
      const res = await response.json()
      if (res.message) {
        window.console.error(res.message)
        return
      }
      setDataPzbsz(res.content)
    }
    const fetchListTeam = async () => {
      const response = await fetch(`/api/cheliang/004/to-do/team/${a.master_id}/`)
      const res = await response.json()
      if (res.message) {
        window.console.error(res.message)
        return
      }
      setDataTeam(res.content)
    }
    const fetchListQc = async () => {
      const response = await fetch(`/api/cheliang/004/to-do/qc/`)
      const res = await response.json()
      if (res.message) {
        window.console.error(res.message)
        return
      }
      setDataQc(res.content)
    }
    const fetchListUser = async id => {
      const response = await fetch(`/api/cheliang/004/to-do/user/${id}/`)
      const res = await response.json()
      if (res.message) {
        window.console.error(res.message)
        return
      }
      setDataUser(res.content)
    }
    if (a.p_jsy) fetchListPjsy()
    if (a.p_dd) {fetchListPdd()}
    if (a.p_zbsz) fetchListPzbsz()
    if (a.dept_mark === '班组') fetchListTeam()
    if (a.dept_mark === '质检') fetchListQc()
    fetchListUser(a.id)
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
            <h2>一体化作业申请单 - 待处理申请</h2>
            <hr />
            <Toolbar />
            <div className="card shadow mt-2 mb-5">
              <div className="card-body">
                {dataPjsy.length > 0 && (
                  <>
                    <p className="lead text-center text-muted m-1">技术员</p>
                    <ul className="list-group">
                      {dataPjsy.map(it => (
                        <ListItem data={it} key={it.id} auth={auth} />
                      ))}
                    </ul>
                  </>
                )}
                {dataPdd.length > 0 && (
                  <>
                    <p className="lead text-center text-muted m-1">调度</p>
                    <ul className="list-group">
                      {dataPdd.map(it => (
                        <ListItem data={it} key={it.id} auth={auth} />
                      ))}
                    </ul>
                  </>
                )}
                {dataPzbsz.length > 0 && (
                  <>
                    <p className="lead text-center text-muted m-1">值班所长</p>
                    <ul className="list-group">
                      {dataPzbsz.map(it => (
                        <ListItem data={it} key={it.id} auth={auth} />
                      ))}
                    </ul>
                  </>
                )}
                {auth.dept_mark === '班组' && dataTeam.length > 0 && (
                  <>
                    <p className="lead text-center text-muted m-1">班组</p>
                    <ul className="list-group">
                      {dataTeam.map(it => (
                        <ListItem data={it} key={it.id} auth={auth} />
                      ))}
                    </ul>
                  </>
                )}
                {auth.dept_mark === '质检' && dataQc.length > 0 && (
                  <>
                    <p className="lead text-center text-muted m-1">质检</p>
                    <ul className="list-group">
                      {dataTeam.map(it => (
                        <ListItem data={it} key={it.id} auth={auth} />
                      ))}
                    </ul>
                  </>
                )}
                {dataUser.length > 0 && (
                  <>
                    <p className="lead text-center text-muted m-1">作业负责人</p>
                    <ul className="list-group">
                      {dataUser.map(it => (
                        <ListItem data={it} key={it.id} auth={auth} />
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ToDoList