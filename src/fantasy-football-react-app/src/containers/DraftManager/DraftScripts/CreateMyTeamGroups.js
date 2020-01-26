export function  CreateMyTeamGroups(myTeam){ 
  let myQb = myTeam.filter(p => p.playerToRank.playerPos === "QB"),
  myRb = myTeam.filter(p => p.playerToRank.playerPos === "RB"),
  myWr = myTeam.filter(p => p.playerToRank.playerPos === "WR"),
  myTe = myTeam.filter(p => p.playerToRank.playerPos === "TE"),
  myDst = myTeam.filter(p => p.playerToRank.playerPos === "DST"),
  myK = myTeam.filter(p => p.playerToRank.playerPos === "K"); 
  
  let myTeamGroups = {
  myQbs : myQb,
  myRbs:myRb,
  myWrs:myWr,
  myTes:myTe,
  myDsts:myDst,
  myKs:myK}; 
  return myTeamGroups;
}
