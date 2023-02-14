import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Box from '../../components/Box'
import Swipers from '../../components/Swipers'
import { requestSwiper } from '../../require/request'
function Home(state) {
    const { data, requestSwiper } = state
    useEffect(() => {
        if (data.length === 0) {
            requestSwiper()
        }
    }, [data, requestSwiper])
    return (
        <div>
            <Swipers data={data} />
            <Box data={['武侯景区', '武侯酒店', '武侯美食']}></Box>
        </div>
    )
}
const mapReduxState = (state) => {
    return {
        data: state.homereducer.data
    }
}
const mapReduxDispatch = {
    requestSwiper
}
export default connect(mapReduxState, mapReduxDispatch)(Home)