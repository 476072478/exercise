import React, { useEffect, useState } from 'react'
import './index.css'
import { connect } from 'react-redux'
import { requestPost, requestSortList, requestFollow } from '../../require/request'
import { SearchBar, CapsuleTabs } from 'antd-mobile'
import { useParams } from 'react-router-dom'
import { lefthide, leftshow, righthide, rightshow } from '../../store/reducerhande'
import Mylist from '../../components/Mylist'
function Details(state) {
    const { data, requestPost, requestSortList, righthide, rightshow, leftshow, lefthide, requestFollow } = state
    const location = useParams()
    const { id } = location
    const [search, setSearch] = useState(data)
    useEffect(() => {
        //根据Id发送数据
        requestPost(id)
        //navbar右侧图标隐藏
        righthide()
        //navbar左侧图标显示
        leftshow()
        requestFollow()
        //历史记录插入数据表
        return () => {
            //navbar右侧图标显示
            rightshow()
            //navbar左侧图标隐藏
            lefthide()
        }
    }, [id, requestPost, righthide, rightshow, leftshow, lefthide, requestFollow])
    useEffect(() => {
        //将请求回的数据放入search中
        setSearch(data)
    }, [data])
    function filter(value) {
        //根据用户输入的内容进行内容过滤
        let newsearch = data.filter(item => item.name.includes(value))
        //将过滤后的数据放入search中
        setSearch(newsearch)
    }
    function classification(key) {
        let arr = key.split('.')
        requestSortList(arr[0], arr[1], id)
    }
    return (
        <div>
            <SearchBar
                placeholder='请输入查询内容'
                style={{
                    "width": "80%",
                    "margin": "0 auto",
                    '--border-radius': '100px',
                    '--background': '#f5f5f5',
                    '--height': '32px',
                    '--padding-left': '12px',
                }}
                onChange={(value) => { filter(value) }}
            />
            <CapsuleTabs onChange={(key) => { classification(key) }}>
                <CapsuleTabs.Tab title='价格升序' key='price.ASC' />
                <CapsuleTabs.Tab title='价格降序' key='price.DESC' />
                <CapsuleTabs.Tab title='评分降序' key='fraction.DESC' />
            </CapsuleTabs>
            <div>
                {/* 使用searc里面的数据渲染列表 */}
                {
                    search.length !== 0 && <ul className='DetailsUL'>
                        {search.map(item => {
                            return <Mylist {...item} key={item.id} />
                        })}
                    </ul>
                }
            </div>
        </div>
    )
}

const mapStoreState = (state) => {
    return {
        data: state.detailsreducer.data
    }
}
const mapStoreDispatch = {
    requestPost,
    requestSortList,
    righthide,
    rightshow,
    leftshow,
    lefthide,
    requestFollow
}
export default connect(mapStoreState, mapStoreDispatch)(Details)