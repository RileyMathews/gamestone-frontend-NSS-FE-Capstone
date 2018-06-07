import React, { Component } from 'react';
import NavBar from './nav/NavBar'
import ProfileView from './profile/ProfileView'
import './App.css';

class App extends Component {
    state = {
        // information to drive view and functionality of app
        currentView: "profile",
        activeUser: "1",

        // information from user object in api
        userInformation: {
            id: null,
            name: {
                first: "",
                last: "",
            },
            gamertag: "",
        }
    }

    setView = function (e) {
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

    componentDidMount() {
        this.getUserInformation()
    }

    getUserInformation = () => {
        fetch(`http://localhost:8088/users?id=${this.state.activeUser}`)
            .then(r => r.json())
            .then(response => {
                this.setState({
                    userInformation: response[0]
                })
            })
    }


    showView = () => {

        return <ProfileView info={this.state.userInformation} activeUser={this.state.activeUser}/>
    }



    render() {
        return (
            <div>
                <NavBar setView={this.setView}
                    setSearchType={this.setSearchType}
                    setSearchValue={this.setSearchValue}
                    searchDisplay={this.state.searchDisplay}
                    deleteActiveUser={this.deleteActiveUser}
                    activeUser={this.state.activeUser}
                    setActiveUser={this.setActiveUser} />
                {this.showView()}
            </div>
        )
    }
}

export default App;