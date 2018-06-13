import React, { Component } from 'react'
import {Title} from 'bloomer'


class ProfilePlatformsView extends Component {


    render() {
        return (
            <div>
                <Title>Platforms</Title>
                {this.props.userPlatforms.map(platform => (<p key={platform.id}>{platform.name}</p>))}
            </div>
        )
    }
}

export default ProfilePlatformsView
