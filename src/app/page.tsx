import { Header } from "@/shared/components/ui/header";
import { TeamGeneratorFeature } from "@/features/team-generator/components/TeamGeneratorFeature";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <TeamGeneratorFeature />
    </main>
  );
}
