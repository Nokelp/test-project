import React from 'react'
import { useSelector, UseSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/index'
const Role = () => {
    const classList = useSelector((state:RootState) => state)
  return (
    <div>Role</div>
  )
}

export default Role