import React, { Component } from 'react';
import NavBar from './nav/NavBar'
import './App.css';

class App extends Component {
  state = {
    currentView: "",
    searchType: "all",
    activeUser: "1",
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

  deleteActiveUser = function () {
    localStorage.clear()
    sessionStorage.clear()
    this.setState({
      activeUser: ""
    })
  }.bind(this)

  componentDidMount() {
  
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