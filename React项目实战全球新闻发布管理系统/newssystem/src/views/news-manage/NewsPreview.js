import React, { useEffect, useState } from 'react'
import { Descriptions, PageHeader } from 'antd';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
export default function NewsPreview() {
    const params = useParams()
    const [newsdata, setNewsData] = useState([])
    useEffect(() => {
        axios.get(`/news/${params.id}?_expand=category&_expand=role`).then(res => {
            setNewsData(res.data)
        })
    }, [params.id])
    const auditList = ['未审核', '审核中', '已通过', '未通过']
    const publishList = ['未发布', '待发布', '已上线', '已下线']
    const colorList = ['black', 'orange', 'green', 'red']
    return (
        <div>
            {
                newsdata.length !== 0 && < div className="site-page-header-ghost-wrapper" >
                    <PageHeader
                        ghost={false}
                        onBack={() => window.history.back()}
                        title={newsdata.title}
                        subTitle={newsdata.category.title}
                    >
                        <Descriptions size="small" column={3}>
                            <Descriptions.Item label="创建者">{newsdata.author}</Descriptions.Item>
                            <Descriptions.Item label="创建时间">{moment(newsdata.createTime).format('YYY/MM/DD HH:mm:ss')}</Descriptions.Item>
                            <Descriptions.Item label="发布时间">{newsdata.publishTime ? moment(newsdata.publishTime).format('YYY/MM/DD HH:mm:ss') : '--'}</Descriptions.Item>
                            <Descriptions.Item label="区域">{newsdata.region}</Descriptions.Item>
                            <Descriptions.Item label="审核状态"><span style={{ color: colorList[newsdata.auditState] }}>{auditList[newsdata.auditState]}</span></Descriptions.Item>
                            <Descriptions.Item label="发布状态"><span style={{ color: colorList[newsdata.publishState] }}>{publishList[newsdata.publishState]}</span></Descriptions.Item>
                            <Descriptions.Item label="访问数量">{newsdata.view}</Descriptions.Item>
                            <Descriptions.Item label="点赞数量">{newsdata.star}</Descriptions.Item>
                            <Descriptions.Item label="评论数量">0</Descriptions.Item>
                        </Descriptions>
                    </PageHeader>
                </div >
            }
            <div dangerouslySetInnerHTML={{
                __html: newsdata.content
            }} style={{ border: '1px solid gray', margin: ' 16px 24px' }}>
            </div>
        </div>

    )
}
