import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import type { MenuItem } from '../../types'
import { defaultRoute, MenuIcon } from './constants'

type Menu = MenuItem & {icon: React.ReactNode}

const formatMenu = (menuList: MenuItem[]): Menu[] => {
  return menuList.map(item => {
    const childrenObj = item.children? formatMenu(item.children) : []
    return {
      ...item,
      icon: MenuIcon[item.name],
      ...childrenObj 
    }
  })
}



export const useMenu = () => {
  const siderMenu = useSelector((state: RootState) => state.userInfo.menuList)
  
  return { 
    path: '/',
    routes: [
      ...defaultRoute,
      ...formatMenu(siderMenu)
    ]
  }
}