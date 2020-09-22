const CONFIG = {
  PORT: 8421,
  TITLE: '车辆段帐项管理系统',
  MODULE: [
    {
      TITLE: '总览',
      DIRECTORY: 'hengda-dashboard',
      PATH: '/dashboard',
    },
    {
      TITLE: '用户',
      DIRECTORY: 'hengda-user',
      PATH: '/user',
    },
    {
      TITLE: '设置',
      DIRECTORY: 'hengda-setting',
      PATH: '/setting',
    },
    {
      TITLE: '消息',
      DIRECTORY: 'hengda-message',
      PATH: '/message',
    },
    {
      TITLE: '动车组防冻排水及恢复作业记录表',
      DIRECTORY: 'hengda-harold-007',
      PATH: '/harold-007',
    },
    {
      TITLE: '空调列车外接电源供断电登记簿',
      DIRECTORY: 'hengda-nighthawk-001',
      PATH: '/nighthawk-001',
    },
    {
      TITLE: '行车影像资料检查登记簿',
      DIRECTORY: 'hengda-nighthawk-002',
      PATH: '/nighthawk-002',
    },
    {
      TITLE: '试风数据分析检查表',
      DIRECTORY: 'hengda-nighthawk-003',
      PATH: '/nighthawk-003',
    },
  ],
};

module.exports = CONFIG;
