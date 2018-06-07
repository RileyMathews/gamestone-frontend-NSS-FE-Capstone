import React, { Component } from 'react'
import {Title} from 'bloomer'


class ProfileView extends Component {


    render() {
        return (
            <Title>{this.props.info.name.first} {this.props.info.name.last} AKA {this.props.info.gamertag}</Title>
        )
    }
}

export default ProfileView
