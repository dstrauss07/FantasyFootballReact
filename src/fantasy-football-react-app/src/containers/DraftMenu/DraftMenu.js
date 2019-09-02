import React, { Component } from 'react';
import Aux from '../../hoc/Aux';

class DraftMenu extends Component {


    constructor(props) {
        super();
        this.state = {
            leagueSettings: props.leagueSettings
        }
    }

    HandleUpdateStartingBudgetChange = (e) => {
        this.setState({
            leagueSettings:
            {
                startingBudget: e.target.value
            }
        })
    }

    HandleUpdateLeagueSizeChange = (e) => {
        this.setState({
            leagueSettings:
            {
                leagueSize: e.target.value
            }
        })
    }

    HandleUpdateStartingQbChange = (e) => {
        this.setState({
            leagueSettings:
            {
                totalStartingQb: e.target.value
            }
        })
    }

    HandleUpdateStartingRbChange = (e) => {
        this.setState({
            leagueSettings:
            {
                totalStartingRb: e.target.value
            }
        })
    }

    HandleUpdateStartingWrChange = (e) => {
        this.setState({
            leagueSettings:
            {
                totalStartingWr: e.target.value
            }
        })
    }


    HandleUpdateStartingTeChange = (e) => {
        this.setState({
            leagueSettings:
            {
                totalStartingTe: e.target.value
            }
        })
    }

    HandleUpdateStartingFlexChange = (e) => {
        this.setState({
            leagueSettings:
            {
                totalStartingFlex: e.target.value
            }
        })
    }


    HandleUpdateStartingSFlexChange = (e) => {
        this.setState({
            leagueSettings:
            {
                totalStartingSFlex: e.target.value
            }
        })
    }

    HandleUpdateStartingDChange = (e) => {
        this.setState({
            leagueSettings:
            {
                totalStartingD: e.target.value
            }
        })
    }

    HandleUpdateStartingKChange = (e) => {
        this.setState({
            leagueSettings:
            {
                totalStartingK: e.target.value
            }
        })
    }

    HandleUpdateTotalPlayerChange = (e) => {
        this.setState({
            leagueSettings:
            {
                totalPlayer: e.target.value
            }
        })
    }

    HandleUpdateLeagueTypeChange = (e) => {
        this.setState({
            leagueSettings:
            {
                leagueType: e.target.value
            }
        })
    }


    UpdateSettings = (e) => {
        e.preventDefault();

        this.props.clicked(this.state.leagueSettings);
    }
    render() {
        let formToReturn;
        if (this.props.leagueType == "Auction") {
            formToReturn =
                <form>
                    <label>Starting Budget: </label>
                    <input type="int"
                        id="startingBudget"
                        name="startingBudget"
                        value={this.state.leagueSettings.startingBudget}
                        onChange={this.HandleUpdateStartingBudgetChange}
                    />
                    <label>League Size: </label>
                    <input type="int"
                        id="leagueSize"
                        name="leagueSize"
                        value={this.state.leagueSettings.leagueSize}
                        onChange={this.HandleUpdateLeagueSizeChange}
                    />
                    <label>QB: </label>
                    <input type="int"
                        id="totalStartingQb"
                        name="totalStartingQb"
                        value={this.state.leagueSettings.totalStartingQb}
                        onChange={this.HandleUpdateStartingQbChange}
                    />
                    <label>RB: </label>
                    <input type="int"
                        id="totalStartingRb"
                        name="totalStartingRb"
                        value={this.state.leagueSettings.totalStartingRb}
                        onChange={this.HandleUpdateStartingRbChange}
                    />
                    <label>WR: </label>
                    <input type="int"
                        id="totalStartingRb"
                        name="totalStartingRb"
                        value={this.state.leagueSettings.totalStartingRb}
                        onChange={this.HandleUpdateStartingWrChange}
                    />
                    <label>TE: </label>
                    <input type="int"
                        id="totalStartingTe"
                        name="totalStartingTe"
                        value={this.state.leagueSettings.totalStartingTe}
                        onChange={this.HandleUpdateStartingTeChange}
                    />
                    <label>FLEX: </label>
                    <input type="int"
                        id="totalStartingFlex"
                        name="totalStartingFlex"
                        value={this.state.leagueSettings.totalStartingFlex}
                        onChange={this.HandleUpdateStartingFlexChange}
                    />
                    <label>SFLEX: </label>
                    <input type="int"
                        id="totalStartingSFlex"
                        name="totalStartingSFlex"
                        value={this.state.leagueSettings.totalStartingSFlex}
                        onChange={this.HandleUpdateStartingSFlexChange}
                    />
                    <label>DST: </label>
                    <input type="int"
                        id="totalStartingD"
                        name="totalStartingD"
                        value={this.state.leagueSettings.totalStartingD}
                        onChange={this.HandleUpdateStartingDChange}
                    />
                    <label>K: </label>
                    <input type="int"
                        id="totalStartingK"
                        name="totalStartingK"
                        value={this.state.leagueSettings.totalStartingK}
                        onChange={this.HandleUpdateStartingKChange}
                    />
                           <label>TOTAL PLAYERS </label>
                    <input type="int"
                        id="totalPlayer"
                        name="totalPlayer"
                        value={this.state.leagueSettings.totalPlayer}
                        onChange={this.HandleUpdateTotalPlayerChange}
                    />
                           <label>K: </label>
                    <input type="int"
                        id="leagueType"
                        name="leagueType"
                        value={this.state.leagueSettings.leagueType}
                        onChange={this.HandleUpdateLeagueTypeChange}
                    />
                    <button onClick={(e) => { this.UpdateSettings(e) }}>Submit Changes</button>
                </form>
        }

        else {

            formToReturn =
                <h2>Draft Manager</h2>
        }


        return (
            <Aux>

                {formToReturn}


            </Aux>
        )
    }
}



export default DraftMenu;