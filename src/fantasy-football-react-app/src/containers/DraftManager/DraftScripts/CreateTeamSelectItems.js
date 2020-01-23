export function CreateTeamSelectItems(leagueSize,teamShown,draftSlot){
  let teamTogglerOptions = [];
  for (let i = 1; i <= leagueSize; i++) {
      if (i === teamShown) {
          if(i===draftSlot)
          {
              teamTogglerOptions.push(<option selected="selected" key={i} value={i}>Your Team</option>);
          }
          else
          {

              teamTogglerOptions.push(<option selected="selected" key={i} value={i}>Team {i}</option>);
          }
      }
      else {
          if(i=== props.leagueSettings.draftSlot)
          {
              teamTogglerOptions.push(<option  key={i} value={i}>Your Team</option>);
          }
          else
          {
              teamTogglerOptions.push(<option key={i} value={i}>Team {i}</option>);
          }
      }
  }
  return teamTogglerOptions;
}