import React, { Component } from 'react'
import './PlatformTag.css'


class PlatformTag extends Component {

    render() {
        return (
            <span className={this.props.platform.company}>{this.props.platform.name}</span>
        )
    }
}

export default PlatformTag
