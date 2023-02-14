import React, { useEffect, useState } from 'react'
import './index.css'
import { connect } from 'react-redux'
import { requestSearch } from '../../require/request'
import { SearchBar } from 'antd-mobile'
import { lefthide, leftshow, righthide, rightshow } from '../../store/reducerhande'
function Details(state) {
    const { data, requestSearch, righthide, rightshow, leftshow, lefthide } = state
    const [search, setSearch] = useState(data)
    useEffect(() => {
        //根据Id发送数据
        requestSearch()
        //左侧图标显示
        leftshow()
        //navbar右侧图标隐藏
        righthide()
        return () => {
            //离开页面navbar右侧图标显示
            rightshow()
            //左侧图标隐藏
            lefthide()
        }
    }, [requestSearch, righthide, rightshow, leftshow, lefthide])
    useEffect(() => {
        //将数据存储到filters中
        setSearch(data)
    }, [data])
    function filter(value) {
        let newsearch = data.filter(item => item.name.includes(value))
        setSearch(newsearch)
    }
    return (
        <div>
            {/* 搜索框 */}
            <div className='DetailsSearchBox'>
                <SearchBar
                    placeholder='请输入查询内容'
                    style={{
                        '--border-radius': '100px',
                        '--background': '#ffffff',
                        '--height': '32px',
                        '--padding-left': '12px',
                    }}
                    onChange={(value) => { filter(value) }}
                    className='DetailsSearch'
                />
            </div>
            <div>
                {/* 渲染列表 */}
                {
                    search.length !== 0 && <ul className='DetailsUl'>
                        {search.map(item => {
                            return <li className='DetailsLi' key={item.id}>
                                <div>
                                    <img alt='' src={item.imgsrc} width='100%' height='100%'></img>
                                </div>
                                <div className='DetailsText'>
                                    <div>
                                        <div className='Detailsname'>
                                            {item.name}
                                        </div>
                                        <div className='Detailsjieshao' >
                                            {item.text}
                                        </div>
                                        <div className='Detailsposition' >
                                            {item.position}
                                        </div>
                                    </div>
                                    <div>
                                        <div className='Detailsprice'>
                                            {item.price}元/起
                                        </div>
                                        <div className='Detailsfraction'>
                                            评分：{item.fraction}/5
                                        </div>
                                    </div>
                                </div>
                            </li>
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
    requestSearch,
    righthide,
    rightshow,
    leftshow,
    lefthide
}
export default connect(mapStoreState, mapStoreDispatch)(Details)