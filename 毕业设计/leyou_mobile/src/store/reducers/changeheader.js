const changeheader = (prevState = { data: [] }, action) => {
    let newState = { ...prevState }
    switch (action.type) {
        case 'portrait':
            newState.data = action.data || []
            return newState
        default:
            return prevState
    }
}
export default changeheader