import React, { Component } from 'react'
import './PlatformTag.css'


class PlatformTag extends Component {

    tagPlatformCompany = function () {
        const platformId = this.props.platform.id
        const allPlatforms = this.props.allPlatforms

        const platform = allPlatforms.find(platform => platform.id === platformId)
        if (platform !== undefined) {
            return platform.company
        } else {
            return ""
        }
    }.bind(this)

    render() {
        return (
            <span className={this.tagPlatformCompany()+" platform"}>{this.props.platform.name}</span>
        )
    }
}

export default PlatformTag
