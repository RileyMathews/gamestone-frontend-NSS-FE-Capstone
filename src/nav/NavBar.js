import React, { Component } from 'react'
import { Navbar, NavbarItem, NavbarBurger, NavbarBrand, NavbarMenu } from "bloomer";
import './NavBar.css'

class NavBar extends Component {

    // Storing session storage as an object in state named currentUser
    state = {
        isActive: false,
        firstName: "",
        image: "",
        searchValue: "",
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
        this.props.setView(e)
    }.bind(this)

    //on click of search button
    onClickSearch = function (e) {
        //fire function to close navbar
        this.onClickNav(e)

        /*
            add code here
            to fire search functionality
        */
    }.bind(this)


    render() {
        return (
            <Navbar>
                <NavbarBrand>
                    <NavbarItem>GameApp</NavbarItem>
                    <NavbarBurger isActive={this.state.isActive} onClick={this.onClickNav} />
                </NavbarBrand>
                <NavbarMenu isActive={this.state.isActive}>
                    <NavbarItem id="nav__profile" onClick={this.onClickNav}>My Profile</NavbarItem>
                    <NavbarItem id="nav__search" onClick={this.onClickNav}>Add Games</NavbarItem>
                    <NavbarItem id="nav__profile" onClick={this.onClickNav}>Suggest Games</NavbarItem>
                    <NavbarItem id="nav__logout" onClick={this.onClickNav}>Logout</NavbarItem>
                </NavbarMenu>
            </Navbar>
        )


    }
}

export default NavBar
