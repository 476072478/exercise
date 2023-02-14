import React from 'react'
import NewsPublish from '../../component/pubulish-manage/NewsPublish';
import usePublish from '../../component/news-manage/usePublish';
export default function Sunset() {
    // 3 --- 已下线
    return (
        <NewsPublish dataSource={usePublish(3)} number={3}></NewsPublish>
    )
}
