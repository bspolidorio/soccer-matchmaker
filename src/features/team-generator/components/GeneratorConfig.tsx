"use client";

import { useTeamStore } from "../store/useTeamStore";
import { Input } from "@/shared/components/ui/input";

export const GeneratorConfig = () => {
  const { playersPerSide, setPlayersPerSide } = useTeamStore();

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-6 bg-secondary/30 rounded-xl border border-border">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Jogadores por Lado</label>
        <p className="text-xs text-muted-foreground">Ex: 5v5, 7v7</p>
      </div>
      <Input
        type="number"
        min={2}
        max={11}
        className="w-24 text-center text-lg font-bold"
        value={playersPerSide}
        onChange={(e) => setPlayersPerSide(parseInt(e.target.value) || 5)}
      />
    </div>
  );
};
