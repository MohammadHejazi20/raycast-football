import { useState } from "react";
import { LeagueList } from "./components/league-list";
import TeamList from "./components/team-list";

export default function Command() {
  const [selectedLeague, setSelectedLeague] = useState<{ id: number; name: string } | null>(null);

  return selectedLeague ? (
    <TeamList leagueId={selectedLeague.id} />
  ) : (
    <LeagueList
      onSelect={(league) => {
        console.log("Selected league:", league);
        setSelectedLeague(league);
      }}
    />
  );
}
