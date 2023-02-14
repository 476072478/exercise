import React, { Component } from 'react'

export default class Newceshi extends Component {
    constructor(props) {
        super(props)
        this.state = { count: 0 }
    }
    changeCount = () => {
        this.setState({ count: this.state.count + 1 }, () => {
            this.setState({ count: this.state.count + 1 }, () => {
                console.log(this.state)
            })
        })
        // this.setState((state, props) => {
        //     return { count: state.count + 1 }
        // }, () => {
        //     this.setState((state, props) => {
        //         return { count: state.count + 1 }
        //     }, () => {
        //         this.setState((state, props) => {
        //             return { count: state.count + 1 }
        //         }, () => {
        //             console.log(this.state)
        //         })
        //     })
        // })
    }
    render() {
        return (
            <div>
                {this.state.count}
                <br />
                <button onClick={this.changeCount}>
                    button
                </button>
            </div>
        )
    }
}
