import { useState } from "react";
import { Detail } from "@raycast/api";
import { LeagueList } from "./components/league-list";

export default function Command() {
  const [selectedLeague, setSelectedLeague] = useState<{ id: string; name: string } | null>(null);

  return selectedLeague ? (
    <Detail markdown={`# 🏆 ${selectedLeague.name}\nFetching matches...`} />
  ) : (
    <LeagueList
      onSelect={(league) => {
        console.log("Selected league:", league);
        setSelectedLeague(league);
      }}
    />
  );
}
