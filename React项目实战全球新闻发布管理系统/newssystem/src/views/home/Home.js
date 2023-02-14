import React, { useEffect, useRef, useState } from 'react'
import { Card, Col, Row, List, Avatar, Drawer } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import * as echarts from 'echarts';
import axios from 'axios'
import _ from 'lodash'
const { Meta } = Card;
export default function Home() {
    const [userviews, setUserviews] = useState([])
    const [usergive, setUsergive] = useState([])
    const [alllist, setAlllist] = useState([])
    const [visible, setVisible] = useState(true)
    const [pieinit, setPieinit] = useState(null)
    const { username, region, role: { roleName } } = JSON.parse(localStorage.getItem('token'))
    const main = useRef()
    const pieref = useRef()
    const userInfo = `${region ? region : '全球'} ${roleName}`
    useEffect(() => {
        axios.get('/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6').then(res => {
            setUserviews(res.data)
        })
        axios.get('/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6').then(res => {
            setUsergive(res.data)
        })
        setVisible(false)
    }, [])
    useEffect(() => {
        axios.get('/news?_expand=category&publishState=2').then(res => {
            let newsdata = _.groupBy(res.data, item => item.category.title)
            let newarray = []
            let newfigures = []
            for (let i in newsdata) {
                newarray.push(i)
                newfigures.push(newsdata[i].length)
            }
            renderBarView(newarray, newfigures)
            setAlllist(res.data)
        })
    }, [])
    useEffect(() => {
        axios.get('/news')
        return () => {
            window.onresize = null
        }
    }, [])
    const renderBarView = (data, seriesdata) => {
        const myChart = echarts.init(main.current);
        // 指定图表的配置项和数据
        const option = {
            title: {
                text: '新闻分类图示'
            },
            tooltip: {},
            legend: {
                data: ['数量']
            },
            xAxis: {
                data: data,
                axisLabel: {
                    rotate: 50
                }
            },
            yAxis: {
                minInterval: 1
            },
            series: [
                {
                    name: '数量',
                    type: 'bar',
                    data: seriesdata
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.onresize = () => {
            myChart.resize()
        }
    }
    const onOption = () => {
        setVisible(true)
        renderpieref()
    }
    const onClose = () => {
        setVisible(false);
    };
    const renderpieref = () => {
        //数据处理工作
        var currentlist = alllist.filter(item => item.author === username)
        var groupObj = _.groupBy(currentlist, item => item.category.title)
        var list = []
        for (let i in groupObj) {
            list.push({ name: i, value: groupObj[i].length })
        }
        var myChart
        if (!pieinit) {
            myChart = echarts.init(pieref.current)
            setPieinit(myChart)
        } else {
            myChart = pieinit
        }
        const option = {
            title: {
                text: '当前用户新闻分类图示',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: '发布数量',
                    type: 'pie',
                    radius: '50%',
                    data: list,
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            ]
        };
        myChart.setOption(option);
    }
    return (
        <div>
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="用户最常浏览" bordered>
                        <List
                            size="large"
                            dataSource={userviews}
                            renderItem={(item) => <List.Item><a href={`#/news-manage/preview/${item.id}`}>{item.title}</a></List.Item>}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="用户点赞最多" bordered>
                        <List
                            size="large"
                            dataSource={usergive}
                            renderItem={(item) => <List.Item><a href={`#/news-manage/preview/${item.id}`}>{item.title}</a></List.Item>}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        style={{
                            width: 300,
                        }}
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                        actions={[
                            <SettingOutlined key="setting" onClick={onOption} />,
                            <EditOutlined key="edit" />,
                            <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title={username}
                            description={userInfo}
                        />
                    </Card>
                </Col>
            </Row>
            <div ref={main} style={{ height: '400px', marginTop: '30px', width: '100%' }}></div>
            <Drawer title="个人新闻分类" placement="right" onClose={onClose} visible={visible} width='500px'>
                <div ref={pieref} style={{ height: '400px', marginTop: '30px', width: '100%' }}></div>
            </Drawer>
        </div >
    )
}
