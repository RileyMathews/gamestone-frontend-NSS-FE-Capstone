/* 
    module: profile platforms view
    purpose: to display an array of platforms passed to it
    authors: Riley Mathews
*/
import React, { Component } from 'react'
import { Title, Columns, Column, Box } from 'bloomer'
import Platform from './Platform';
import { Context } from '../Provider';


class ProfilePlatformsView extends Component {


    componentDidMount() {

    }

    render() {
        return (
            <Context.Consumer>
                {context => (
                    <div>
                        <Title>Platforms</Title>
                        <Columns>
                            <Column isSize='1/2'>
                                <Box>
                                    <Title>Owned</Title>
                                    {context.state.userPlatforms.map(platform => (<Platform key={platform.id} allPlatforms={context.state.allPlatforms} platform={platform} owned={true} removePlatform={context.removePlatform} />))}
                                </Box>
                            </Column>
                            <Column isSize='1/2'>
                                <Box>
                                    <Title>Add</Title>
                                    {context.state.userUnownedPlatforms.map(platform => (<Platform key={platform.id} allPlatforms={context.state.allPlatforms} platform={platform} owned={false} addPlatform={context.addPlatform} />))}
                                </Box>
                            </Column>
                        </Columns>
                    </div>
                )}
            </Context.Consumer>
        )
    }
}

export default ProfilePlatformsView
