import React, { Component } from 'react'
import { Title, Button } from 'bloomer'
import GamesList from './GamesList';

/* 
    module to handle displaying the games view of the user profile page
    author Riley Mathews
*/

class ProfileGamesView extends Component {


    render() {
        return (
            <div>
                {this.props.userGamesIds.length > 0 ?
                    <div>
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
                        <Button isColor="primary" onClick={this.props.goToAddGames}>Add Games</Button>
                    </div>
                }
            </div>
        )
    }
}

export default ProfileGamesView
