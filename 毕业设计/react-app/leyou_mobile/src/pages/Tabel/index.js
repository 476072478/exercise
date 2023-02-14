import React, { useEffect, useState } from 'react'
import './index.css'
import Comment from '../../components/Comment'
import { useParams } from 'react-router-dom'
import { List, Image, Swiper, Empty } from 'antd-mobile'
import { connect } from 'react-redux'
import { requestTabel, requestischeck, requestFollow } from '../../require/request'
import { requestUserfoot } from '../../require/request'
import { righthide, leftshow, rightshow, lefthide, tabbarhide, tabbarshow } from '../../store/reducerhande'
function Tabel(state) {
    const { data, requestTabel, righthide, leftshow, rightshow, lefthide, tabbarhide, tabbarshow, requestFollow } = state
    const { isCheck } = state
    const [isOpen, setisOpen] = useState(true)
    const [isChecks, setisChecks] = useState(false)
    const [sonComment, setComment] = useState(true)
    const params = useParams()
    const { id } = params
    const { id: user_id } = JSON.parse(localStorage.getItem('tokenleyou'))
    useEffect(() => {
        //发送请求
        requestTabel(id)
        righthide()
        leftshow()
        tabbarhide()
        //判断当前页面是否已被收藏
        setisChecks(isCheck.includes(id))
        //用户浏览历史
        requestUserfoot(user_id, id)
        //控制tabbar隐藏
        return () => {
            rightshow()
            lefthide()
            //tabbar显示
            tabbarshow()
        }
    }, [requestTabel, id, righthide, leftshow, rightshow, lefthide, tabbarhide, tabbarshow, isCheck, sonComment, user_id])
    function soncomponent() {
        setComment(!sonComment)
    }
    function open() {
        //修改isOpen状态
        setisOpen(!isOpen)
    }
    function addcheck() {
        //修改关注状态
        requestischeck(id).then(res => { requestFollow() })
    }
    return (
        <div className='Tabelbottom'>
            {data.length !== 0 && <div className='componentTabel'>
                <div className='TabelImg'>
                    {data[2].length !== 0 && <Swiper indicator={(total, current) => <div className='customIndicator'>{current + 1}/{total}</div>}>
                        {data[2].map(item => {
                            return <Swiper.Item key={item.id}>
                                <img alt='' src={item.imgsrc}></img>
                            </Swiper.Item>
                        })}
                    </Swiper>}
                </div>
                <div className='TabelName'>
                    <p>
                        {data[0].name}
                    </p>
                    {isChecks ?
                        <div className='NameBox' onClick={addcheck}>
                            - 已关注
                        </div> :
                        <div className='NameBox' onClick={addcheck}>
                            + 关注
                        </div>}
                </div>
                <div className='TabelRanking'>
                    {data[0].ranking}
                </div>
                <div className='TabelPosition'>
                    <div>
                        {data[0].label}
                    </div>
                    <div>
                        {data[0].position}
                    </div>
                </div>
                <p className='TabelSign'>
                    {data[0].bigname}
                </p>
                <p className={isOpen ? 'Text TabelText' : 'Text TabelTextactive'}>
                    {data[0].detailText}
                </p>
                <p className='Tabelheight' onClick={open}>
                    {isOpen ? '展开' : '收起'}
                </p>
                <div className='TabelLike'>
                    <div>
                        评价
                    </div>
                </div>
                <hr />
                <div className='TabelComment'>
                    {data[1].length > 0 ? <List header='游客评论'>
                        {data[1].map(item => {
                            return <List.Item prefix={
                                <Image
                                    style={{ borderRadius: 20 }}
                                    fit='cover'
                                    width={50}
                                    height={50}
                                />}
                                description={item.usertext}
                                key={item.id}
                            >
                                {item.username}
                            </List.Item>
                        })}
                    </List> : <Empty
                        style={{ padding: '64px 0' }}
                        imageStyle={{ width: 128 }}
                        description='暂无游客评论'
                    />}
                </div>
            </div >
            }
            <Comment soncomponent={soncomponent} />
        </div>
    )
}
const mapReduxState = (state) => {
    return {
        data: state.tablereducer.data,
        isCheck: state.appreducer.data
    }
}
const mapReduxdispatch = {
    requestTabel,
    righthide,
    leftshow,
    rightshow,
    lefthide,
    tabbarhide,
    tabbarshow,
    requestFollow
}
export default connect(mapReduxState, mapReduxdispatch)(Tabel)