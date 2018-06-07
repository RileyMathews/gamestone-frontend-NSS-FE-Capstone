import React, { Component } from 'react'
import { Title, Container } from 'bloomer'


class ProfileView extends Component {


    render() {
        return (
            <Container>
                <Title isSize={1}>{this.props.info.name.first} {this.props.info.name.last} AKA {this.props.info.gamertag}</Title>
                <Title isSize={3}>Games</Title>
            </Container>
        )
    }
}

export default ProfileView
