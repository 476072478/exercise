const footreducer = (prevState = { data: [] }, action) => {
    let newState = { ...prevState }
    switch (action.type) {
        case "requestmyfoot":
            newState.data = action.data
            return newState
        default:
            return prevState
    }
}
export default footreducer