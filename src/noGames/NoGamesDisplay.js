import React, { Component } from 'react'
import { Title, Button } from 'bloomer'
import { Context } from '../Provider';

class NoGamesDisplay extends Component {


    render() {
        return (
            <Context.Consumer>
                {context => (
                    <div>
                        <Title>You have no games! click the button below to get started!</Title>
                        <Button isColor="primary" onClick={() => context.setView("search")}>Add Games</Button>
                        <Title isSize={4}>or click below to view more information about using the app</Title>
                        <Button isColor="primary" onClick={() => context.setView("instructions")}>Get Started</Button>
                    </div>
                )}
            </Context.Consumer>
        )
    }
}

export default NoGamesDisplay
