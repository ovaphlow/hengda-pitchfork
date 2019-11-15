import React from 'react'

export function SideNav(props) {
  const [cat01, setCat01] = React.useState(false)
  const [cat02, setCat02] = React.useState(false)
  const [cat03, setCat03] = React.useState(false)
  const [cat04, setCat04] = React.useState(false)

  const handleClick = event => {
    const cat = event.target.getAttribute('data-cat')
    if (cat === 'cat01') setCat01(!!!cat01)
    else if (cat === 'cat02') setCat02(!!!cat02)
    else if (cat === 'cat03') setCat03(!!!cat03)
    else if (cat === 'cat04') setCat04(!!!cat04)
  }

  return (
    <div className="list-group">
      <h6 className="text-info text-center mt-2" data-cat="cat01" onClick={handleClick}>
        动车部分
        {
          cat01 ? (
            <i className="fa fa-fw fa-sort-down" data-cat="cat01"></i>
          ) : (
            <i className="fa fa-fw fa-sort-up" data-cat="cat01"></i>
          )
        }
      </h6>

      <div id="cat01" style={{display: cat01 ? 'block' : 'none'}}>
        <a href="#车辆专业/001"
            className={`text-small list-group-item list-group-item-action ${props.category === '001' ? 'active' : ''}`}
        >
          动车组运行故障登记簿
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/002"
            className={`text-small list-group-item list-group-item-action ${props.category === '002' ? 'active' : ''}`}
        >
          动车组防溜记录簿
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/003"
            className={`text-small list-group-item list-group-item-action ${props.category === '003' ? 'active' : ''}`}
        >
          随车机械师出退乘签到记录簿
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/004"
            className={`text-small list-group-item list-group-item-action ${props.category === '004' ? 'active' : ''}`}
        >
          一体化作业申请单
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/005"
            className={`text-small list-group-item list-group-item-action ${props.category === '005' ? 'active' : ''}`}
        >
          日生产交班会议记录簿
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/006"
            className={`text-small list-group-item list-group-item-action ${props.category === '006' ? 'active' : ''}`}
        >
          动车组钥匙管理记录簿
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>
      </div>

      <h6 className="text-info text-center mt-2" data-cat="cat02" onClick={handleClick}>
        客车部分
        {
          cat02 ? (
            <i className="fa fa-fw fa-sort-down" data-cat="cat02"></i>
          ) : (
            <i className="fa fa-fw fa-sort-up" data-cat="cat02"></i>
          )
        }
      </h6>

      <div id="cat02" style={{display: cat02 ? 'block' : 'none'}}>
        <a href="#车辆专业/007"
            className={`text-small list-group-item list-group-item-action ${props.category === '007' ? 'active' : ''}`}
        >
          运用故障记录
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/008"
          className={`text-small list-group-item list-group-item-action ${props.category === '008' ? 'active' : ''}`}
        >
          客车辅修(A1)修记名检修记录
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/009"
          className={`text-small list-group-item list-group-item-action ${props.category === '009' ? 'active' : ''}`}
        >
          运用列车绝缘测试记录表
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/010"
          className={`text-small list-group-item list-group-item-action ${props.category === '010' ? 'active' : ''}`}
        >
          客列尾主机综合台帐
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/011"
          className={`text-small list-group-item list-group-item-action ${props.category === '011' ? 'active' : ''}`}
        >
          发电车管理台帐
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/012"
          className={`text-small list-group-item list-group-item-action ${props.category === '012' ? 'active' : ''}`}
        >
          调度命令登记簿
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/013"
          className={`text-small list-group-item list-group-item-action ${props.category === '013' ? 'active' : ''}`}
        >
          库站乘日志
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>
      </div>

      <h6 className="text-info text-center mt-2" data-cat="cat03" onClick={handleClick}>
        通用部分
        {
          cat03 ? (
            <i className="fa fa-fw fa-sort-down" data-cat="cat03"></i>
          ) : (
            <i className="fa fa-fw fa-sort-up" data-cat="cat03"></i>
          )
        }
      </h6>

      <div id="cat03" style={{display: cat03 ? 'block' : 'none'}}>
        <a href="#车辆专业/014"
            className={`text-small list-group-item list-group-item-action ${props.category === '014' ? 'active' : ''}`}
        >
          探伤、动车镟轮、检测、试验检修记录
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/015"
            className={`text-small list-group-item list-group-item-action ${props.category === '015' ? 'active' : ''}`}
        >
          5T设备检修记录簿
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/016"
          className={`text-small list-group-item list-group-item-action ${props.category === '016' ? 'active' : ''}`}
        >
          探伤、检测、试验设备性能校验记录
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/017"
          className={`text-small list-group-item list-group-item-action ${props.category === '017' ? 'active' : ''}`}
        >
          轮对、轴承、轴箱(客车)检修记录
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/018"
          className={`text-small list-group-item list-group-item-action ${props.category === '018' ? 'active' : ''}`}
        >
          故障交接记录单
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/019"
          className={`text-small list-group-item list-group-item-action ${props.category === '019' ? 'active' : ''}`}
        >
          客车检修质量记录簿
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/020"
          className={`text-small list-group-item list-group-item-action ${props.category === '020' ? 'active' : ''}`}
        >
          客车履历卡片
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/021"
          className={`text-small list-group-item list-group-item-action ${props.category === '021' ? 'active' : ''}`}
        >
          予会检记载《特种车、新行车、事故车及重大故障》、交验中主要故障记载
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/022"
          className={`text-small list-group-item list-group-item-action ${props.category === '022' ? 'active' : ''}`}
        >
          202、206G(P)、209T(P)、209PK、209HS、211型转向架检修组装记录
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/023"
          className={`text-small list-group-item list-group-item-action ${props.category === '023' ? 'active' : ''}`}
        >
          CW-2/1、SW-160(H)、CW-200(K)、PW-220(K)、SW-220K、PW-200(K)型转向架检修组装记录
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/024"
          className={`text-small list-group-item list-group-item-action ${props.category === '024' ? 'active' : ''}`}
        >
          配件探伤记录
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/025"
          className={`text-small list-group-item list-group-item-action ${props.category === '025' ? 'active' : ''}`}
        >
          中央悬挂、轴箱定位配件检修记录
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/026"
          className={`text-small list-group-item list-group-item-action ${props.category === '026' ? 'active' : ''}`}
        >
          基础制动配件检修记录
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/027"
          className={`text-small list-group-item list-group-item-action ${props.category === '027' ? 'active' : ''}`}
        >
          202、206G(P)、209T(P)、209PK、209HS、211型转向架客车整车落成记录
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/028"
          className={`text-small list-group-item list-group-item-action ${props.category === '028' ? 'active' : ''}`}
        >
          SW-160(H)、CW-1(2)、PW-220K、CW-200(K)、PW200(K)、SW-220K转向架客车整车落成记录
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/029"
          className={`text-small list-group-item list-group-item-action ${props.category === '029' ? 'active' : ''}`}
        >
          脱轨、颠覆、焊修后构架检测记录
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/030"
          className={`text-small list-group-item list-group-item-action ${props.category === '030' ? 'active' : ''}`}
        >
          15系列车钩缓冲装置检修记录单
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/031"
          className={`text-small list-group-item list-group-item-action ${props.category === '031' ? 'active' : ''}`}
        >
          密接式车钩缓冲装置检修记录单
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/032"
          className={`text-small list-group-item list-group-item-action ${props.category === '032' ? 'active' : ''}`}
        >
          车辆上部设备设施换件及故障记录簿
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/033"
          className={`text-small list-group-item list-group-item-action ${props.category === '033' ? 'active' : ''}`}
        >
          真空集便器检修记录
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/034"
          className={`text-small list-group-item list-group-item-action ${props.category === '034' ? 'active' : ''}`}
        >
          空气制动及附属配件检修记录
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/035"
          className={`text-small list-group-item list-group-item-action ${props.category === '035' ? 'active' : ''}`}
        >
          客车车电设备补充履历
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/036"
          className={`text-small list-group-item list-group-item-action ${props.category === '036' ? 'active' : ''}`}
        >
          (AC380VDC48V)客车车电装置E2、E3修整车检修试验记录单
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/037"
          className={`text-small list-group-item list-group-item-action ${props.category === '037' ? 'active' : ''}`}
        >
          (DC600V)直供电客车车电装置E2、E3修整车检修试验记录单
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/038"
          className={`text-small list-group-item list-group-item-action ${props.category === '038' ? 'active' : ''}`}
        >
          餐车厨房(电气化厨房)检修记录
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/039"
          className={`text-small list-group-item list-group-item-action ${props.category === '039' ? 'active' : ''}`}
        >
          DC600V电源装置电容容量测试记录单
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/040"
          className={`text-small list-group-item list-group-item-action ${props.category === '040' ? 'active' : ''}`}
        >
          车端电气连接器接触电阻测试记录单
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/041"
          className={`text-small list-group-item list-group-item-action ${props.category === '041' ? 'active' : ''}`}
        >
          客车防滑器单车静止试验记录单
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/042"
          className={`text-small list-group-item list-group-item-action ${props.category === '042' ? 'active' : ''}`}
        >
          小功率柴油发电机组D、E3级检修与试验数据记录本
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/043"
          className={`text-small list-group-item list-group-item-action ${props.category === '043' ? 'active' : ''}`}
        >
          发电车柴油发电机组D、E3级检修与试验数据记录本
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/044"
          className={`text-small list-group-item list-group-item-action ${props.category === '044' ? 'active' : ''}`}
        >
          J5型发电机各部测量数据记录表
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/045"
          className={`text-small list-group-item list-group-item-action ${props.category === '045' ? 'active' : ''}`}
        >
          动力连接器检修记录单
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/046"
          className={`text-small list-group-item list-group-item-action ${props.category === '046' ? 'active' : ''}`}
        >
          应急电源检修及试验记录
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/047"
          className={`text-small list-group-item list-group-item-action ${props.category === '047' ? 'active' : ''}`}
        >
          电茶炉检修及试验记录
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/048"
          className={`text-small list-group-item list-group-item-action ${props.category === '048' ? 'active' : ''}`}
        >
          空调机组检修记录单
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/049"
          className={`text-small list-group-item list-group-item-action ${props.category === '049' ? 'active' : ''}`}
        >
          配电柜电器元件接触电阻测试记录单
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/050"
          className={`text-small list-group-item list-group-item-action ${props.category === '050' ? 'active' : ''}`}
        >
          轴端接池装置检修记录
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/051"
          className={`text-small list-group-item list-group-item-action ${props.category === '051' ? 'active' : ''}`}
        >
          蓄电池检修充放电记录表
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>
      </div>

      <h6 className="text-info text-center mt-2" data-cat="cat04" onClick={handleClick}>
        统计部分
        {
          cat04 ? (
            <i className="fa fa-fw fa-sort-down" data-cat="cat04"></i>
          ) : (
            <i className="fa fa-fw fa-sort-up" data-cat="cat04"></i>
          )
        }
      </h6>
      <div id="cat04" style={{display: cat04 ? 'block' : 'none'}}>
        <a href="#车辆专业/052"
          className={`text-small list-group-item list-group-item-action ${props.category === '052' ? 'active' : ''}`}
        >
          列车入库登记簿
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/053"
          className={`text-small list-group-item list-group-item-action ${props.category === '053' ? 'active' : ''}`}
        >
          餐车走行公里登记簿
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/054"
          className={`text-small list-group-item list-group-item-action ${props.category === '054' ? 'active' : ''}`}
        >
          客车上油记录单
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>

        <a href="#车辆专业/055"
          className={`text-small list-group-item list-group-item-action ${props.category === '055' ? 'active' : ''}`}
        >
          空调发电车燃油交接记录单
          <span className="pull-right">
            <i className="fa fa-fw fa-angle-right"></i>
          </span>
        </a>
      </div>
    </div>
  )
}
