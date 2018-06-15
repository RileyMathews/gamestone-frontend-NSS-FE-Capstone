import React, { Component } from 'react'
import {Icon} from 'bloomer'

/* 
    module to display information about game platforms based on info passed to it
    authors Riley Mathews
*/
class Platform extends Component {


    render() {
        return (
            <div>
                <p>{this.props.platform.name} {this.props.owned ? <Icon isSize="small" className="fas fa-minus-circle" onClick={this.props.removePlatform} id={"remove__platform__"+this.props.platform.id} /> : <Icon className="fas fa-plus-circle" onClick={this.props.addPlatform} id={"add__platform__"+this.props.platform.id} />}</p>
            </div>
        )   
    }
}

export default Platform
