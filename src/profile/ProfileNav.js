import React, { Component } from 'react'
import {Tabs, TabList, Tab, TabLink, Icon} from 'bloomer'

class ProfileNav extends Component {

    activeTab = function (tabView) {
        return tabView === this.props.currentView
    }.bind(this)

    render() {
        return (
            <Tabs>
                <TabList>  
                    <Tab isActive={this.activeTab("games")} id="profileNav__games" onClick={this.props.setProfileView}>
                        <TabLink>
                            <Icon isSize='small'><span className='fa fa-gamepad' aria-hidden='true' /></Icon>
                            <span>Games</span>
                        </TabLink>
                    </Tab>
                    <Tab isActive={this.activeTab("platforms")} id="profileNav__platforms" onClick={this.props.setProfileView}>
                        <TabLink>
                            <Icon isSize='small'><span className='fa fa-desktop' aria-hidden='true' /></Icon>
                            <span>Platforms</span>
                        </TabLink>
                    </Tab>
                </TabList>
            </Tabs>
        )
    }
}

export default ProfileNav
