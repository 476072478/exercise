import React from 'react'
import NewsPublish from '../../component/pubulish-manage/NewsPublish';
import usePublish from '../../component/news-manage/usePublish';
export default function Unpublished() {
    // 1 --- 未发布
    return (
        <NewsPublish dataSource={usePublish(1)} number={1}></NewsPublish>
    )
}
