import React, { useEffect, useRef, useState } from 'react'
import { Button, PageHeader, Steps, Form, Input, Select, message, notification } from 'antd';
import style from './NewsAdd.module.css'
import axios from 'axios'
import NewsManage from '../../component/news-manage/NewsManage';
import { useNavigate } from 'react-router-dom'
const { Step } = Steps;
const { Option } = Select;
export default function NewsAdd() {
  const [stepCurrent, setStepCurrent] = useState(0)
  const [datacategories, setDatacategories] = useState([])
  const [formInfo, setFormInfo] = useState()
  const [content, setContent] = useState('')
  const NewsForm = useRef()
  const users = JSON.parse(localStorage.getItem('token'))
  const { region, username, roleId } = users
  const navigate = useNavigate()
  const toNext = () => {
    if (stepCurrent === 0) {
      NewsForm.current.validateFields().then(res => {
        setFormInfo(res)
        setStepCurrent(stepCurrent + 1)
      }).catch(err => { })
    } else {
      if (content === '' || content.trim() === '<p></p>') {
        message.error('新闻内容不能为空')
      } else {
        setStepCurrent(stepCurrent + 1)
      }
    }
  }
  const toBack = () => {
    setStepCurrent(stepCurrent - 1)
  }
  const getNewManagedata = (data) => {
    setContent(data)
  }
  const keepdrafts = (auditState) => {
    axios.post('/news', {
      ...formInfo,
      "content": content,
      "region": region ? region : '全球',
      "author": username,
      "roleId": roleId,
      "auditState": auditState,
      "publishState": 0,
      "createTime": Date.now(),
      "star": 0,
      "view": 0,
    }).then(res => {
      notification.info({
        message: `通知`,
        description:
          `您可以到${auditState === 0 ? '草稿箱' : '审核新闻中'}查看您的新闻`,
        placement: 'bottomRight'
      });
      navigate(auditState === 0 ? '/news-manage/draft' : '/audit-manage/audit')
    })
  }
  useEffect(() => {
    axios.get('/categories').then(res => { setDatacategories(res.data) })
  }, [])
  return (
    <div>
      <PageHeader
        className="site-page-header"
        title="撰写新闻"
      />
      <Steps current={stepCurrent}>
        <Step title="基本信息" description="新闻标题，新闻分类" />
        <Step title="新闻内容" description="新闻主体内容" />
        <Step title="新闻提交" description="保存草稿或者提交审核" />
      </Steps>
      <div style={{ marginTop: '30px' }}>
        <div className={stepCurrent === 0 ? '' : style.hidden}>
          <Form
            name="basic"
            ref={NewsForm}
          >
            <Form.Item
              label="新闻标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: '请输入新闻标题!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="categoryId"
              label="新闻分类"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '请选择新闻类别!',
                },
              ]}
            >
              <Select>
                {
                  datacategories.map(item => {
                    return <Option value={item.id} key={item.id}>{item.title}</Option>
                  })
                }
              </Select>
            </Form.Item>
          </Form>
        </div>
        <div className={stepCurrent === 1 ? '' : style.hidden}>
          <NewsManage getContent={(data) => { getNewManagedata(data) }} />
        </div>
        <div className={stepCurrent === 2 ? '' : style.hidden}>
          3333
        </div>
      </div>
      <div style={{ marginTop: '30px' }}>
        {
          stepCurrent === 2 && <span>
            <Button type='primary' onClick={() => { keepdrafts(0) }}>保存草稿箱</Button>
            <Button danger onClick={() => { keepdrafts(1) }}>提交审核</Button>
          </span>
        }
        {stepCurrent > 0 && <Button onClick={toBack} type='primary'>上一步</Button>}
        {stepCurrent < 2 && < Button onClick={toNext} type='primary'>下一步</Button>}
      </div>
    </div >
  )
}
