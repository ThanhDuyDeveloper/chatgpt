module.exports = {
  werewolf: {
    enabled: true,
    minPlayers: 4,
    maxPlayers: 16,
    gameTime: {
      day: 300000, // 5 minutes
      night: 180000, // 3 minutes
      vote: 120000 // 2 minutes
    },
    roles: {
      werewolf: { min: 1, max: 4 },
      villager: { min: 2, max: 12 },
      seer: { min: 0, max: 1 },
      doctor: { min: 0, max: 1 },
      hunter: { min: 0, max: 1 }
    }
  }
};