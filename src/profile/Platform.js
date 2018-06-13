import React, { Component } from 'react'


class Platform extends Component {


    render() {
        return (
            <div>
                <p>{this.props.platform.name}</p>
            </div>
        )   
    }
}

export default Platform
