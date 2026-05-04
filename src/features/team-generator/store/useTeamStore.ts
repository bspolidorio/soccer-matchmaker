import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Player, Team } from "../types";
import { generateTeams } from "../generateTeams";

interface TeamState {
  players: Player[];
  teams: Team[];
  playersPerSide: number;
  generatedTeams: Team[];

  // Actions
  addPlayer: () => void;
  removePlayer: (id: string) => void;
  updatePlayer: (id: string, updates: Partial<Player>) => void;
  updateTeamConfig: (id: string, updates: Partial<Team>) => void;
  setPlayersPerSide: (count: number) => void;
  generate: () => void;
  reset: () => void;
}

const DEFAULT_COLORS = [
  "#3b82f6",
  "#10b981",
  "#a855f7",
  "#f97316",
  "#ef4444",
  "#eab308",
];

const createDefaultPlayer = (): Player => ({
  id: `player-${Math.random().toString(36).substr(2, 9)}`,
  name: "",
  skill: "Medium",
  position: "Goalkeeper",
  isLoaned: false,
});

const createDefaultTeam = (index: number): Team => ({
  id: `team-config-${index}`,
  name: `Time ${index + 1}`,
  color: DEFAULT_COLORS[index % DEFAULT_COLORS.length],
  players: [],
});

export const useTeamStore = create<TeamState>()(
  persist(
    (set, get) => ({
      players: Array.from({ length: 12 }, createDefaultPlayer),
      teams: Array.from({ length: 4 }, (_, i) => createDefaultTeam(i)),
      playersPerSide: 5,
      generatedTeams: [],

      addPlayer: () =>
        set((state) => ({
          players: [...state.players, createDefaultPlayer()],
        })),

      removePlayer: (id) =>
        set((state) => ({
          players: state.players.filter((p) => p.id !== id),
        })),

      updatePlayer: (id, updates) =>
        set((state) => ({
          players: state.players.map((p) =>
            p.id === id ? { ...p, ...updates } : p,
          ),
        })),

      updateTeamConfig: (id, updates) =>
        set((state) => {
          const updatedTeams = state.teams.map((t) =>
            t.id === id ? { ...t, ...updates } : t,
          );

          const updatedGeneratedTeams = state.generatedTeams.map(
            (gt, index) => {
              const config = updatedTeams[index];
              if (config) {
                return {
                  ...gt,
                  name: config.name,
                  color: config.color,
                  players: gt.players.map((p) => {
                    if (p.isLoaned) {
                      const sourceConfig = state.teams.find(
                        (t) => t.name === p.fromTeamName,
                      );
                      const newSourceConfig = updatedTeams.find(
                        (t) => t.id === sourceConfig?.id,
                      );
                      return {
                        ...p,
                        fromTeamName: newSourceConfig?.name || p.fromTeamName,
                      };
                    }
                    return p;
                  }),
                };
              }
              return gt;
            },
          );

          return {
            teams: updatedTeams,
            generatedTeams: updatedGeneratedTeams,
          };
        }),

      setPlayersPerSide: (count) => set({ playersPerSide: count }),

      generate: () => {
        const { players, playersPerSide, teams: teamConfigs } = get();
        const teams = generateTeams(players, playersPerSide);

        const customizedTeams = teams.map((team, index) => {
          const config = teamConfigs[index] || createDefaultTeam(index);
          return {
            ...team,
            name: config.name,
            color: config.color,
            players: team.players.map((p) => ({
              ...p,
              fromTeamName: p.fromTeamName
                ? teamConfigs.find((t) => t.name === p.fromTeamName)?.name ||
                  p.fromTeamName
                : undefined,
            })),
          };
        });

        set({ generatedTeams: customizedTeams });
      },

      reset: () =>
        set({
          players: Array.from({ length: 12 }, createDefaultPlayer),
          generatedTeams: [],
        }),
    }),
    {
      name: "soccer-matchmaker-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
