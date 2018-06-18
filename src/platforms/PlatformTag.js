import React, { Component } from 'react'
import './PlatformTag.css'
import { Context } from '../Provider';


class PlatformTag extends Component {

    tagPlatformCompany = function (context) {
        debugger
        const platformId = this.props.platform.id
        const allPlatforms = context.state.allPlatforms

        const platform = allPlatforms.find(platform => platform.id === platformId)
        if (platform !== undefined) {
            return platform.company
        } else {
            return ""
        }
    }.bind(this)

    render() {
        return (
            <Context.Consumer>
                {
                    context => (
                        <span className={this.tagPlatformCompany(context) + " platform"}>{this.props.platform.name}</span>
                    )
                }
                
            </Context.Consumer>
        )
    }
}

export default PlatformTag
