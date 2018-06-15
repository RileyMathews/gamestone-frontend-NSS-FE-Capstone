import React, { Component } from 'react'

/* 
    module to display information about game platforms based on info passed to it
    authors Riley Mathews
*/
class Platform extends Component {


    render() {
        return (
            <div>
                <p>{this.props.platform.name} {this.props.owned ? <i className="material-icons" onClick={this.props.removePlatform} id={"remove__platform__"+this.props.platform.id}>remove_circle</i> : <i className="material-icons" onClick={this.props.addPlatform} id={"add__platform__"+this.props.platform.id}>add_circle</i>}</p>
            </div>
        )   
    }
}

export default Platform
