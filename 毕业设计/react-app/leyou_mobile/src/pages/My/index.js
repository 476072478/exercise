import React, { useEffect, useState } from 'react'
import './index.css'
import { Modal } from 'antd-mobile'
import { CollectMoneyOutline, AddSquareOutline, FrownOutline, QuestionCircleOutline, AntOutline, UserContactOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
const demoSrc =
    'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60'
export default function My() {
    const navigate = useNavigate()
    const [myInfo, setmyInfo] = useState()
    useEffect(() => {
        setmyInfo(JSON.parse(localStorage.getItem('tokenleyou')))
    }, [])
    async function cleartokenleyou() {
        const result = await Modal.confirm({
            content: '确定要退出吗？',
        })
        if (result) {
            localStorage.clear('tokenleyou')
            setmyInfo(JSON.parse(localStorage.getItem('tokenleyou')))
        }
    }
    return (
        <div>
            <div>
                <div style={{ "background": "#fea401" }}>
                    <div className='infomsg'>
                        <div>
                            <img src={demoSrc} alt='' width={64} height={64} />
                        </div>
                        {myInfo ? <p>{myInfo.username}</p> : <p>登录</p>}
                        {myInfo ? <span>{myInfo.email}</span> : <span>邮箱</span>}
                    </div>
                    {myInfo ? <div className='componentMy'></div> : <div className='componentMy' onClick={() => { navigate('/login', { state: { name: '登录' } }) }}>

                    </div>}
                </div>
                {myInfo && <div className='componentBox'>
                    <div className='componentMybox' onClick={() => { navigate('/mymeans', { state: { name: '编辑资料' } }) }}>
                        <div><CollectMoneyOutline /></div>
                        <p>编辑资料</p>
                    </div>
                    <div className='componentMybox' onClick={() => { navigate('/mycollection', { state: { name: '我的收藏' } }) }}>
                        <div><AddSquareOutline /></div>
                        <p>我的收藏</p>
                    </div>
                    <div className='componentMybox'>
                        <div><FrownOutline /></div>
                        <p>我要吐槽</p>
                    </div>
                    <div className='componentMybox'>
                        <div><QuestionCircleOutline /></div>
                        <p>调查问卷</p>
                    </div>
                    <div className='componentMybox' onClick={() => { navigate('/myfoot', { state: { name: '我的足迹' } }) }}>
                        <div><AntOutline /></div>
                        <p>我的足迹</p>
                    </div>
                    <div className='componentMybox' onClick={cleartokenleyou}>
                        <div><UserContactOutline /></div>
                        <p>退出登录</p>
                    </div>
                </div>}
            </div>
        </div >
    )
}
