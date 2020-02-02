

export function DetermineDraftValues(rankings,leagueSettings,draftType){

let rankingsToReturn = [];
const leagueTotalBudget = leagueSettings.startingBudget * leagueSettings.leagueSize;
const startingQb = leagueSettings.totalStartingQb,
startingRb =  leagueSettings.totalStartingRb,
startingWr = leagueSettings.totalStartingWr,
startingTe  = leagueSettings.totalStartingTe,
startingD =  leagueSettings.totalStartingD,
startingK  =  leagueSettings.totalStartingK,
startingFlex =  leagueSettings.totalStartingFlex,
startingSFlex = leagueSettings.totalStartingSFlex;
const starterCount = startingQb +startingRb+startingWr+startingTe+startingD+startingSFlex+startingFlex;
const totalPlayersPerTeam =leagueSettings.totalPlayer;
const benchCount =   totalPlayersPerTeam  - starterCount;
const totalPlayersDrafted = totalPlayersPerTeam * leagueSettings.leagueSize;
let draftValues =[];



for(let i=0; i< rankings.length;i++)
{
  let playerToAdd = rankings[i];

if(i<45)
{
  let playerValue =  60-i;
  playerToAdd.playerValue = playerValue;
  draftValues.push(playerToAdd)
}
else if(i>44 && i<50)
{
  let playerValue =  15;
  playerToAdd.playerValue = playerValue;
  draftValues.push(playerToAdd)
}

else if(i > 49 && i<55 )
{
let playerValue =  14;
playerToAdd.playerValue = playerValue;
draftValues.push(playerToAdd)
}
else if(i > 54 && i<60 )
{
let playerValue =  13;
playerToAdd.playerValue = playerValue;
draftValues.push(playerToAdd)
}
else if(i>59 && i<65)
{
  let playerValue =  12;
  playerToAdd.playerValue = playerValue;
  draftValues.push(playerToAdd)
}

else if(i>64 && i<75)
{
  let playerValue =  11;
  playerToAdd.playerValue = playerValue;
  draftValues.push(playerToAdd)
}


else if(i>69 && i<75)
{
  let playerValue =  10;
  playerToAdd.playerValue = playerValue;
  draftValues.push(playerToAdd)
}

else if(i>74 && i<80)
{
  let playerValue =  9;
  playerToAdd.playerValue = playerValue;
  draftValues.push(playerToAdd)
}

else if(i>79 && i<85)
{
  let playerValue =  8;
  playerToAdd.playerValue = playerValue;
  draftValues.push(playerToAdd)
}

else if(i>84 && i<90)
{
  let playerValue =  7;
  playerToAdd.playerValue = playerValue;
  draftValues.push(playerToAdd)
}

else if(i>89 && i<95)
{
  let playerValue =  6;
  playerToAdd.playerValue = playerValue;
  draftValues.push(playerToAdd)
}


else if(i>94 && i<100)
{
  let playerValue =  5;
  playerToAdd.playerValue = playerValue;
  draftValues.push(playerToAdd)
}

else if(i>99 && i<110)
{
  let playerValue =  4;
  playerToAdd.playerValue = playerValue;
  draftValues.push(playerToAdd)
}


else if(i>109 && i<120)
{
  let playerValue =  3;
  playerToAdd.playerValue = playerValue;
  draftValues.push(playerToAdd)
}


else if(i>119 && i<151)
{
  let playerValue =  2;
  playerToAdd.playerValue = playerValue;
  draftValues.push(playerToAdd)
}


else if(i>120 && i<151)
{
  let playerValue =  2;
  playerToAdd.playerValue = playerValue;
  draftValues.push(playerToAdd)
}


else if(i>150 && i<totalPlayersDrafted)
{
  let playerValue =  1;
  playerToAdd.playerValue = playerValue;
  draftValues.push(playerToAdd)

}
else
{
  let playerValue =  0;
  playerToAdd.playerValue = playerValue;
  draftValues.push(playerToAdd)
}
}

//TODO ADD MORE COMPLEX DRAFT VALUE CONVERSIONS 
rankingsToReturn = draftValues;

return rankingsToReturn;
}