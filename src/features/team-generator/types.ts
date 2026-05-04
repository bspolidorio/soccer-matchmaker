export type Position = 'Goalkeeper' | 'Defender' | 'Midfield' | 'Forward';
export type Skill = 'High' | 'Medium' | 'Low';

export interface Player {
  id: string;
  name: string;
  position: Position;
  skill: Skill;
  isLoaned?: boolean;
  fromTeamId?: string;
  fromTeamName?: string;
}

export interface Team {
  id: string;
  name: string;
  color: string;
  players: Player[];
}

export interface TeamGeneratorConfig {
  playersPerSide: number;
}
