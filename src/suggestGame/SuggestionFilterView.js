import React, { Component } from 'react'
import { Panel, PanelHeading, PanelBlock, Checkbox, Button } from 'bloomer'

class SuggestionFilterView extends Component {


    render() {
        return (
            <Panel>
                <PanelHeading>Filters</PanelHeading>

                <PanelBlock tag='label'>
                    <Checkbox onChange={this.props.setFilters} id="favoriteFilter"> Favorites</Checkbox>
                </PanelBlock>
                <PanelBlock tag='label'>
                    <Checkbox onChange={this.props.setFilters} id="consoleFilter"> Platforms</Checkbox>
                </PanelBlock>
                <PanelBlock>
                    <Button isOutlined isFullWidth onClick={this.props.clearFilters} isColor='primary'> Reset all filters</Button>
                </PanelBlock>
                <PanelBlock>
                    <p><small>note, depending on the games and platforms you own, checking too many filters may make finding games more difficult. If no game is found, try again after a second. The search is sometimes stopped before finding a game that meets all criteria to lessen the load on the database.</small></p>
                </PanelBlock>
            </Panel>
        )
    }
}

export default SuggestionFilterView
