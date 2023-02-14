import { useEffect, useState } from 'react'
import axios from 'axios'
function usePublish(data) {
    const [dataSource, setDataSource] = useState([])
    const { username } = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        axios.get(`/news?author=${username}&publishState=${data}&_expand=category`).then(res => {
            setDataSource(res.data)
        })
    }, [username, data])
    return dataSource
}
export default usePublish