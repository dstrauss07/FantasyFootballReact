import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Classes from './DraftMenu.module.css';

class DraftMenu extends Component {



    constructor(props) {
        super();
        this.state = {
            leagueSettings: props.leagueSettings,
            settingsOpen: props.settingsOpen,
            leagueType : props.leagueType

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

    closeSettings = (e) =>{
        e.preventDefault();

        if(this.state.settingsOpen)
        {
            this.setState({settingsOpen:false})
        }
        else
        {
            this.setState({settingsOpen:true})
        }
      
        this.props.toggleSettings(this.state.settingsOpen)
    }


    render() {
        let formToReturn;
        let blue = Classes.blue, 
        formGroup = Classes.formGroup, 
        formBox = Classes.formBox, 
        submitButton= Classes.submitButton, 
        closingButton= Classes.closingButton,
        panelShown = Classes.show   ;

        
        if(this.state.settingsOpen)
        {
            panelShown = Classes.show 
        }
        else
        {
            panelShown = Classes.hide 
        }


        if (this.props.leagueType == "Auction") {
            formToReturn =
                <form className={panelShown}>
                    <div className={formBox}>
                        <div className={formGroup}>
                            <label className={blue}>Starting Budget:  </label>
                            <input
                                type="int"
                                id="startingBudget"
                                name="startingBudget"
                                defaultValue={this.state.leagueSettings.startingBudget}
                                value={this.state.leagueSettings.startingBudget}
                                onChange={this.HandleUpdateStartingBudgetChange}
                            />
                        </div>
                        <div className={formGroup}>
                            <label>League Size: </label>
                            <input type="int"
                                id="leagueSize"
                                name="leagueSize"
                                min="2"
                                max="32"
                                value={this.state.leagueSettings.leagueSize}
                                defaultValue={this.state.leagueSettings.leagueSize}
                                onChange={this.HandleUpdateLeagueSizeChange}
                            />
                        </div>
                        <div className={formGroup}>
                            <label>QB:  </label>
                            <input type="int"
                                id="totalStartingQb"
                                name="totalStartingQb"
                                min="0"
                                max="10"
                                value={this.state.leagueSettings.totalStartingQb}
                                onChange={this.HandleUpdateStartingQbChange}
                            />
                        </div>
                        <div className={formGroup}>
                            <label>RB:</label>
                            <input type="int"
                                id="totalStartingRb"
                                name="totalStartingRb"
                                min="0"
                                max="10"
                                value={this.state.leagueSettings.totalStartingRb}
                                onChange={this.HandleUpdateStartingRbChange}
                            />
                        </div>
                        <div className={formGroup}>
                            <label>WR:  </label>
                            <input type="int"
                                id="totalStartingWr"
                                name="totalStartingWr"
                                min="0"
                                max="10"
                                value={this.state.leagueSettings.totalStartingWr}
                                onChange={this.HandleUpdateStartingWrChange}
                            />
                        </div>
                        <div className={formGroup}>
                            <label>TE:</label>
                            <input type="int"
                                id="totalStartingTe"
                                name="totalStartingTe"
                                min="0"
                                max="4"
                                value={this.state.leagueSettings.totalStartingTe}
                                onChange={this.HandleUpdateStartingTeChange}
                            />
                        </div>
                        <div className={formGroup}>
                            <label>FLEX: </label>
                            <input type="int"
                                id="totalStartingFlex"
                                name="totalStartingFlex"
                                min="0"
                                max="10"
                                value={this.state.leagueSettings.totalStartingFlex}
                                onChange={this.HandleUpdateStartingFlexChange}
                            />
                        </div>
                        <div className={formGroup}>
                            <label>SFLEX: </label>
                            <input type="int"
                                id="totalStartingSFlex"
                                name="totalStartingSFlex"
                                min="0"
                                max="10"
                                value={this.state.leagueSettings.totalStartingSFlex}
                                onChange={this.HandleUpdateStartingSFlexChange}
                            />
                        </div>
                        <div className={formGroup}>
                            <label>DST: </label>
                            <input type="int"
                                id="totalStartingD"
                                name="totalStartingD"
                                min="0"
                                max="5"
                                value={this.state.leagueSettings.totalStartingD}
                                onChange={this.HandleUpdateStartingDChange}
                            />
                        </div>
                        <div className={formGroup}>
                            <label>K: </label>
                            <input type="int"
                                id="totalStartingK"
                                name="totalStartingK"
                                min="0"
                                max="5"
                                value={this.state.leagueSettings.totalStartingK}
                                onChange={this.HandleUpdateStartingKChange}
                            />
                        </div>
                        <div className={formGroup}>
                            <label>TOTAL PLAYERS  </label>
                            <input type="int"
                                id="totalPlayer"
                                name="totalPlayer"
                                min="1"
                                max="50"
                                value={this.state.leagueSettings.totalPlayer}
                                onChange={this.HandleUpdateTotalPlayerChange}
                            />
                        </div>
                        <div className={formGroup}>
                            <label>LeagueType:  </label>
                            <select id="leagueType"
                                name="leagueType"
                                value={this.state.leagueSettings.leagueType}
                                onChange={this.HandleUpdateLeagueTypeChange}
                                onChange={this.HandleUpdateLeagueTypeChange}>

                                <option value="standard">Standard</option>
                                <option value="ppr">PPR</option>
                                <option value="dynasty">Dynasty</option>
                            </select>
                        </div>
                    </div>
                    <button className={submitButton} onClick={(e) => { this.UpdateSettings(e) }}>Submit Changes</button>
                    <button className={closingButton} onClick={(e) => { this.closeSettings(e) }}>X</button>
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