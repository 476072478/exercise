const appreducer = (prevState = { data: [] }, action) => {
    let newState = { ...prevState }
    switch (action.type) {
        case 'requestFollow':
            newState.data = action.data || []
            return newState
        default:
            return prevState
    }
}
export default appreducer