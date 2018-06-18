import React, { Component } from 'react'
import { Title, Container, Image } from 'bloomer'
import './InstructionsView.css'


class InstructionsView extends Component {


    render() {
        return (
            <Container>
                <div id="instructions">
                    <Title>Getting Started</Title>
                    <p>
                        Welcome to game finder, the app that lets you track your games, and helps you discover new ones. Read on to learn how to get started.
                    </p>
                    <Title isSize={4}>Adding Games</Title>
                    <p>
                        To add a new game, start by clicking on 'add games' at the top of the page.
                    </p>
                    <div className="info">
                        <Image src='./images/instructions-navbar-addgames.png' />
                    </div>
                    <p>
                        This will take you to a search bar. Type in the name of a game you have played, and click search.
                    </p>
                    <div className="info">
                        <Image src='./images/instructions-addgames-search.png' />
                    </div>
                    <p>
                        A list of games matching your search should populate on the page. Find the game matching the one you want to add and click either the 'add game' button, or the 'add game as favorite' button if you want the game to be saved as a favorite. Any games you already have that show up in this search should have a remove game button in case you want to remove it from your collection.
                    </p>
                    <div className="info">
                        <Image src='./images/instructions-addgames-buttons.png' />
                    </div>
                    <p>
                        Any games you already have that show up in this search should have a remove game button in case you want to remove it from your collection.
                    </p>
                    <div className="info">
                        <Image src='./images/instructions-addgames-remove.png' />
                    </div>
                    <Title isSize={4}>Your profile page</Title>
                    <p>
                        To manage your game library, click on 'my profile' at the top of the page. This should take you to a list of games currently in your collection.
                    </p>
                    <div className="info">
                        <Image src='./images/instructions-navbar-myprofile.png' />
                    </div>
                    <p>
                        The star icon next to a games title indicates weather or not it has been tagged as a favorite. If the star is hollow, the game is not currently a favorite. Click the star to make it filled in. The game should now be marked as a favorite.
                    </p>
                    <div className="info">
                        <Image src='./images/instructions-profile-favorite.png' />
                    </div>
                    <p>
                        The pencil icon next to the star will let you toggle editing the games status. Which is normally found next to this icon. If you would like to change the status of a game. Click the pencil icon and the status text should be replaced with a dropdown menu. Click the menu and select the appropiate option.
                    </p>
                    <div className="info">
                        <Image src='./images/instructions-profile-status.png' />
                    </div>
                    <p>
                        If you want to remove a game from your collection. Click on the X that appears in the top right hand corner of a games listing.
                    </p>
                    <div className="info">
                        <Image src='./images/instructions-profile-remove.png' />
                    </div>
                    <Title isSize={4}>Managing your platforms</Title>
                    <p>
                        From your profile page. Click on the button at the top marked 'platforms'. This should take you to a new page were you can manage your platforms.
                    </p>
                    <div className="info">
                        <Image src='./images/instructions-profile-gotoplatforms.png' />
                    </div>
                    <p>
                        To add and remove platforms from your profile. Click on the plus sign next to a platform you don't own to add one. Or to remove a platform, click on the minus sign next to it.
                    </p>
                    <div className="info">
                        <Image src='./images/instructions-profile-platforms.png' />
                    </div>
                    <Title isSize={4}>Discovering new games</Title>
                    <p>
                        To find new games related to ones you already own. Start by clicking 'suggest games' at the top of the page.
                    </p>
                    <div className="info">
                        <Image src='./images/instructions-navbar-suggestgames.png' />
                    </div>
                    <p>
                        To filter the games we suggest to you, click on the check boxes in the left hand column. But please note. Due to the fact we do not have direct control over the database we are using, we are trying to not demand too much data from them at once. If you check too many filters we may not immediately find a game matching games you have. Try again after a few seconds, and please don't spam click the buttons here.
                    </p>
                    <div className="info">
                        <Image src='./images/instructions-suggestgame-filters.png' />
                    </div>
                    <p>
                        To find games that other gamers have marked similar to games in your library, click the button marked 'by similar games', or if you would like to discover games made by the same people as other games you own, click 'by developer'.
                    </p>
                    <div className="info">
                        <Image src='./images/instructions-suggestgame-buttons.png' />
                    </div>
                </div>
            </Container>
        )
    }
}

export default InstructionsView
