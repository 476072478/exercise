import React from 'react'
import './index.css'
import { List } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import {
    UnorderedListOutline,
    PayCircleOutline,
    SetOutline,
} from 'antd-mobile-icons'
export default function Mymeasn() {
    const navi = useNavigate()
    return (
        <div className='mymeansBox'>
            <List>
                <List.Item prefix={<UnorderedListOutline />} onClick={() => { navi('/Changeheader', { state: { name: '更换头像' } }) }}>
                    头像
                </List.Item>
                <List.Item prefix={<PayCircleOutline />} onClick={() => { }}>
                    昵称
                </List.Item>
                <List.Item prefix={<SetOutline />} onClick={() => { }}>
                    邮箱
                </List.Item>
            </List>
        </div >
    )
}
