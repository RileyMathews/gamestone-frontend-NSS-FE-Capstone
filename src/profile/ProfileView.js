import React, { Component } from 'react'
import { Title, Container, Button } from 'bloomer'
import GamesList from './GamesList';


class ProfileView extends Component {

    goToAddGames = function () {
        this.props.setView("search")
    }.bind(this)

    render() {
        return (
            <Container>
                {this.props.userGamesIds.length > 0 ?
                    <div>
                        <Title isSize={3}>{this.props.firstName} {this.props.lastName} AKA "{this.props.gamertag}"</Title>
                        <Title isSize={4}>Games</Title>
                        <GamesList
                            removeGame={this.props.removeGame}
                            games={this.props.games}
                            changeGameProgress={this.props.changeGameProgress}
                            userGamesIds={this.props.userGamesIds}
                            userGamesStats={this.props.userGamesStats}
                            toggleGameFavorite={this.props.toggleGameFavorite}
                        />
                    </div>
                    :
                    <div>
                        <Title>You have no games! click the button below to get started!</Title>
                        <Button onClick={this.goToAddGames}>Add Games</Button>
                    </div>
                }
            </Container>
        )
    }
}

export default ProfileView
