import { Action, ActionPanel, List } from "@raycast/api";
import { useEffect, useState } from "react";
import { FOOTBALL_API_KEY } from "../../secrets";

type Filters = {
  client: string;
};

type Area = {
  id: number;
  name: string;
  code: string;
  flag: string | null;
};

type Season = {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner: WinnerTeam | null;
};

type WinnerTeam = {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address?: string;
  website?: string;
  founded?: number;
  clubColors?: string;
  venue?: string;
  lastUpdated?: string;
};

type Competition = {
  id: number;
  area: Area;
  name: string;
  code: string;
  type: "LEAGUE" | "CUP";
  emblem: string;
  plan: string;
  currentSeason: Season;
  numberOfAvailableSeasons: number;
  lastUpdated: string;
};

type CompetitionResponse = {
  count: number;
  filters: Filters;
  competitions: Competition[];
};

type LeagueListProps = {
  onSelect: (league: { id: number; name: string; country: string }) => void;
};

export function LeagueList({ onSelect }: LeagueListProps) {
  const [leagues, setLeagues] = useState<Competition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchLeagues() {
      try {
        const res = await fetch("https://api.football-data.org/v4/competitions", {
          headers: { "X-Auth-Token": FOOTBALL_API_KEY },
        });

        if (!res.ok) throw new Error(`Failed to fetch leagues: ${res.statusText}`);
        const data = (await res.json()) as CompetitionResponse;

        setLeagues(data.competitions);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLeagues();
  }, []);

  if (isLoading) {
    return <List isLoading />;
  }

  if (error) {
    return <List.EmptyView title="Error fetching leagues" description={error.message} />;
  }

  if (!leagues.length) {
    return <List.EmptyView title="No leagues found" description="Please try again later." />;
  }

  return (
    <List searchBarPlaceholder="Search leagues...">
      {leagues.map((league) => (
        <List.Item
          key={league.id}
          icon={league.emblem}
          title={league.name}
          subtitle={league.area.name}
          accessories={[{ text: "View Matches" }, league.plan ? { text: `Plan: ${league.plan}` } : {}]}
          actions={
            <ActionPanel>
              <Action
                title="Select League"
                onAction={() =>
                  onSelect({
                    id: league.id,
                    name: league.name,
                    country: league.area.name,
                  })
                }
              />
              {league.plan && (
                <Action
                  title={`Quick Select ${league.name}`}
                  onAction={() =>
                    onSelect({
                      id: league.id,
                      name: league.name,
                      country: league.area.name,
                    })
                  }
                />
              )}
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
