import React, { Component } from 'react'
import { Title, Container } from 'bloomer'
import GamesList from './GamesList';


class ProfileView extends Component {


    render() {
        return (
            <Container>
            <Title isSize={3}>{this.props.firstName} {this.props.lastName} AKA "{this.props.gamertag}"</Title>
                <Title isSize={4}>Games</Title>
                <GamesList games={this.props.games} changeGameProgress={this.props.changeGameProgress} userGamesIds={this.props.userGamesIds}/>
            </Container>
        )
    }
}

export default ProfileView
