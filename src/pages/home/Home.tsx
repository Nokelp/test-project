import React, { useEffect } from 'react'
import style from './Home.module.scss'
import { useDispatch, useSelector } from'react-redux'
import type { AppDispatch, RootState } from '../../store/index'
const Home: React.FC = () => {
  return (
    <div className={style.home}>
      Home
    </div>
  )
}

export default Home