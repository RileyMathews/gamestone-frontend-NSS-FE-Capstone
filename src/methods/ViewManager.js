import React from 'react'
import LoginView from '../login/LoginView';
import SearchView from '../search/SearchView';
import SuggestView from '../suggestGame/SuggestView';
import { Title } from 'bloomer';
import ProfileView from '../profile/ProfileView';
/* 
    module to handle view of main app page
    authors Riley Mathews
*/

const ViewManager = Object.create(null, {
    setView: {
        value: function (e) {
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
                this.setState({
                    userGamesIds: [],
                    userGamesStats: [],
                    userGames: [],
                    userPlatforms: [],
                    userPlatformsIds: [],
                    allPlatforms: [],
                    userUnownedPlatforms: []
                })
                localStorage.clear()
                sessionStorage.clear()
            }

            // Update state to correct view will be rendered
            this.setState({
                currentView: view
            })

        }
    },
    showView: {
        value: function () {
            if (sessionStorage.getItem("userId") === null) {
                return <LoginView
                    setActiveUser={this.setActiveUser}
                    setView={this.setView}
                    getUserInformation={this.getUserInformation}
                    getPlatforms={this.getPlatforms} />
            } else {
                switch (this.state.currentView) {
                    case "search":
                        return <SearchView
                            activeUser={this.state.activeUser}
                            userGamesIds={this.state.userGamesIds}
                            addGameToCollection={this.addGameToCollection}
                            removeGame={this.removeGameFromCollection} />
                    case "suggest":
                        return <SuggestView
                            userGamesIds={this.state.userGamesIds}
                            addGameToCollection={this.addGameToCollection}
                            removeGameFromCollection={this.removeGameFromCollection}
                            userGames={this.state.userGames}
                            userGamesStats={this.state.userGamesStats}
                            userPlatformsIds={this.state.userPlatformsIds}
                        />
                    case "dummy":
                        return <Title>This is a dummy page to make sure I don't spam giant bomb's public api too much</Title>
                    case "profile":
                    default:
                        return <ProfileView
                            firstName={this.state.userFirstName}
                            lastName={this.state.userLastName}
                            gamertag={this.state.userGamertag}
                            activeUser={this.state.activeUser} userGamesIds={this.state.userGamesIds}
                            userGamesStats={this.state.userGamesStats} games={this.state.userGames}
                            toggleGameFavorite={this.toggleGameFavorite}
                            changeGameProgress={this.changeGameProgress}
                            removeGame={this.removeGameFromCollection}
                            setView={this.setView}
                            userPlatforms={this.state.userPlatforms}
                            allPlatforms={this.state.allPlatforms}
                            userUnownedPlatforms={this.state.userUnownedPlatforms}
                            addPlatform={this.addPlatform}
                            removePlatform={this.removePlatform}
                        />
                }
            }
        }
    }
})

export default ViewManager