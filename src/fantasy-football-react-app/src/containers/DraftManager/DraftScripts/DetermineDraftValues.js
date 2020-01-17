

export function DetermineDraftValues(rankings,leagueSettings){

let rankingsToReturn = [];

for(let i=0; i< rankings.length;i++)
{
var playerToAdd = rankings[i];
playerToAdd.playerRanking.playerValue = 40-i;
rankingsToReturn.push(playerToAdd)
}

console.log(rankingsToReturn);
return rankingsToReturn;
}