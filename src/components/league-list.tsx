import { List, ActionPanel, Action, Keyboard } from "@raycast/api";

const leagues = [
  { id: "PL", name: "Premier League", country: "England", icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  {
    id: "LL",
    name: "La Liga",
    country: "Spain",
    icon: "🇪🇸",
    shortcut: { modifiers: ["cmd"], key: "s" } as Keyboard.Shortcut,
  },
  {
    id: "BL",
    name: "Bundesliga",
    country: "Germany",
    icon: "🇩🇪",
    shortcut: { modifiers: ["cmd"], key: "g" } as Keyboard.Shortcut,
  },
  { id: "SA", name: "Serie A", country: "Italy", icon: "🇮🇹" },
  { id: "L1", name: "Ligue 1", country: "France", icon: "🇫🇷" },
  { id: "ED", name: "Eredivisie", country: "Netherlands", icon: "🇳🇱" },
];

type LeagueListProps = {
  onSelect: (league: { id: string; name: string; country: string }) => void;
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
