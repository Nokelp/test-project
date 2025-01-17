import routerConfig from './router/index'
import { useRoutes,useLocation } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import {RootState,AppDispatch} from './store'
import * as React from 'react';
import {  useEffect } from 'react';
import {getInfo} from './store/models/userInfo'
import { Spin } from 'antd';
const App:React.FC = () => {
  const routes = useRoutes(routerConfig)
  const dispatch = useDispatch<AppDispatch>()
  const loading = useSelector((state:RootState) => state.userInfo.loading)
  const location = useLocation()


  useEffect(() => {
    if(location.pathname !== '/user/login') {
      dispatch(getInfo())
      console.log('~~~~',123)
    }
  }, [location.pathname]);
  return (
    <Spin size='large' spinning={loading}>
      <div style={{width:'100vw',minHeight:'100vh'}}>
        {routes}
      </div>
    </Spin>
  )
}
export default App