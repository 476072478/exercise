const tablereducer = (prevState = { data: [] }, action) => {
    let newState = { ...prevState }
    switch (action.type) {
        case "requestTabel":
            newState.data = action.data
            return newState
        default:
            return prevState
    }
}
export default tablereducer