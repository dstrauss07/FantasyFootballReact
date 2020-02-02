import React, { Component } from 'react';
import Aux from '../../../hoc/ReactAux';
import Classes from './DraftMenu.module.css';
// import NumericInput from 'react-numeric-input';

class DraftMenu extends Component {



    constructor(props) {
        super();
        this.state = {
            leagueSettings: props.leagueSettings,
            settingsOpen: props.settingsOpen,
            leagueType: props.leagueType,
        }
    }

    HandleUpdateStartingBudgetChange = (e) => {
        this.setState({
            leagueSettings:
            {
                startingBudget: parseInt(e.target.value)
            }
        }, () => {
            this.UpdateSettingsAuto();
            })
    }

    HandleUpdateDraftSlotChange = (e) => {
        let newDraftSlot = e.target.value;
        this.setState({
            leagueSettings:
            {
                draftSlot: parseInt(newDraftSlot)
            }    
            }, () => {
            this.UpdateSettingsAuto();
            })
    }

    HandleUpdateLeagueSizeChange = (e) => {
        this.setState({
            leagueSettings:
            {
                leagueSize: parseInt(e.target.value)
            }
        }, () => {
            this.UpdateSettingsAuto();
            })
    }

    HandleUpdateStartingQbChange = (e) => {
        this.setState({
            leagueSettings:
            {
                totalStartingQb: parseInt(e.target.value)
            }
        }, () => {
            this.UpdateSettingsAuto();
            })
    }

    HandleUpdateStartingRbChange = (e) => {
        console.log(e);
        this.setState({
            leagueSettings:
            {
                totalStartingRb: parseInt(e.target.value)
            }
        }, () => {
            this.UpdateSettingsAuto();
            })
    }

    HandleUpdateStartingWrChange = (e) => {
        this.setState({
            leagueSettings:
            {
                totalStartingWr: parseInt(e.target.value)
            }
        }, () => {
            this.UpdateSettingsAuto();
            })
    }


    HandleUpdateStartingTeChange = (e) => {
        this.setState({
            leagueSettings:
            {
                totalStartingTe: parseInt(e.target.value)
            }
        }, () => {
            this.UpdateSettingsAuto();
            })
    }

    HandleUpdateStartingFlexChange = (e) => {
        this.setState({
            leagueSettings:
            {
                totalStartingFlex: parseInt(e.target.value)
            }
        }, () => {
            this.UpdateSettingsAuto();
            })
    }

    HandleUpdateStartingSFlexChange = (e) => {
        this.setState({
            leagueSettings:
            {
                totalStartingSFlex: parseInt(e.target.value)
            }
        }, () => {
            this.UpdateSettingsAuto();
            })
    }

    HandleUpdateStartingDChange = (e) => {
        this.setState({
            leagueSettings:
            {
                totalStartingD: parseInt(e.target.value)
            }
        }, () => {
            this.UpdateSettingsAuto();
            })
    }

    HandleUpdateStartingKChange = (e) => {
        this.setState({
            leagueSettings:
            {
                totalStartingK: parseInt(e.target.value)
            }
        }, () => {
            this.UpdateSettingsAuto();
            })
    }

    HandleUpdateTotalPlayerChange = (e) => {
        this.setState({
            leagueSettings:
            {
                totalPlayer: parseInt(e.target.value)
            }
        }, () => {
            this.UpdateSettingsAuto();
            })
    }

    HandleUpdateLeagueTypeChange = (e) => {
        this.setState({
            leagueSettings:
            {
                leagueType: parseInt(e.target.value)
            }
        }, () => {
            this.UpdateSettingsAuto();
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

    closeSettings = (e) => {
        e.preventDefault();
        // this.props.clicked(this.state.leagueSettings);
        this.props.toggleSettings();
    }

    render() {
        let formToReturn,
            blue = Classes.blue,
            formGroup = Classes.formGroup,
            formSelect = Classes.formSelect,
            formBox = Classes.formBox,
            closingButton = Classes.closingButton,
            budgetShown = Classes.show,
            draftSlotShown = Classes.show;
        let panelShown;

        if (this.props.settingsOpen) {
            panelShown = Classes.show
        }
        else {
            panelShown = Classes.hide
        }

        if (this.props.draftType === "snake") {
            budgetShown = Classes.hide;
        }
        else if (this.props.draftType === "auction"){
            budgetShown = Classes.show
        }


        formToReturn =
            formToReturn =
            <form className={panelShown}>


                <div className={formBox}>
                <div className={formSelect}>
                        <label>League Type</label>
                        <select id="leagueType"
                            name="leagueType"
                            value={this.state.leagueSettings.leagueType}
                            onChange={this.HandleUpdateLeagueTypeChange}>
                            <option value="standard">Standard</option>
                            <option value="ppr">PPR</option>
                            <option value="dynasty">Dynasty</option>
                        </select>
                    </div>
                    <div className={[formGroup, budgetShown].join(' ')}>
                        <label>Budget</label>
                        <input type="number"
                            id="startingBudget"
                            name="startingBudget"
                            min="1"
                            max="1000000000"
                            value={this.state.leagueSettings.startingBudget}
                            onChange={this.HandleUpdateStartingBudgetChange}
                        />
                    </div>
                    <div className={formGroup}>
                        <label>Teams</label>
                        <input type="number"
                            id="leagueSize"
                            name="leagueSize"
                            min="2"
                            max="32"
                            value={this.state.leagueSettings.leagueSize}
                            onChange={this.HandleUpdateLeagueSizeChange}
                        />
                    </div>
                    <div className={[formGroup, draftSlotShown].join(' ')}>
                        <label className={blue}>Slot#</label>
                        <input
                            type="number"
                            id="draftSlot"
                            ref="draftSlot"
                            name="draftSlot"
                            min={1}
                            max={this.props.leagueSettings.leagueSize}
                            value={this.state.leagueSettings.draftSlot}
                            onChange={this.HandleUpdateDraftSlotChange}
                            onKeyDown="return false"
                        />
                    </div>
                    <div className={formGroup}>
                        <label>Players</label>
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
                        <label>QB</label>
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
                        <label>RB</label>
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
                        <label>WR</label>
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
                        <label>TE</label>
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
                        <label>FLEX </label>
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
                        <label>SFLEX </label>
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
                        <label>DST </label>
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
                        <label>K </label>
                        <input type="number"
                            id="totalStartingK"
                            name="totalStartingK"
                            min="0"
                            max="5"
                            value={this.state.leagueSettings.totalStartingK}
                            onChange={this.HandleUpdateStartingKChange}
                        />
                    </div>
                </div>
                <div className={Classes.buttonDiv}>
                        <button className={closingButton} onClick={(e) => { this.closeSettings(e) }}>close</button>
                </div>

            </form>



        return (
            <Aux>

                {formToReturn}


            </Aux>
        )
    }
}



export default DraftMenu;