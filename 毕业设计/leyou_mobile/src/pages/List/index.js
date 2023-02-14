import React, { useEffect } from 'react'
import { Image, List } from 'antd-mobile'
import { connect } from 'react-redux'
import { requestIntroduce } from '../../require/request'
import { useNavigate } from 'react-router-dom'
function Lists(props) {
    const navigate = useNavigate()
    const { data, requestIntroduce } = props
    useEffect(() => {
        requestIntroduce()
    }, [requestIntroduce])
    return (
        <List>
            {data.map(item => {
                return <List.Item prefix={
                    <Image
                        src={item.imgsrc}
                        fit='cover'
                        width={80}
                        height={80}
                    />}
                    description={item.introduce}
                    key={item.Id}
                    onClick={() => { navigate(`/map/${item.Id}`, { state: { name: `${item.name}旅游线路推荐` } }) }}
                >
                    {item.name}
                </List.Item>
            })}
        </List>
    )
}
const mapReduxState = (state) => {
    return {
        data: state.listreducer.data
    }
}
const mapReduxDispatch = {
    requestIntroduce,
}
export default connect(mapReduxState, mapReduxDispatch)(Lists)