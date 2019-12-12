    RevertPick = (props) => {
        var currentDraftedGroup = this.state.currentDraftSession.selectedPlayers;
        var previousDraftedGroup = currentDraftedGroup.splice(0, i);
        var currentPickValue = this.state.currentDraftSession.currentPick;
        var myDraftedGroup = this.state.currentDraftSession.myPlayers;
        var  thisTeamPicking = parseInt(this.state.currentDraftSession.teamPicking);
        var previousMyDraftedGroup = this.state.currentDraftSession.myPlayers;
        var prevTeam = this.state.currentDraftSession.prevTeamPicking;
        var draftSlot = this.state.currentLeagueSettings.draftSlot;
        var nextPicker = this.FindWhoIsPicking(prevTeam, true);

        var i = currentDraftedGroup.length - 1;

        if (currentPickValue > 1) {
            if (prevTeam === draftSlot) {
                if (previousMyDraftedGroup.length > 0) {
                    console.log("removing from my players");
                    var j = myDraftedGroup.length - 1;
                    previousMyDraftedGroup = previousMyDraftedGroup.splice(0, j);
                }
            }
            currentPickValue--;
            console.log(previousMyDraftedGroup);

            this.setState({
                currentDraftSession: {
                    selectedPlayers: previousDraftedGroup,
                    draftComplete: false,
                    currentPick: currentPickValue,
                    myPlayers: previousMyDraftedGroup,
                    prevTeamPicking: thisTeamPicking,
                    teamPicking: nextPicker
                }
            }, console.log(this.state.currentDraftSession));
        }
    }