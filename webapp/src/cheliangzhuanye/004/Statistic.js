import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts'
import moment from 'moment'

import { Title, Navbar } from '../../Components'
import { SideNav } from '../Components'
import { Toolbar } from './Components'

function Statistic() {
  const [stats, setStats] = React.useState(0)

  const handlePick = event => {
    setStats(event.target.value)
  }

  const renderStats = () => {
    if (stats === 'train') return <Statistic1 />
    else if (stats === 'category') return <Statistic2 />
    else if (stats === 'category.fin-ratio') return <Statistic3 />
    else return (
      <p className="lead">
        请选择统计类别
      </p>
    )
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
            <h2>一体化作业申请单 - 统计</h2>
            <hr />
            <Toolbar />

            <div className="card shadow mt-2">
              <div className="card-header">
                <select className="form-control" onChange={handlePick}>
                  <option value="">未选择</option>
                  <option value="train">作业车组数据统计</option>
                  <option value="category">计划内/外作业统计</option>
                  <option value="category.fin-ratio">计划内作业完成比例</option>
                </select>
              </div>
              
              <div className="card-body">
                {renderStats()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Statistic1() {
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/cheliang/004/statistic/train`)
      const res = await response.json()
      setData(res.content)
    }
    fetchData()
  }, [])

  return (
    <>
      <p className="lead">作业车组数据统计</p>

      <BarChart width={800} height={500} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="数量" fill="#82ca9d" />
      </BarChart>
    </>
  )
}

function Statistic2() {
  const [filter, setFilter] = React.useState({
    date_begin: moment().format('YYYY-MM-01'),
    date_end: moment().add(1, 'days').format('YYYY-MM-DD')
  })
  const [data, setData] = React.useState([])

  const handleChange = e => {
    const { value, name } = e.target
    setFilter(prev => ({ ...prev, [name]: value }))
  }

  const handleFilter = async () => {
    const response = await fetch(`/api/cheliang/004/statistic/category`, {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(filter)
    })
    const res = await response.json()
    setData(res.content)
  }

  return (
    <>
      <p className="lead">计划内/外作业统计</p>

      <div className="form-inline">
        <label>选择起止时间</label>
        <input type="date" name="date_begin" value={filter.date_begin || ''}
          className="form-control ml-2"
          onChange={handleChange}
        />
        <input type="date" name="date_end" value={filter.date_end || ''}
          className="form-control ml-2"
          onChange={handleChange}
        />

        <span className="ml-3">
          <button type="button" className="btn btn-outline-primary" onClick={handleFilter}>
            <i className="fa fa-fw fa-check"></i>
            确定
          </button>
        </span>
      </div>

      <hr />

      <BarChart width={800} height={500} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="数量" fill="#82ca9d" />
      </BarChart>
    </>
  )
}

function Statistic3() {
  const [filter, setFilter] = React.useState({
    date_begin: moment().format('YYYY-MM-01'),
    date_end: moment().add(1, 'days').format('YYYY-MM-DD')
  })
  const [data, setData] = React.useState([])

  const handleChange = e => {
    const { value, name } = e.target
    setFilter(prev => ({ ...prev, [name]: value }))
  }

  const handleFilter = async () => {
    const response = await fetch(`/api/cheliang/004/statistic/category-fin-ratio`, {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(filter)
    })
    const res = await response.json()
    setData(res.content)
  }

  return (
    <>
      <p className="text-danger"><strong>需要先完成上传作业计划及新增计划内申请部分</strong></p>
      <p className="lead">计划内作业完成比例</p>

      <div className="form-inline">
        <label>选择起止时间</label>
        <input type="date" name="date_begin" value={filter.date_begin || ''}
          className="form-control ml-2"
          onChange={handleChange}
        />
        <input type="date" name="date_end" value={filter.date_end || ''}
          className="form-control ml-2"
          onChange={handleChange}
        />

        <span className="ml-3">
          <button type="button" className="btn btn-outline-primary" onClick={handleFilter}>
            <i className="fa fa-fw fa-check"></i>
            确定
          </button>
        </span>
      </div>


    </>
  )
}

export default Statistic