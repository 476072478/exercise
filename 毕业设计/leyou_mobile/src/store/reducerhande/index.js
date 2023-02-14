//控制navbar右侧图标隐藏
export const righthide = () => {
    return {
        type: 'righthide'
    }
}
//控制navbar右侧图标显示
export const rightshow = () => {
    return {
        type: 'rightshow'
    }
}
//控制navbar左侧图标显示
export const leftshow = () => {
    return {
        type: "leftshow"
    }
}
//控制navbar左侧图标隐藏
export const lefthide = () => {
    return {
        type: "lefthide"
    }
}

//控制tabbar显示
export const tabbarhide = () => {
    return {
        type: 'tabbarhide'
    }
}
//控制tabbar隐藏
export const tabbarshow = () => {
    return {
        type: 'tabbarshow'
    }
}

//将登录请求到的用户数据传到my空间中
export const myState = (data) => {
    return {
        type: 'myState',
        data
    }
}