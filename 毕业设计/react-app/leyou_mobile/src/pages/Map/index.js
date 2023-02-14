import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { requestTraverRouter } from '../../require/request'
import { lefthide, leftshow } from '../../store/reducerhande'
import './index.css'
function Maps(props) {
    const { data, requestTraverRouter, lefthide, leftshow } = props
    const params = useParams()
    useEffect(() => {
        requestTraverRouter(params.id)
        leftshow()
        return () => {
            lefthide()
        }
    }, [requestTraverRouter, leftshow, lefthide, params.id])
    useEffect(() => {
        if (data && data.length !== 0) {
            //创建地图实例
            //全局对象需要使用window访问，否则会校验错误
            const BMapGL = window.BMapGL
            const map = new BMapGL.Map("containner")
            //设置中心点坐标
            const point = new BMapGL.Point(data[0].lng, data[0].lat)
            map.centerAndZoom(point, 18)
            //开启鼠标滚轮缩放
            map.enableScrollWheelZoom(true)
            //移动地图到当前位置
            map.addControl(new BMapGL.LocationControl())
            //创建当前位置点
            map.addOverlay(new BMapGL.Marker(point))
            //将实例化后的坐标放入arr中
            const arr = []
            //将实例化后路线放入walking中
            const walking = []
            for (let i = 0; i < data.length; i++) {
                let p = new BMapGL.Point(data[i].lng, data[i].lat)
                if (i === 0) {
                    var wk = new BMapGL.WalkingRoute(map, {
                        renderOptions: { map: map, panel: '', autoViewport: false },
                        onMarkersSet: function (routes) {
                            map.removeOverlay(routes[1].marker);//删除终点
                        }
                    })
                } else if (i === data.length - 2) {
                    wk = new BMapGL.WalkingRoute(map, {
                        renderOptions: { map: map, panel: '', autoViewport: false },
                        onMarkersSet: function (routes) {
                            map.removeOverlay(routes[0].marker);//删除起点
                        }
                    })
                } else {
                    wk = new BMapGL.WalkingRoute(map, {
                        renderOptions: { map: map, panel: '', autoViewport: false },
                        onMarkersSet: function (routes) {
                            map.removeOverlay(routes[0].marker); //删除终点
                            map.removeOverlay(routes[1].marker);//删除起点
                        }
                    })
                }
                arr.push(p)
                walking.push(wk)
                map.removeOverlay(walking[i].marker)
            }
            //显示路线
            for (let j = 0; j < walking.length - 1; j++) {
                walking[j].search(arr[j], arr[j + 1])
            }
            // 开启定位
            // var geolocation = new BMapGL.Geolocation();
            // setInterval(() => {
            //     geolocation.getCurrentdata(function (r) {
            //         if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
            //             let q = new BMapGL.Point(r.point.lng, r.point.lat)
            //             let driver = new BMapGL.DrivingRoute(map, {
            //                 renderOptions: { map: map, panel: '', autoViewport: false }
            //             })
            //             map.addOverlay(new BMapGL.Marker(q))
            //             driver.search(q, arr[0])
            //         }
            //     });
            // }, 3000);
        }
    }, [data, requestTraverRouter])
    return (
        <div id='componentMap' >
            <div id='containner'>
            </div>
        </div>
    )
}

const mapReduxState = (res) => {
    return {
        data: res.traverreducer.data
    }
}
const mapReduxDispatch = {
    requestTraverRouter,
    lefthide,
    leftshow
}
export default connect(mapReduxState, mapReduxDispatch)(Maps)