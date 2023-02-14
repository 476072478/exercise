const traverreducer = (prevState = { data: [] }, action) => {
    let newState = { ...prevState }
    switch (action.type) {
        case 'requestTraverRouter':
            newState.data = action.data
            return newState
        default:
            return prevState
    }
}
export default traverreducer