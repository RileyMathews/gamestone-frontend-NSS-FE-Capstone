/* 
    module: profile platforms view
    purpose: to display an array of platforms passed to it
    authors: Riley Mathews
*/
import React, { Component } from 'react'
import { Title, Columns, Column } from 'bloomer'
import Platform from './Platform';


class ProfilePlatformsView extends Component {


    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <Title>Platforms</Title>
                <Columns>
                    <Column isSize='1/2'>
                        <Title>Owned</Title>
                        {this.props.userPlatforms.map(platform => (<Platform key={platform.id} platform={platform} owned={true} removePlatform={this.props.removePlatform}/>))}
                    </Column>
                    <Column isSize='1/2'>
                        <Title>Add</Title>
                        {this.props.userUnownedPlatforms.map(platform => (<Platform key={platform.id} platform={platform} owned={false} addPlatform={this.props.addPlatform}/>))}
                    </Column>
                </Columns>
            </div>
        )
    }
}

export default ProfilePlatformsView
