import React, { useEffect, useState } from 'react'
import { Tree } from 'antd'
import type { TreeProps } from 'antd'
import { getPermissionListApi } from '../../../../services';
import { MenuItem, RoleItem } from '../../../../types'
import { DataNode, EventDataNode } from 'antd/es/tree';

interface Props{
  roles: any
}



const TreeStructure: React.FC<Props> = ({roles}) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true)
  const [treeData, setTreeData] = useState<MenuItem[]>([])

  const onExpand: TreeProps['onExpand'] = (expandedKeysValue) => {
    // console.log('onExpand', expandedKeysValue)
    // setExpandedKeys(expandedKeysValue)
    setAutoExpandParent(false)
  }

  const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue)
    setCheckedKeys(checkedKeysValue as React.Key[])
  }

  const onSelect: TreeProps['onSelect'] = (selectedKeysValue, info) => {
    console.log('onSelect', info)
    setSelectedKeys(selectedKeysValue)
  }

  const getPermissionList = async () => {
    try {
      const res = await getPermissionListApi()
      // console.log(res.data.data.list) 
      const list = res.data.data.list.map((item: MenuItem) => {
        return {
          ...item,
          title: item.name,
          key: item._id, 
          children: item.children?.map((child: MenuItem) => {
            return {
              ...child,
              title: child.name,
              key: child._id
            } 
          })
        } 
      })
      setTreeData(list)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getPermissionList()
  },[])

  useEffect(() => {
    if(roles.length > 0){
      const keys = roles.map((item: RoleItem) => {
        return item
      })
      setCheckedKeys(keys)
    }
    setExpandedKeys(treeData.map((item: MenuItem) => item._id))
  },[roles,treeData])


  return (
    <Tree
      checkable
      onExpand={onExpand}
      autoExpandParent={autoExpandParent}
      expandedKeys={expandedKeys}
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      onSelect={onSelect}
      selectedKeys={selectedKeys}
      treeData={treeData}
    />
  );
};

export default TreeStructure