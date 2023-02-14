import React from 'react'
import './index.css'
import { Swiper } from 'antd-mobile'
export default function Swipers(props) {
    const { data } = props
    return (
        <div className='componentSwipers'>
            {data.length > 0 && <Swiper loop autoplay style={{
                '--border-radius': '10px',
            }}>
                {data.map(item => {
                    return <Swiper.Item key={item.id}>
                        <img alt='' src={item.imgSrc} width='100%' height='200px'></img>
                    </Swiper.Item>
                })}
            </Swiper>}
        </div>
    )
}
