import { Icon } from "lucide-react";
import { soccerBall } from "@lucide/lab";

export const Header = () => {
  return (
    <header className="py-8 text-center space-y-4">
      <h1 className="text-6xl font-black text-primary tracking-tighter italic">
        S
        <Icon
          className="inline animate-bounce h-12 w-12 ml-2"
          iconNode={soccerBall}
          aria-hidden="true"
        />
        CCER MATCHMAKER
      </h1>
    </header>
  );
};
