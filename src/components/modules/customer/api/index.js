import api from './modules';

//  在开发模式下并且开启模拟数据开关的时候才加载模拟数据
if (process.env.NODE_ENV === 'development' && process.mockData) {
  require('./mock_data');
}
export default api;
