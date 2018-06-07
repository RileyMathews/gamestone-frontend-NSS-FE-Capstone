import React, { Component } from 'react';
import { Button } from 'bloomer'
import NavBar from './nav/NavBar'
import './App.css';

class App extends Component {
  state = {
    currentView: "",
    searchValue: "",
    searchType: "all",
    activeUser: "",
    searchDisplay: "All",
    likeNotifications: [],
    friendRequestNotifications: [],
    eventNotifications: [],
    notificationsLength: 0
  }

  setActiveUser = function (val) {
    // if (val) {
    //   localStorage.setItem("userId", val)
    // } else {
    //   localStorage.removeItem("userId")
    // }
    this.setState({
      activeUser: val
    })
  }.bind(this)

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

  deleteActiveUser = function () {
    localStorage.clear()
    sessionStorage.clear()
    this.setState({
      activeUser: ""
    })
  }.bind(this)

  componentDidMount() {
    this.setState({
      activeUser: sessionStorage.getItem("userId")
    })
  }

  // set code to run when the currently logged in user changes
  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeUser !== this.state.activeUser) {
      this.updateNotifications()
    }
  }

  // function to get the notifications of the current logged in user
  updateNotifications = function () {
    fetch(`http://localhost:8088/likeNotifications?receiverId=${this.state.activeUser}&_expand=user&_expand=post`)
      .then(r => r.json())
      .then(response => {
        this.setState({
          likeNotifications: response
        })
        return fetch(`http://localhost:8088/friendRequestsNotifications?receiverId=${this.state.activeUser}&_expand=user`)
      })
      .then(r => r.json())
      .then(response => {
        this.setState({
          friendRequestNotifications: response
        })
        return fetch(`http://localhost:8088/eventsNotifications?receiverId=${this.state.activeUser}&_expand=user&_expand=event`)
      })
      .then(r => r.json())
      .then(response => {
        this.setState({
          eventNotifications: response,
        })
        this.setState({
          notificationsLength: this.state.eventNotifications.length + this.state.likeNotifications.length + this.state.friendRequestNotifications.length
        })
      })
  }

  // showView = () => {

  //   if (sessionStorage.getItem("userId") === null) {
  //       return <Registration setActiveUser={this.setActiveUser} setView={this.setView} />
  //   } else {
  //       switch (this.state.currentView) {
  //           case "logout":
  //               return <Registration setActiveUser={this.setActiveUser} setView={this.setView} />
  //           case "search":
  //               return <SearchResults searchValue={this.state.searchValue} searchType={this.state.searchType} />
  //           case "profile":
  //               return <Profile userId={this.state.activeUser}/>
  //           case "notifications":
  //             return <NotificationsView likes={this.state.likeNotifications} events={this.state.eventNotifications} friendRequests={this.state.friendRequestNotifications} />
  //           case "home":
  //           default:
  //               return <Dashboard activeUser={this.state.activeUser} />
  //       }
  //   }
  // }

  

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
      </div>
    )
  }
}

export default App;