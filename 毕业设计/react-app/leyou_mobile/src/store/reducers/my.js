const myreducer = (prevState = { data: [] }, action) => {
    let newState = { ...prevState }
    switch (action.type) {
        case "myState":
            newState.data = action.data
            return newState
        default:
            return prevState
    }
}
export default myreducer