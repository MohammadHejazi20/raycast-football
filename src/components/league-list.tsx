import { List, ActionPanel, Action, Keyboard } from "@raycast/api";

// TODO: use https://api.football-data.org/v4/competitions to get leagues

const leagues = [
  {
    id: 2021,
    name: "Premier League",
    country: "England",
    icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    shortcut: { modifiers: ["cmd"], key: "e" } as Keyboard.Shortcut,
  },
  {
    id: 2014,
    name: "La Liga",
    country: "Spain",
    icon: "🇪🇸",
    shortcut: { modifiers: ["cmd"], key: "s" } as Keyboard.Shortcut,
  },
  {
    id: 2002,
    name: "Bundesliga",
    country: "Germany",
    icon: "🇩🇪",
    shortcut: { modifiers: ["cmd"], key: "g" } as Keyboard.Shortcut,
  },
  {
    id: 2019,
    name: "Serie A",
    country: "Italy",
    icon: "🇮🇹",
    shortcut: { modifiers: ["cmd"], key: "i" } as Keyboard.Shortcut,
  },
  {
    id: 2015,
    name: "Ligue 1",
    country: "France",
    icon: "🇫🇷",
    shortcut: { modifiers: ["cmd"], key: "f" } as Keyboard.Shortcut,
  },
  {
    id: 2003,
    name: "Eredivisie",
    country: "Netherlands",
    icon: "🇳🇱",
    shortcut: { modifiers: ["cmd"], key: "n" } as Keyboard.Shortcut,
  },
];

type LeagueListProps = {
  onSelect: (league: { id: number; name: string; country: string }) => void;
};

export function LeagueList({ onSelect }: LeagueListProps) {
  return (
    <List searchBarPlaceholder="Search leagues...">
      {leagues.map((league) => (
        <List.Item
          key={league.id}
          icon={league.icon}
          title={league.name}
          subtitle={league.country}
          accessories={[
            { text: "View Matches" },
            league.shortcut ? { text: `⌘ + ${league.shortcut.key.toUpperCase()}` } : {},
          ]}
          actions={
            <ActionPanel>
              <Action title="Select League" onAction={() => onSelect(league)} />
              {league.shortcut && (
                <Action
                  title={`Quick Select ${league.name}`}
                  onAction={() => onSelect(league)}
                  shortcut={league.shortcut}
                />
              )}
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
