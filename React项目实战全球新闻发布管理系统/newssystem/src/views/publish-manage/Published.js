import React from 'react'
import NewsPublish from '../../component/pubulish-manage/NewsPublish';
import usePublish from '../../component/news-manage/usePublish';
export default function Published() {
    // 2 --- 已发布
    return (
        <NewsPublish dataSource={usePublish(2)} number={2}></NewsPublish>
    )
}
