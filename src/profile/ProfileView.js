import React, { Component } from 'react'
import { Title, Container } from 'bloomer'
import GamesList from '../games/GamesList';


class ProfileView extends Component {

    state = {
        games: []
    }

    componentDidMount() {
        fetch(`http://localhost:8088/usersGames?userId=${this.props.activeUser}&_expand=game`)
        .then (r => r.json())
        .then(response => {
            this.setState({games: response})
        })
    }

    render() {
        return (
            <Container>
                <Title isSize={1}>{this.props.info.name.first} {this.props.info.name.last} AKA {this.props.info.gamertag}</Title>
                <Title isSize={3}>Games</Title>
                <GamesList games={this.state.games}/>
            </Container>
        )
    }
}

export default ProfileView
