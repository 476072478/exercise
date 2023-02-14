//旅游线路的redux——reducer配置
const listreducer = (prevState = { data: [] }, action) => {
    let newState = { ...prevState }
    switch (action.type) {
        case "requestIntroduce":
            newState.data = action.data
            return newState
        default:
            return prevState
    }
}
export default listreducer