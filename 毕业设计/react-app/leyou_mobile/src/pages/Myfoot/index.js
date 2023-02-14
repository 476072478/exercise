import React, { useEffect, useState } from 'react'
import { Empty } from 'antd-mobile'
import { connect } from 'react-redux'
import { requestSearch, requestmyfoot } from '../../require/request'
import Mylist from '../../components/Mylist'
import './index.css'
function Myfoot(props) {
    const { data, requestSearch, requestmyfoot, list } = props
    const [newlist, setnewlist] = useState([])
    const { id } = JSON.parse(localStorage.getItem('tokenleyou'))
    useEffect(() => {
        requestSearch()
        requestmyfoot(id)
    }, [requestSearch, requestmyfoot, id])
    useEffect(() => {
        setnewlist(datafilter())
        function datafilter() {
            let newsdata = []
            if (list) {
                for (let i = 0; i < list.length; i++) {
                    for (let j = 0; j < data.length; j++) {
                        if (JSON.stringify(data[j].id) === list[i]) {
                            newsdata.push(data[j])
                        }
                    }
                }
            }
            return newsdata
        }
    }, [data, list])
    return (
        <div>
            {
                newlist.map(item => {
                    return <Mylist {...item} key={item.id} />
                })
            }
            {newlist.length === 0 && <Empty description='暂无足迹' style={{ padding: '64px 0' }}
                imageStyle={{ width: 128 }} />}
        </div>
    )
}
const mapStoreState = (state) => {
    return {
        data: state.detailsreducer.data,
        list: state.footreducer.data
    }
}
const mapStoreDispatch = {
    requestSearch,
    requestmyfoot
}
export default connect(mapStoreState, mapStoreDispatch)(Myfoot)