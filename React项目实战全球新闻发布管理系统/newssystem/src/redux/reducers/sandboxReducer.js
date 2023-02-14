const sandboxReducer = (prevState = { switch: false }, action) => {
    const newState = { ...prevState }
    switch (action.type) {
        case 'changeSwitch':
            newState.switch = action.title
            return newState
        default:
            return prevState
    }

}
export { sandboxReducer }