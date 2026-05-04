import { Player, Team, Skill } from "./types";

const SKILL_VALUES: Record<Skill, number> = {
  High: 3,
  Medium: 2,
  Low: 1,
};

export function generateTeams(
  players: Player[],
  playersPerSide: number,
): Team[] {
  const activePlayers = [...players]
    .filter((p) => p.name.trim() !== "")
    .sort(() => Math.random() - 0.5); // Shuffle for randomness within skill groups

  const totalActive = activePlayers.length;
  if (totalActive === 0) return [];

  // 1. Determine how many real players each team will get
  const numTeams = Math.ceil(totalActive / playersPerSide);
  const realPlayerBudgets: number[] = [];
  let playersToDistribute = totalActive;

  for (let i = 0; i < numTeams; i++) {
    const budget = Math.min(playersToDistribute, playersPerSide);
    realPlayerBudgets.push(budget);
    playersToDistribute -= budget;
  }

  const teams: Team[] = Array.from({ length: numTeams }, (_, i) => ({
    id: `team-${i + 1}`,
    name: `Time ${i + 1}`,
    color: "",
    players: [],
  }));

  // 2. Separate and sort players for balanced distribution
  const goalkeepers = activePlayers.filter((p) => p.position === "Goalkeeper");
  const fieldPlayers = activePlayers.filter((p) => p.position !== "Goalkeeper");
  fieldPlayers.sort((a, b) => SKILL_VALUES[b.skill] - SKILL_VALUES[a.skill]);

  // 3. Distribution helper (Snake Draft)
  let teamIdx = 0;
  let direction = 1;

  const distribute = (playerList: Player[]) => {
    playerList.forEach((player) => {
      let attempts = 0;
      while (
        teams[teamIdx].players.length >= realPlayerBudgets[teamIdx] &&
        attempts < numTeams
      ) {
        teamIdx += direction;
        if (teamIdx >= numTeams) {
          teamIdx = numTeams - 1;
          direction = -1;
        } else if (teamIdx < 0) {
          teamIdx = 0;
          direction = 1;
        }
        attempts++;
      }

      if (teams[teamIdx].players.length < realPlayerBudgets[teamIdx]) {
        teams[teamIdx].players.push(player);

        teamIdx += direction;
        if (teamIdx >= numTeams) {
          teamIdx = numTeams - 1;
          direction = -1;
        } else if (teamIdx < 0) {
          teamIdx = 0;
          direction = 1;
        }
      }
    });
  };

  distribute(goalkeepers);
  distribute(fieldPlayers);

  // 4. Parallel Loan System: Ensure the team can play against ANY other team.
  teams.forEach((team) => {
    const numRealPlayers = team.players.length;
    if (numRealPlayers < playersPerSide) {
      const needed = playersPerSide - numRealPlayers;

      const otherTeams = teams.filter((t) => t.id !== team.id);

      otherTeams.forEach((otherTeam) => {
        const realPlayers = [...otherTeam.players].filter((p) => !p.isLoaned);
        const shuffledLenders = realPlayers.sort(() => Math.random() - 0.5);
        for (let i = 0; i < needed; i++) {
          const player = shuffledLenders[i % shuffledLenders.length];
          if (player) {
            team.players.push({
              ...player,
              isLoaned: true,
              fromTeamId: otherTeam.id,
              fromTeamName: otherTeam.name,
              id: `${player.id}-loan-for-${team.id}-from-${otherTeam.id}-${i}`,
            });
          }
        }
      });
    }
  });

  return teams;
}
