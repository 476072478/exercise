const homereducer = (prevState = { data: [] }, action) => {
    let newState = { ...prevState }
    switch (action.type) {
        case "requestSwiper":
            newState.data = action.data
            return newState
        default:
            return prevState
    }
}
export default homereducer 