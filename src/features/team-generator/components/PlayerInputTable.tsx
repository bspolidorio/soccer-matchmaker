"use client";

import { useTeamStore } from "../store/useTeamStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Input } from "@/shared/components/ui/input";
import { Select } from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { Position, Skill } from "../types";

export const PlayerInputTable = () => {
  const { players, updatePlayer, removePlayer, addPlayer } = useTeamStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Jogadores</h2>
        <Button onClick={addPlayer} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" /> Adicionar
        </Button>
      </div>

      <div className="border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Posição</TableHead>
              <TableHead>Habilidade</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((player, index) => (
              <TableRow key={player.id}>
                <TableCell>
                  <Input
                    placeholder={`Jogador ${index + 1}`}
                    value={player.name}
                    onChange={(e) =>
                      updatePlayer(player.id, { name: e.target.value })
                    }
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={player.position}
                    onValueChange={(val) =>
                      updatePlayer(player.id, { position: val as Position })
                    }
                  >
                    <option value="Goalkeeper">Goleiro</option>
                    <option value="Defender">Zagueiro</option>
                    <option value="Midfield">Meio-Campo</option>
                    <option value="Forward">Atacante</option>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    value={player.skill}
                    onValueChange={(val) =>
                      updatePlayer(player.id, { skill: val as Skill })
                    }
                  >
                    <option value="High">Alto (Craque)</option>
                    <option value="Medium">Médio</option>
                    <option value="Low">Baixo (Perna de Pau)</option>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removePlayer(player.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
