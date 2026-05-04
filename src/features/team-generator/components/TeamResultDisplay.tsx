"use client";

import React from "react";
import { useTeamStore } from "../store/useTeamStore";
import { Users } from "lucide-react";
import { cn } from "@/shared/lib/utils";

type SimpleCardProps = {
  children: React.ReactNode;
  title: string;
  color: string;
};

const SimpleCard = ({ children, title, color }: SimpleCardProps) => (
  <div className="bg-card rounded-xl border border-border overflow-hidden shadow-md transition-all hover:shadow-lg">
    <div
      className="px-4 py-3 border-b border-border flex items-center justify-between"
      style={{ backgroundColor: `${color}15` }}
    >
      <h3
        className="font-black flex items-center gap-2 uppercase tracking-tight"
        style={{ color }}
      >
        <Users className="w-5 h-5" /> {title}
      </h3>
      <div
        className="w-3 h-3 rounded-full shadow-inner"
        style={{ backgroundColor: color }}
      />
    </div>
    <div className="p-4 space-y-2 from-transparent to-muted/5">{children}</div>
  </div>
);

export const TeamResultDisplay = () => {
  const { generatedTeams, teams: teamConfigs } = useTeamStore();

  if (generatedTeams.length === 0) return null;

  return (
    <div className="space-y-8 pt-10">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-black text-primary tracking-tighter italic uppercase">
          CONFRONTO DEFINIDO
        </h2>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto font-medium">
          Identifique a cor do extra: se ele for da cor do seu adversário, ele é
          reserva nesse jogo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {generatedTeams.map((team) => {
          const realPlayers = team.players.filter((p) => !p.isLoaned);
          const loanedPlayers = team.players.filter((p) => p.isLoaned);
          const teamColor = team.color || "#000";

          return (
            <SimpleCard key={team.id} title={team.name} color={teamColor}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                      Titulares
                    </p>
                    <span className="text-[10px] font-bold bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                      {realPlayers.length} JOGADORES
                    </span>
                  </div>
                  <div className="grid gap-1.5">
                    {realPlayers.map((player) => (
                      <div
                        key={player.id}
                        className="flex items-center justify-between p-3 rounded-xl border bg-card border-border/50 shadow-sm transition-all hover:border-primary/20"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-1.5 h-6 rounded-full"
                            style={{ backgroundColor: teamColor }}
                          />
                          <span className="font-extrabold text-sm tracking-tight">
                            {player.name}
                          </span>
                        </div>
                        <span className="text-[10px] uppercase font-black px-2 py-1 rounded-lg bg-secondary text-secondary-foreground border border-border">
                          {player.position.substring(0, 3)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {loanedPlayers.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest px-1">
                      Extras (Banco por Cor)
                    </p>
                    <div className="grid gap-2">
                      {loanedPlayers.map((player) => {
                        const originConfig = teamConfigs.find(
                          (t) => t.id === player.fromTeamId,
                        );
                        const originColor = originConfig?.color || "#f59e0b";
                        const originName =
                          originConfig?.name || player.fromTeamName || "TIME";

                        return (
                          <div
                            key={player.id}
                            className="flex items-center justify-between p-3 rounded-xl border shadow-sm transition-all"
                            style={{
                              backgroundColor: `${originColor}08`,
                              borderColor: `${originColor}30`,
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={cn(
                                  "w-2.5 h-2.5 rounded-full shadow-inner animate-pulse",
                                )}
                                style={{ backgroundColor: originColor }}
                              />
                              <div className="flex flex-col">
                                <span className="font-bold text-sm leading-none tracking-tight">
                                  {player.name}
                                </span>
                                <span
                                  className="text-[10px] font-black mt-1.5 uppercase opacity-70"
                                  style={{ color: originColor }}
                                >
                                  VEM DO {originName}
                                </span>
                              </div>
                            </div>
                            <span
                              className="text-[10px] uppercase font-black px-2 py-1 rounded-lg text-white shadow-sm"
                              style={{ backgroundColor: originColor }}
                            >
                              {player.position.substring(0, 3)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </SimpleCard>
          );
        })}
      </div>
    </div>
  );
};
