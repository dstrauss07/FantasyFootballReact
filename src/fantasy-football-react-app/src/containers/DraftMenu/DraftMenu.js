import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux';
import Classes from './DraftMenu.module.css';
// import NumericInput from 'react-numeric-input';

class DraftMenu extends Component {



    constructor(props) {
        super();
        this.state = {
            leagueSettings: props.leagueSettings,
            settingsOpen: props.settingsOpen,
            leagueType : props.leagueType,
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

    HandleUpdateDraftSlotChange = (e) => {
        let newDraftSlot = e.target.value;
        
             
            this.setState({
            leagueSettings:
            {
                draftSlot: newDraftSlot         
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
        this.closeSettings(e)
    }

    UpdateSettingsAuto = () => {
        
        this.props.clicked(this.state.leagueSettings);
    }

    closeSettings = (e) =>{
        e.preventDefault();
        // this.setState({settingsOpen:false})
        this.props.toggleSettings();
    }


    render() {
        let formToReturn,
        blue = Classes.blue, 
        formGroup = Classes.formGroup, 
        formBox = Classes.formBox, 
        submitButton= Classes.submitButton, 
        closingButton= Classes.closingButton,
        budgetShown = Classes.show,
        draftSlotShown = Classes.show ;
        let panelShown;
  
        if(this.props.settingsOpen)
        {
            panelShown = Classes.show 
        }
        else
        {
            panelShown = Classes.hide 
        }

        if(this.props.leagueSettings.startingBudget == null)
        {
            budgetShown = Classes.hide;
        }

        if(this.props.leagueSettings.draftSlot == null)
        {
            draftSlotShown = Classes.hide;
        }



    

        if (this.props.leagueType === "Auction") {
            formToReturn =
                <form className={panelShown}>
                    <div className={formBox}>
                        <div className={Classes.closingButtonDiv}>
                    <button className={closingButton} onClick={(e) => { this.closeSettings(e) }}>XClose</button>
                    </div>
               
                        <div className={[formGroup, budgetShown].join(' ')}>
                            <label className={blue}>Starting Budget:  </label>
                            <input
                                type="int"
                                id="startingBudget"
                                name="startingBudget"
                                value={this.state.leagueSettings.startingBudget}
                                onChange={this.HandleUpdateStartingBudgetChange}
                            />
                        </div>
                        <div className={[formGroup, draftSlotShown].join(' ')}>
                            <label className={blue}>Draft Slot:  </label>
                            <input
                                type="number"
                                id="draftSlot"
                                ref="draftSlot"
                                name="draftSlot"
                                min = {1}
                                max = {this.props.leagueSettings.leagueSize}        
                                value={this.state.leagueSettings.draftSlot}
                                onChange={this.HandleUpdateDraftSlotChange}
                            />
                        </div>
                        <div className={formGroup}>
                            <label>League Size: </label>
                            <input type="number"
                                id="leagueSize"
                                name="leagueSize"
                                min="2"
                                max="32"
                                value={this.state.leagueSettings.leagueSize}
                                onChange={this.HandleUpdateLeagueSizeChange}
                            />
                        </div>
                        <div className={formGroup}>
                            <label>QB:  </label>
                            <input type="number"
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
                            <input type="number"
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
                            <input type="number"
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
                            <input type="number"
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
                            <input type="number"
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
                            <input type="number"
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
                            <input type="number"
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
                            <input type="number"
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
                            <input type="number"
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
                                onChange={this.HandleUpdateLeagueTypeChange}>

                                <option value="standard">Standard</option>
                                <option value="ppr">PPR</option>
                                <option value="dynasty">Dynasty</option>
                            </select>
                        </div>
                        <button className={submitButton} onClick={(e) => { this.UpdateSettings(e) }}>Submit Changes</button>
                    </div>
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