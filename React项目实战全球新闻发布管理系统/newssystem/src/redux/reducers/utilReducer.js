const utilReducer = (prevState = { Spinning: true }, action) => {
    const newState = { ...prevState }
    switch (action.type) {
        case 'changeutil':
            newState.Spinning = action.title
            return newState
        default:
            return prevState
    }

}
export { utilReducer }