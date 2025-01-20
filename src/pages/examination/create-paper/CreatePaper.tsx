import type { ProFormInstance } from '@ant-design/pro-components'
import {
  
  ProCard,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormRadio,
} from '@ant-design/pro-components'
import { Button, message } from 'antd'
import { useRef,useState,useEffect } from 'react'
import { Descriptions,Divider,List } from 'antd'
import {getExamApi} from '../../../services/index'
import type { exampaperInfo,questionItem} from '../../../types'
import Modal from './components/modal'
import {createExampaper} from '../../../services/index'

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

type FieldType = {
  count?: number
}

export default () => {
  const formRef = useRef<ProFormInstance>()
  const [curValue, setCurValue] = useState('a')
  const [examList, setexamList] = useState<exampaperInfo[]>([])
  const [title, setTitle] = useState<string | null>(null)
  const [name, setName] = useState<string>()
  const [qustions, setQustions] = useState<questionItem[]>([])
  const [examDatasource, setExamDatasource] = useState<questionItem[]>([])

  const [modalVisible, setModalVisible] = useState<boolean>(false)

  // 初始化状态变量
  const [inputValue, setInputValue] = useState(0)
 
  // 处理输入变化
  const handleChange:React.ChangeEventHandler<HTMLInputElement>= (event) => {
    if(Number(event.target.value)>10){
      message.error('最多只能选择10道题')
      setInputValue(10)
    }else if(Number(event.target.value)<0){
      
      setInputValue(0)
    }
    
    setInputValue(Number(event.target.value)) // 更新状态
  }



  const getExamList = async () => {
    try{
      const res = await getExamApi({})
      if(res.data.code===200){
        setexamList(res.data.data.list)
      }else{
        message.error('获取失败')
      }
    }catch(e){
      console.log(e)
    }
  }
  console.log(qustions)
  useEffect(() => {
    getExamList()
  }, [])
  return (
    <>
    <Modal 
    modalVisible={modalVisible}  setModalVisible={setModalVisible}  title={title} setQustions={setQustions}
    setExamDatasource={setExamDatasource} examDatasource={examDatasource}
    />
    <ProCard>
      <StepsForm<{
        name: string;
      }>
        formRef={formRef}
        onFinish={async () => {
          const res=await createExampaper({
            name: name!,
            classify: title!,
            questions: qustions,
          })
          if(res.data.code===200){
            message.success('创建成功')
          }else{
            message.error('创建失败')
          }
        }}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
      >
        <StepsForm.StepForm<{
          name: string
        }>
          name="base"
          title="试卷基础信息"
          // stepProps={{
          //   description: '这里填入的都是基本信息',
          // }}
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            setName(formRef.current?.getFieldsValue().name)
            console.log(name)
            await waitTime(2000)
            return true
          }}
        >
          <ProFormText
            name="name"
            label="试卷名称"
            width="md"
            tooltip="最长为 24 位，用于标定的唯一 id"
            placeholder="请输入名称"
            rules={[{ required: true }]}
            
          />
          <ProFormTextArea
            name="remark"
            label="备注"
            width="lg"
            placeholder="请输入备注"
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm<{
          checkbox: string;
        }>
          name="checkbox"
          title="选择组卷方式&科目"
          // stepProps={{
          //   description: '这里填入运维参数',
          // }}
          onFinish={async () => {
            // console.log(formRef.current?.getFieldsValue())
            
            return true
          }}
        >
          <ProFormSelect
            name="checkbox"
            label="科目"
            width="lg"
            valueEnum={new Map(examList?.map((item)=>[item.classify,item.classify]))}
            onChange={(e:string)=>{
              // console.log(e)
              setTitle(e)
            }}
          />

          <ProFormRadio.Group
          name="radio-button"
          label="组卷方式"
          radioType="button"
          initialValue='a'
          fieldProps={{
            value: curValue,
            onChange: (e) => setCurValue(e.target.value),
          }}
          options={[
            {
              label: '选题组卷',
              value: 'a',
            },
            {
              label: '随机组卷',
              value: 'b',
            },
          ]}
        />
        {
          curValue==='a'?<Button type='primary' style={{marginBottom:'20px'}}
          onClick={()=>{
            setModalVisible(true)
          }}
          >选择试题</Button>:
        <div style={{display:'flex',alignItems:'center',marginBottom:'15px'}}>
          <p>试题数量:</p>
          <input type="number" value={inputValue}  min={0} max={10} style={{margin:'0 5px',width:'60px'}}
            onChange={handleChange}
          />
          <Button type='primary' size='small'
          onClick={()=>{
            const len=examDatasource.length
            let newArry=[...examDatasource]
            if(len<inputValue ){
              message.error('试题数量不足')
            }else {
              // const randomArray = newArry.sort(() => Math.random() - 0.5).slice(0, inputValue)
              // setQustions(randomArray)
              for (let i = newArry.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArry[i], newArry[j]] = [newArry[j], newArry[i]] // 交换元素
              }
              setQustions(()=>newArry.slice(0, inputValue))
            }
          }}
          >确定</Button>
        </div>
      }
        </StepsForm.StepForm>

        <StepsForm.StepForm
          name="time"
          title="展示试卷基本信息"
        >
          <Descriptions title="试卷信息">
            <Descriptions.Item label="试卷名称">{name}</Descriptions.Item>
            <Descriptions.Item label="组卷方式">{curValue==='a'?'选题组卷':'随即组卷'}</Descriptions.Item>
            <Descriptions.Item label="科目">{title}</Descriptions.Item>
            <Descriptions.Item label="备注">备注</Descriptions.Item>
          </Descriptions>
          <Divider orientation="left">试题展示</Divider>
            <List
              header={<div>题目列表</div>}
              bordered
              dataSource={qustions}
              renderItem={(item) => (
                <List.Item key={item._id}>
                  科目：{item.classify}|题目：{item.question}|答案：{item.answer}
                </List.Item>
              )}
            />
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
    </>
  )
}