import React, { Component } from 'react'
import { Title, Button } from 'bloomer'
import GamesList from './GamesList';
import { Context } from '../Provider';

/* 
    module to handle displaying the games view of the user profile page
    author Riley Mathews
*/

class ProfileGamesView extends Component {


    render() {
        return (
            <Context.Consumer>
                {context => (
                    <div>
                        {context.state.userGamesIds.length > 0 ?
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
                                <Title isSize={4}>or click below to view more information about using the app</Title>
                                <Button isColor="primary" onClick={this.props.goToInstructions}>Get Started</Button>
                            </div>
                        }
                    </div>
                )}
            </Context.Consumer>
        )
    }
}

export default ProfileGamesView
