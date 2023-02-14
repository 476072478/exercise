const detailsreducer = (prevState = { data: [] }, action) => {
    let newState = { ...prevState }
    switch (action.type) {
        case 'requestPost':
            newState.data = action.data || []
            return newState
        default:
            return prevState
    }
}
export default detailsreducer