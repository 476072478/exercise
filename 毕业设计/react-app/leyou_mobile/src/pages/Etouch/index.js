import React, { useEffect, useState } from 'react'
import './index.css'
import { requestetouch } from '../../require/request'
import yintian from './img/yintian.png'
import duoyun from './img/duoyun.png'
import qingtian from './img/qingtian.png'
export default function Etouch() {
    const [mytouch, settouch] = useState({})
    useEffect(() => {
        requestetouch('成都').then(res => settouch(res.data.data))
    }, [])
    return (
        <div>
            {mytouch.forecast && mytouch.forecast.map((item, index) => {
                return <div className='EtouchBox' key={item.date}>
                    <div className='Etouchtemperature'>
                        <p>{item.low} {item.high}</p>
                        <div>{item.type === '阴' ?
                            <img alt='' src={yintian} width='100%' height='100%'></img> :
                            item.type === '多云' ?
                                <img alt='' src={duoyun} width='100%' height='100%'></img> :
                                <img alt='' src={qingtian} width='100%' height='100%'></img>
                        }</div>
                    </div>
                    <div className='Etouchtime'>
                        <p>{item.fengxiang} {item.type}</p>
                        <p>{item.date}</p>
                        {index === 0 && <p>{mytouch.ganmao}</p>}
                    </div>
                </div>
            })}
        </div>
    )
}
