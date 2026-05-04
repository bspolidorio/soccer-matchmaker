"use client";

import { useTeamStore } from "../store/useTeamStore";
import { Input } from "@/shared/components/ui/input";
import { Settings2 } from "lucide-react";

export const TeamConfigCustomizer = () => {
  const { teams, updateTeamConfig } = useTeamStore();

  return (
    <div className="p-6 bg-card rounded-xl border border-border shadow-sm space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Settings2 className="w-4 h-4 text-primary" />
        <h3 className="font-bold text-sm uppercase tracking-wider">
          Personalizar Times
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {teams.map((team) => (
          <div key={team.id} className="flex items-center gap-3">
            <div className="relative group">
              <input
                type="color"
                value={team.color}
                onChange={(e) =>
                  updateTeamConfig(team.id, { color: e.target.value })
                }
                className="w-8 h-8 rounded-full border-2 border-background shadow-sm cursor-pointer overflow-hidden p-0 bg-transparent"
                style={{ appearance: "none" }}
              />
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ backgroundColor: team.color }}
              />
            </div>
            <Input
              value={team.name}
              onChange={(e) =>
                updateTeamConfig(team.id, { name: e.target.value })
              }
              className="h-8 text-xs font-bold"
              placeholder="Nome do Time"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
