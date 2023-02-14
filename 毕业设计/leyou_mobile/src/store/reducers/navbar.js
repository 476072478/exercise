const navbarreducer = (prevState = { exhibit: null, rights: true, tabbarshow: true }, action) => {
    let newState = { ...prevState }
    switch (action.type) {
        case 'righthide':
            newState.rights = false
            return newState
        case 'rightshow':
            newState.rights = true
            return newState
        case "lefthide":
            newState.exhibit = null
            return newState
        case "leftshow":
            newState.exhibit = true
            return newState
        case "tabbarhide":
            newState.tabbarshow = false
            return newState
        case "tabbarshow":
            newState.tabbarshow = true
            return newState
        default:
            return prevState
    }
}
export default navbarreducer