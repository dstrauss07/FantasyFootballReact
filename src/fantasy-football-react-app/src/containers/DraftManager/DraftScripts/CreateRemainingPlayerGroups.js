export function CreateRemainingPlayerGroups(remainingPlayers,selectedPlayers){


  for (let i = 0; i < selectedPlayers.length; i++) {
    remainingPlayers = remainingPlayers.filter(p => p.playerToRank.playerId !== selectedPlayers[i].playerToRank.playerId);
  }
  let remQb = remainingPlayers.filter(p => p.playerToRank.playerPos === "QB"),
    remRb = remainingPlayers.filter(p => p.playerToRank.playerPos === "RB"),
    remWr = remainingPlayers.filter(p => p.playerToRank.playerPos === "WR"),
    remTe = remainingPlayers.filter(p => p.playerToRank.playerPos === "TE"),
    remDst = remainingPlayers.filter(p => p.playerToRank.playerPos === "DST"),
    remK = remainingPlayers.filter(p => p.playerToRank.playerPos === "K");

  let remainingPlayerGroups = {
    remQbs: remQb,
    remRbs: remRb,
    remWrs: remWr,
    remTes: remTe,
    remDsts: remDst,
    remKs:remK
  };

return [remainingPlayers,remainingPlayerGroups];

}