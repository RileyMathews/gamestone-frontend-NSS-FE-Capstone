import React, { Component } from 'react'
import { Title, Container, Button } from 'bloomer'
import ProfileGamesView from './ProfileGamesView';
import ProfilePlatformsView from './ProfilePlatformsView';


class ProfileView extends Component {

    state = {
        currentView: "games"
    }

    goToAddGames = function () {
        this.props.setView("search")
    }.bind(this)

    setProfileView = function (e) {
        let view = null

        // Click event triggered switching view
        if (e.hasOwnProperty("target")) {
            view = e.target.id.split("__")[1]

            // View switch manually triggered by passing in string
        } else {
            view = e
        }

        // If user clicked logout in nav, empty local storage and update activeUser state
        if (view === "logout") {
            this.setActiveUser(null)
            localStorage.clear()
            sessionStorage.clear()
        }

        // Update state to correct view will be rendered
        this.setState({
            currentView: view
        })
    }.bind(this)

    showProfileView = function () {
        switch (this.state.currentView) {
            case "games":
            default:
                return <ProfileGamesView
                    userGamesIds={this.props.userGamesIds}
                    removeGame={this.props.removeGame}
                    games={this.props.games}
                    changeGameProgress={this.props.changeGameProgress}
                    userGamesStats={this.props.userGamesStats}
                    toggleGameFavorite={this.props.toggleGameFavorite}
                    goToAddGames={this.goToAddGames}
                />
            case "platforms":
                return <ProfilePlatformsView
                    userPlatforms={this.props.userPlatforms}
                />
        }
    }

    render() {
        return (

            <Container>
                <Button id="ProfileNav__games" onClick={this.setProfileView}>Games</Button>
                <Button id="ProfileNav__platforms" onClick={this.setProfileView}>Platforms</Button>
                <Title isSize={3}>{this.props.firstName} {this.props.lastName} AKA "{this.props.gamertag}"</Title>
                {this.showProfileView()}
            </Container>
        )
    }
}

export default ProfileView
