import React, { Component } from 'react'
import { Title, Container, Field, Label, Control, Input, Button } from 'bloomer'
import APIManager from '../api/APIManager';


class LoginView extends Component {

    state = {
        login__username: "",
        login__password: "",
        register__firstName: "",
        register__lastName: "",
        register__gamertag: "",
        register__password: "",
        register__passwordConfirm: "",
        firstNames: [
            "Tony",
            "Thor",
            "Varian",
            "Bruce",
            "Donky",
            "Peter",
            "Mega",
            "Iroquois",
            "Luke",
            "Luffy",
            "Kratos",
            "Harry",
            "David",
            "Donald",
            "Revolver",
            "Hal",
            "Anakin",
            "Samuel",
            "Han",
            "Jean-Luc",
            "James"
        ],
        lastNames: [
            "Stark",
            "Odinson",
            "Wryn",
            "Wayne",
            "Kong",
            "Parker",
            "Man",
            "Pliskin",
            "Skywalker",
            "Monkey",
            "God of War",
            "Potter",
            "Oh",
            "Anderson",
            "Ocelot",
            "Emmerich",
            "Skywalker",
            "Oak",
            "Solo",
            "Picard",
            "Kirk"
        ],
        nameIndex: 0,
        gamerTags: [
            "IronMan",
            "God0fThunderz",
            "LionOfStormwind",
            "Batman",
            "DK",
            "Spiderman",
            "Rockman",
            "Snake",
            "TheLastJedi",
            "PirateKing",
            "GhostOfSparta",
            "BoyWhoLived",
            "Zero",
            "Sigint",
            "Shalashaska",
            "Otacon",
            "Vader",
            "TheProf",
            "IShotFirst",
            "Locutus",
            "Jim"
        ]
    }

    componentDidMount() {
        const indexOfNames = Math.floor(Math.random() * this.state.firstNames.length) 
        this.setState({nameIndex: indexOfNames})
    }

    login = function (evt) {
        evt.preventDefault()
        const username = this.state.login__username
        const password = this.state.login__password
        this.setState({
            login__username: "",
            login__password: ""
        })

        if (username === "" || password === "") {
            alert("please fill in a username and password")
        } else {
            APIManager.searchUsers(username)
                .then(r => r.json())
                .then(users => {
                    const user = users[0]
                    if (user === undefined || user.password !== password) {
                        alert("Username or Password not found")
    
                    } else if (password === user.password) {
    
    
                        sessionStorage.setItem("userId", user.id)
    
                        this.props.setActiveUser(user.id)
                        this.props.setView("home")
                        this.props.getUserInformation()
                        this.props.getPlatforms()
                    }
                })
        }
    }.bind(this)

    register = function (evt) {
        evt.preventDefault()
        const firstN = this.state.register__firstName
        const lastN = this.state.register__lastName
        const gamerT = this.state.register__gamertag
        const password = this.state.register__password
        if (firstN === "" || lastN === "" || gamerT === "" || password === "") {
            alert("please make sure every field is filled out")
        } else {
            if (this.state.register__password === this.state.register__passwordConfirm) {
                APIManager.searchUsers(this.state.register__gamertag)
                    .then(r => r.json())
                    .then(response => {
                        if (response.length === 0) {
                            const userData = {
                                name: {
                                    first: this.state.register__firstName,
                                    last: this.state.register__lastName
                                },
                                gamertag: this.state.register__gamertag,
                                password: this.state.register__password
                            }
    
                            APIManager.post("users", userData)
                                .then(r => r.json())
                                .then(response => {
                                    sessionStorage.setItem("userId", response.id)
                                    this.props.setActiveUser(response.id)
                                    this.props.setView("home")
                                    this.props.getUserInformation()
                                    this.props.getPlatforms()
                                })
                        } else {
                            alert("username already taken")
                            this.setState({ register__gamertag: "" })
                        }
                    })
            } else {
                alert("passwords do not match")
                this.setState({
                    register__password: "",
                    register__passwordConfirm: ""
                })
            }
        }
    }.bind(this)

    updateState = function (event) {
        this.setState({ [event.target.id]: event.target.value })
    }.bind(this)

    render() {
        return (
            <Container>
                <form id="login" onSubmit={this.login}>
                    <Title>Welcome to this app</Title>
                    <Field>
                        <Label>Gamertag</Label>
                        <Control>
                            <Input type="text" placeholder="gamertag" onChange={this.updateState} id="login__username" value={this.state.login__username} />
                        </Control>
                    </Field>
                    <Field>
                        <Label>Password</Label>
                        <Control>
                            <Input type="password" placeholder="password" onChange={this.updateState} id="login__password" value={this.state.login__password} />
                        </Control>
                    </Field>
                    <Field>
                        <Control>
                            <Button type="submit" isColor="primary" id="login__submit">Login</Button>
                        </Control>
                    </Field>
                </form>
                <Title>Or create a new account</Title>
                <form id="register" onSubmit={this.register}>
                    <Field>
                        <Label>First Name</Label>
                        <Control>
                            <Input type="text" placeholder={this.state.firstNames[this.state.nameIndex]} onChange={this.updateState} id="register__firstName" value={this.state.register__firstName} />
                        </Control>
                        <Label>Last Name</Label>
                        <Control>
                            <Input type="text" placeholder={this.state.lastNames[this.state.nameIndex]} onChange={this.updateState} id="register__lastName" value={this.state.register__lastName} />
                        </Control>
                    </Field>
                    <Field>
                        <Label>Gamertag</Label>
                        <Control>
                            <Input type="text" placeholder={this.state.gamerTags[this.state.nameIndex]} onChange={this.updateState} id="register__gamertag" value={this.state.register__gamertag} />
                        </Control>
                    </Field>
                    <Field>
                        <Label>Password</Label>
                        <Control>
                            <Input type="password" placeholder="notpassword" onChange={this.updateState} id="register__password" value={this.state.register__password} />
                        </Control>
                        <Label>Confirm Password</Label>
                        <Control>
                            <Input type="password" placeholder="notpassword" onChange={this.updateState} id="register__passwordConfirm" value={this.state.register__passwordConfirm} />
                        </Control>
                    </Field>
                    <Field>
                        <Control>
                            <Button isColor="primary" id="register__submit" type="submit">Register</Button>
                        </Control>
                    </Field>
                </form>


            </Container>
        )
    }
}

export default LoginView
