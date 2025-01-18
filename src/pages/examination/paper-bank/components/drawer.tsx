import React from 'react'
import { Button, Drawer } from 'antd'
import type {exampaperInfo} from '../../../../types'
import {getExamItemApi} from '../../../../services'
import { useState,useEffect } from 'react'
interface props{
    open:boolean,
    setOpen:(open:boolean)=>void
    row:exampaperInfo | null
}
const drawerCompoment:React.FC<props> = ({open,setOpen,row}) => {
    const [examItem, setExamItem] = useState<exampaperInfo>();
    const onClose = () => {
        setOpen(false)
    }
    const getItemdata = async() =>{
        const res=await getExamItemApi({id:row!._id})
        setExamItem(res.data.data)
    }
    useEffect(() => {
        if(row){
            getItemdata()
        }
    }, [row]);
    return (
        <Drawer 
            title="试卷预览" 
            onClose={onClose} 
            open={open}
            extra={
                <div style={{display:'flex',justifyContent:'flex-end'}}>
                    <Button size='small' style={{margin:'0 10px'}}>导出PDF</Button>
                    <Button size='small' type='primary'>ok</Button>
                </div>
            }
        >
            <div>
                <h3 style={{width:'100px', margin:'0 auto', textAlign:'center'}}>{row?.name}</h3>
                <p style={{margin:'10px auto' ,width:'100px', textAlign:'center',fontSize:'12px'}}>科目：{row?.classify}</p>
                {examItem?.questions?.map((item,index)=>{
                    return(
                        <div key={index} style={{marginBottom:'10px'}}>
                            <p style={{margin:'10px 0'}}>{index+1}.{item.question}</p>
                            <div style={{display:'flex'}}>
                                {item.options?.map((it,idx)=>{
                                    return(
                                        <p key={it} style={{margin:'10px  10px 0 0'}}>{String.fromCharCode(idx+65)}.{it}</p>
                                    )
                                })}
                            </div>
                            
                        </div>
                    )
                })}
            </div>
        </Drawer>
    )
}

export default drawerCompoment