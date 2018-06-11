import React, { Component } from 'react'
import { Media, MediaLeft, Image, MediaContent, Content, Level, LevelLeft, LevelItem, LevelRight, Button, } from 'bloomer';


class Result extends Component {

    isGameOwned = function () {
        if (this.props.userGamesIds.includes(this.props.info.id)) {
            return <i className="material-icons">check_circle</i>
        }
    }


    render() {
        return (
            <Media>
                <MediaLeft>
                    <Image src={this.props.info.image.icon_url} />
                </MediaLeft>
                <MediaContent>
                    <Content>
                        <p>
                            <strong>{this.props.info.name}</strong>
                            {this.isGameOwned()}
                            <br />
                            {this.props.info.deck}
                        </p>
                    </Content>

                    <Level>
                        <LevelLeft>
                            <LevelItem>test genre</LevelItem>
                            <LevelItem>test genre</LevelItem>
                            <LevelItem>test genre</LevelItem>
                            <LevelItem>test genre</LevelItem>
                        </LevelLeft>
                        <LevelRight>
                            <Button disabled="true">Add Game</Button>
                            <Button disabled="true">Favorite Game</Button>
                        </LevelRight>
                    </Level>
                </MediaContent>
            </Media>
        )
    }
}

export default Result
