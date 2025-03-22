import { Action, ActionPanel, List, open, showToast, Toast } from "@raycast/api";
import { useEffect, useState } from "react";
import { FOOTBALL_API_KEY } from "../../secrets";

type DataObject = {
  count: number;
  filters: {
    limit: number;
    offset: number;
    permission: string;
  };
  teams: Array<{
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
    address: string;
    website: string;
    founded: number;
    clubColors: string;
    venue: string;
    lastUpdated: string;
  }>;
};

type Teams = {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  lastUpdated: string;
};

export default function TeamList({ leagueId }: { leagueId?: number }) {
  const [teams, setTeams] = useState<Teams[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch(`https://api.football-data.org/v4/competitions/${leagueId}/teams`, {
          headers: { "X-Auth-Token": FOOTBALL_API_KEY },
        });

        if (!response.ok) throw new Error("Failed to fetch teams");
        const data = (await response.json()) as DataObject;

        setTeams(data.teams || []);
        showToast({ style: Toast.Style.Success, title: "Teams fetched successfully" });
      } catch (error: unknown) {
        showToast({ style: Toast.Style.Failure, title: "Error fetching teams: " + error });
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, []);

  return (
    <List isLoading={loading} searchBarPlaceholder="Search teams...">
      {teams.map((team) => (
        <List.Item
          key={team.id}
          icon={team.crest}
          title={team.shortName}
          accessories={[{ text: "View Details" }]}
          actions={
            <ActionPanel>
              <Action title="Open Team Website" onAction={() => open(team.website)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
