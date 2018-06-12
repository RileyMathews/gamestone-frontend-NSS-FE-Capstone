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
        register__passwordConfirm: ""
    }

    login = function () {
        const username = this.state.login__username
        const password = this.state.login__password
        this.setState({
            login__username: "",
            login__password: ""
        })

        fetch(`http://localhost:8088/users?gamertag=${username}`)
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
                }
            })
    }.bind(this)

    register = function () {
        if (this.state.register__password === this.state.register__passwordConfirm) {
            APIManager.searchUsers(this.state.register__gamertag)
                .then(r => r.json())
                .then(response => {
                    console.log(response)
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
                            })
                    } else {
                        alert("username already taken")
                        this.setState({register__gamertag: ""})
                    }
                })
        } else {
            alert("passwords do not match")
            this.setState({
                register__password: "",
                register__passwordConfirm: ""
            })
        }
    }.bind(this)

    updateState = function (event) {
        this.setState({[event.target.id]: event.target.value})
    }.bind(this)

    render() {
        return (
            <Container>
                <Title>Welcome to this app</Title>
                <Field>
                    <Label>Username</Label>
                    <Control>
                        <Input type="text" onChange={this.updateState} id="login__username" value={this.state.login__username} />
                    </Control>
                </Field>
                <Field>
                    <Label>Password</Label>
                    <Control>
                        <Input type="text" onChange={this.updateState} id="login__password" value={this.state.login__password} />
                    </Control>
                </Field>
                <Field>
                    <Control>
                        <Button isColor="primary" id="login__submit" onClick={this.login}>Login</Button>
                    </Control>
                </Field>

                <Title>Or create a new account</Title>
                <Field>
                    <Label>First Name</Label>
                    <Control>
                        <Input type="text" onChange={this.updateState} id="register__firstName" value={this.state.register__firstName} />
                    </Control>
                    <Label>Last Name</Label>
                    <Control>
                        <Input type="text" onChange={this.updateState} id="register__lastName" value={this.state.register__lastName} />
                    </Control>
                </Field>
                <Field>
                    <Label>Gamertag</Label>
                    <Control>
                        <Input type="text" onChange={this.updateState} id="register__gamertag" value={this.state.register__gamertag} />
                    </Control>
                </Field>
                <Field>
                    <Label>Password</Label>
                    <Control>
                        <Input type="password" onChange={this.updateState} id="register__password" value={this.state.register__password} />
                    </Control>
                    <Label>Confirm Password</Label>
                    <Control>
                        <Input type="password" onChange={this.updateState} id="register__passwordConfirm" value={this.state.register__passwordConfirm} />
                    </Control>
                </Field>
                <Field>
                    <Control>
                        <Button isColor="primary" id="register__submit" onClick={this.register}>Register</Button>
                    </Control>
                </Field>


            </Container>
        )
    }
}

export default LoginView
