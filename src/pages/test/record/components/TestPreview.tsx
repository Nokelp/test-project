import React, { useState } from 'react'
import { Drawer } from 'antd'
import { ExamRecordItem } from '../../../../types'

interface Props {
  onClose: () => void
  open: boolean 
  testItem: ExamRecordItem | null
}

const TestPreview: React.FC<Props> = ({onClose, open, testItem}) => {
  const [arr, setArr] = useState(['A', 'B', 'C', 'D', 'E', 'F'])

  console.log(testItem)
  return (
    <Drawer title="试卷预览" onClose={onClose} open={open} width={800}>
      <div>
        <h2 style={{textAlign: 'center', marginBottom: 15}}>{testItem?.name}</h2>
        <p style={{textAlign: 'center'}}>{testItem?.classify}</p>
        <div style={{fontSize: 16}}>
          {testItem?.questionsList.map((item, i) =>
            <div key={item._id}>
              <p style={{margin: 10}}>{i+1}、{item.question}</p>
              <div>
                {item.options.map((ite,idx) => 
                    <span key={idx} style={{margin: '10px 0 0 30px'}}>{arr[idx]}、{ite}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  )
}

export default TestPreview