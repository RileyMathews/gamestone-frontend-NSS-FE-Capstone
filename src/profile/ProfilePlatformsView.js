/* 
    module: profile platforms view
    purpose: to display an array of platforms passed to it
    authors: Riley Mathews
*/
import React, { Component } from 'react'
import {Title} from 'bloomer'
import Platform from './Platform';


class ProfilePlatformsView extends Component {


    render() {
        return (
            <div>
                <Title>Platforms</Title>
                {this.props.userPlatforms.map(platform => (<Platform key={platform.id} platform={platform}/>))}
            </div>
        )
    }
}

export default ProfilePlatformsView
