"use client";

import { useTeamStore } from "../store/useTeamStore";
import { PlayerInputTable } from "./PlayerInputTable";
import { GeneratorConfig } from "./GeneratorConfig";
import { TeamConfigCustomizer } from "./TeamConfigCustomizer";
import { TeamResultDisplay } from "./TeamResultDisplay";
import { Button } from "@/shared/components/ui/button";
import { Play, RotateCcw } from "lucide-react";
import { useState } from "react";

export const TeamGeneratorFeature = () => {
  const { generate, reset, players } = useTeamStore();
  const activeCount = players.filter((p) => p.name.trim() !== "").length;
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTeamText, setCurrentTeamText] = useState("");

  const handleGenerate = () => {
    setIsGenerating(true);

    let index = 0;

    const interval = setInterval(() => {
      setCurrentTeamText(players[index % players.length].name);
      index++;
    }, 120);

    setTimeout(() => {
      clearInterval(interval);
      setIsGenerating(false);
      generate();
    }, 2000);
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-12 space-y-10 `}>
      {isGenerating && (
        <div className="fixed h-full w-full inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="text-white text-3xl font-black tracking-tight animate-pulse">
            Gerando os times...
            <div className="mt-4 text-4xl text-center text-yellow-300">
              {currentTeamText}
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-6">
          <GeneratorConfig />
          <TeamConfigCustomizer />
          <div className="flex flex-col gap-3">
            <Button
              size="lg"
              className="
    w-full h-16 text-xl font-black uppercase tracking-tighter
    bg-linear-to-r from-pink-500 via-red-500 to-orange-500
    hover:from-pink-400 hover:via-red-400 hover:to-orange-400
    text-white
    shadow-[0_0_30px_rgba(239,68,68,0.5)]
    hover:shadow-[0_0_50px_rgba(239,68,68,0.7)]
    transition-all duration-300
    active:scale-95
  "
              onClick={handleGenerate}
              disabled={activeCount < 4}
            >
              <Play className="w-6 h-6 mr-2 fill-current" />
              Gerar Jogo
            </Button>
            <Button
              variant="ghost"
              className="w-full text-muted-foreground font-bold text-xs uppercase tracking-widest"
              onClick={reset}
            >
              <RotateCcw className="w-4 h-4 mr-2" /> Resetar Tudo
            </Button>
          </div>
          <div className="p-5 bg-primary/5 rounded-2xl border border-primary/10 shadow-inner">
            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">
              Status da Partida
            </p>
            <p className="text-3xl font-black tracking-tighter">
              {activeCount}{" "}
              <span className="text-sm font-bold text-muted-foreground">
                JOGADORES
              </span>
            </p>
          </div>
        </aside>
        <main className="lg:col-span-3">
          <PlayerInputTable />
        </main>
      </div>
      <TeamResultDisplay />
    </div>
  );
};
