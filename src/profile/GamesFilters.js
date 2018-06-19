import React, { Component } from 'react'
import {Panel, PanelBlock, PanelHeading, Control, Input, Icon, Checkbox, Button} from 'bloomer'

class GamesFilters extends Component {


    render() {
        return (
            <Panel>
                <PanelHeading>Games</PanelHeading>
                <PanelBlock>
                    <Control hasIcons='left'>
                        <Input isSize='small' placeholder='Search' disabled="true"/>
                        <Icon isSize='small' isAlign='left'>
                            <span className='fa fa-search' aria-hidden='true' />
                        </Icon>
                    </Control>
                </PanelBlock>
                <PanelBlock tag='label'>
                    <Checkbox id="filter__backlog" value="backlog" onChange={this.props.updateFilter} > Backlog</Checkbox>
                </PanelBlock>
                <PanelBlock tag='label'>
                    <Checkbox id="filter__toBePlayed" value="to be played" onChange={this.props.updateFilter} > To Be Played</Checkbox>
                </PanelBlock>
                <PanelBlock tag='label'>
                    <Checkbox id="filter__playing" value="playing" onChange={this.props.updateFilter} > Playing</Checkbox>
                </PanelBlock>
                <PanelBlock tag='label'>
                    <Checkbox id="filter__finished" value="finished" onChange={this.props.updateFilter} > Finished</Checkbox>
                </PanelBlock>
                <PanelBlock>
                    <Button isOutlined isFullWidth isColor='primary' onClick={this.props.clearFilters}> Reset all filters</Button>
                </PanelBlock>
            </Panel>
        )
    }
}

export default GamesFilters
