import { Box, Center, Group, Stack, Text, Tooltip } from "@mantine/core";
import { TaskWithVisualOverrides } from "../types/Task";

type TeamAggregate = {
  team: string;
  totalVotes: number;
  taskCount: number;
};

const COLORS = [
  "#4dabf7",
  "#63e6be",
  "#ffd43b",
  "#ff8787",
  "#9775fa",
  "#ffa94d",
  "#69db7c",
  "#a5d8ff",
];

function colorForTeam(team: string) {
  const index = Math.abs(
    Array.from(team).reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  );
  return COLORS[index % COLORS.length];
}

export default function TeamBubbles({
  tasks,
}: {
  tasks: TaskWithVisualOverrides[];
}) {
  const aggregatesMap = new Map<string, TeamAggregate>();

  tasks.forEach((task) => {
    if (!task.teams || task.teams.length === 0) return;

    const votesForTask = task.votes.length;
    const uniqueTeams = Array.from(new Set(task.teams));

    uniqueTeams.forEach((team) => {
      const current = aggregatesMap.get(team) ?? {
        team,
        totalVotes: 0,
        taskCount: 0,
      };
      current.totalVotes += votesForTask;
      current.taskCount += 1;
      aggregatesMap.set(team, current);
    });
  });

  const aggregates = Array.from(aggregatesMap.values()).sort(
    (a, b) => b.totalVotes - a.totalVotes
  );

  if (aggregates.length === 0) {
    return (
      <Center mt="md">
        <Text c="dimmed" size="sm">
          Ei tiimejä näkyvissä valitulla suodatuksella.
        </Text>
      </Center>
    );
  }

  const maxVotes = Math.max(...aggregates.map((a) => a.totalVotes));
  const MIN_SIZE = 60; // px
  const MAX_SIZE = 180; // px

  const scaleSize = (votes: number) => {
    if (maxVotes === 0) return MIN_SIZE;
    const ratio = votes / maxVotes;
    return MIN_SIZE + (MAX_SIZE - MIN_SIZE) * ratio;
  };

  return (
    <Center mt="md">
      <Group justify="center" gap="lg" wrap="wrap" maw="100%">
        {aggregates.map((agg) => {
          const size = scaleSize(agg.totalVotes);
          const color = colorForTeam(agg.team);

          return (
            <Tooltip
              key={agg.team}
              label={`${agg.team}: ${agg.totalVotes} ääntä, ${agg.taskCount} ideaa`}
              withArrow
            >
              <Stack
                align="center"
                gap={4}
                style={{ cursor: "default" }}
              >
                <Box
                  style={{
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    backgroundColor: color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 8px rgba(0,0,0,0.15)",
                  }}
                >
                  <Text
                    ta="center"
                    size={size > 100 ? "sm" : "xs"}
                    fw={600}
                    c="black"
                    style={{ padding: "0 4px" }}
                  >
                    {agg.totalVotes}
                  </Text>
                </Box>
                <Text size="xs" fw={500} ta="center" lineClamp={2} maw={140}>
                  {agg.team}
                </Text>
              </Stack>
            </Tooltip>
          );
        })}
      </Group>
    </Center>
  );
}
