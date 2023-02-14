import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Empty } from 'antd-mobile'
import { lefthide, leftshow, righthide, rightshow } from '../../store/reducerhande'
import { requestSearch } from '../../require/request'
import Mylist from '../../components/Mylist'
function Collection(state) {
    const { lefthide, leftshow, righthide, rightshow, requestSearch, data, check } = state
    const [newdata, setnewdata] = useState([])
    useEffect(() => {
        leftshow()
        //请求所有景点信息
        requestSearch()
        return () => {
            lefthide()
        }
    }, [lefthide, leftshow, righthide, rightshow, requestSearch])
    useEffect(() => {
        //将景点信息根据用户关注筛选
        setnewdata(data.filter(item => {
            return check.join(',').includes(item.id)
        }))
    }, [data, setnewdata, check])
    return (
        <div>
            {/* 展示用户关注信息 */}
            {newdata.map(item => {
                return <Mylist key={item.id} {...item} />
            })}
            {
                newdata.length === 0 && <Empty description='暂无收藏内容' style={{ padding: '64px 0' }}
                    imageStyle={{ width: 128 }} />
            }
        </div>
    )
}
const mapStoreState = (data) => {
    return {
        data: data.detailsreducer.data,
        check: data.appreducer.data
    }
}
const mapStoreDispatch = {
    lefthide,
    leftshow,
    righthide,
    rightshow,
    requestSearch
}
export default connect(mapStoreState, mapStoreDispatch)(Collection)