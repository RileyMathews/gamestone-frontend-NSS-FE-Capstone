import React, { Component } from 'react'
import { Navbar, NavbarItem, NavbarBurger, NavbarBrand, NavbarMenu } from "bloomer";
import './NavBar.css'


/* 
    module to handle displaying and logic of using the navigation bar
    authors Riley Mathews
*/
class NavBar extends Component {

    // Storing session storage as an object in state named currentUser
    state = {
        isActive: false,
        firstName: "",
        searchType: "All"
    }

    // Making a fetch request against sessionStorage to find relevant user and storing first name in state
    componentDidMount() {
        const currentUser = sessionStorage.getItem('userId')
        if (currentUser !== null) {
            fetch(`http://127.0.0.1:8088/users/${currentUser}`)
                .then(r => r.json())
                .then(response => {
                    this.setState({
                        firstName: response.name.first,
                        image: response.image
                    })
                })
        }
    }

    // event handler for clicking nav drop down burger
    // sets isActive property in state to the opposite of what it currently is
    onClickNav = function (e) {
        this.setState({
            isActive: (!this.state.isActive)
        })
        if (e.target.id !== "") {
            this.props.setView(e)
        }
    }.bind(this)



    render() {
        return (
            <Navbar className="is-fixed-top">
                <NavbarBrand>
                    <NavbarItem>Game Finder</NavbarItem>
                    <NavbarBurger isActive={this.state.isActive} onClick={this.onClickNav} />
                </NavbarBrand>
                <NavbarMenu isActive={this.state.isActive}>
                    <NavbarItem className="clickable" id="nav__profile" onClick={this.onClickNav}>My Profile</NavbarItem>
                    <NavbarItem className="clickable" id="nav__search" onClick={this.onClickNav}>Add Games</NavbarItem>
                    <NavbarItem className="clickable" id="nav__suggest" onClick={this.onClickNav}>Suggest Games</NavbarItem>
                    <NavbarItem className="clickable" id="nav__logout" onClick={this.onClickNav}>Logout</NavbarItem>
                </NavbarMenu>
            </Navbar>
        )


    }
}

export default NavBar
