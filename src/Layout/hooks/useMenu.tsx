import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { defaultRoute, MenuIcon } from './constants'

export const useMenu = () => {
  const siderMenu = useSelector((state: RootState) => state.userInfo.menuList)
  
  return { 
    path: '/',
    routes: [
      ...defaultRoute,
      ...siderMenu.map(item => {
        return{
          ...item,
          icon: MenuIcon[item.name]
        }
      })
    ]
  }
}