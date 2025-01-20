import React, { useEffect, useState } from 'react'
import { Tree } from 'antd'
import type { TreeProps } from 'antd'
import { getPermissionListApi } from '../../../../services';
import { MenuItem, RoleItem } from '../../../../types'

interface Props{
  roles: RoleItem[]
}



const TreeStructure: React.FC<Props> = ({roles}) => {
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true)
  const [treeData, setTreeData] = useState<MenuItem[]>([])
  console.log(roles)

  const onExpand: TreeProps['onExpand'] = (expandedKeysValue) => {
    console.log('onExpand', expandedKeysValue)
    // setExpandedKeys(expandedKeysValue)
    setAutoExpandParent(false)
  }

  const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue)
    setCheckedKeys(checkedKeysValue as React.Key[])
  }

  const onSelect: TreeProps['onSelect'] = (selectedKeysValue, info) => {
    console.log('onSelect', info)
  }

  const getPermissionList = async () => {
    try {
      const res = await getPermissionListApi()
      console.log(res.data.data.list) 
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
    // setSelectedKeys(treeData.dis)
  },[])

  return (
    <Tree
      checkable
      onExpand={onExpand}
      autoExpandParent={autoExpandParent}
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      onSelect={onSelect}
      selectedKeys={selectedKeys}
      treeData={treeData}
    />
  );
};

export default TreeStructure