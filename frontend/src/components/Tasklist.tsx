import {
  Anchor,
  Burger,
  Button,
  Center,
  Divider,
  Drawer,
  Flex,
  Group,
  List,
  ListItem,
  rem,
  Stack,
  Table,
  TableThProps,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { useFilteredData } from "../hooks/useFilteredData";
import { useDisclosure, useListState } from "@mantine/hooks";
import { TaskWithVisualOverrides } from "../types/Task";
import { useState } from "react";
import {
  IconArrowBigRightLinesFilled,
  IconChevronDown,
  IconChevronUp,
  IconSelector,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import classes from "../styles/Tasklist.module.css";
import useSorted from "../hooks/useSorted";
import Tooltip from "./Tooltip";
import Changelog from "./Changelog";
import useAuth from "../hooks/useAuth";
import { DateTime } from "ts-luxon";
import DateFilterDialog from "./DateFilterDialog";
import LightDarkModeButton from "./LightDarkModeButton";
import TasklistItems from "./TasklistItems";
import { apply_filter } from "../api/apply_filter";
import { Filter } from "./Filtering/Filter";
import { FilterBar } from "./Filtering/FilterBar";
import { AddNewFilter } from "./Filtering/AddNewFilter";

interface ThProps extends TableThProps {
  children: React.ReactNode | string;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort, ...others }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th {...others}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between" gap="xs">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterDataBySearchString(
  data: TaskWithVisualOverrides[],
  search: string
): TaskWithVisualOverrides[] {
  if (!search) return data;

  const query = search.toLowerCase().trim();

  // Filter data by text query
  return data.filter(
    (item) =>
      item.description.toLowerCase().includes(query) ||
      item.channel?.name?.toLowerCase().includes(query) ||
      item.status.label.toLowerCase().includes(query) ||
      item.tags.some((tag) => tag.toLowerCase().includes(query)) ||
      item.teams.some((team) => team.toLowerCase().includes(query)) ||
      item.author?.profile.display_name.toLowerCase().includes(query) ||
      item.assignees.some((user) =>
        user?.profile.display_name.toLowerCase().includes(query)
      )
  );
}

function filterDataByModifiedDate(
  data: TaskWithVisualOverrides[],
  cutoff_date?: DateTime,
  fade: boolean = false
): TaskWithVisualOverrides[] {
  if (!cutoff_date) return data;

  return fade
    ? data.map((item) => {
        if (item.modified < cutoff_date) item.faded = true;
        return item;
      })
    : data.filter((item) => item.modified >= cutoff_date);
}

export default function Tasklist() {
  const { tasks } = useFilteredData();
  const [search, setSearch] = useState("");
  const [opened, setOpened] = useState("");

  // const selected = useMap<string, boolean>();

  const [settingsOpened, { toggle: settingsToggle, close: settingsClose }] =
    useDisclosure(false);

  const [isSorted, isReversed, setSorting] = useSorted(tasks);

  const searchFilteredTasks = filterDataBySearchString(tasks, search);
  // const dateFilteredTasks = filterDataByModifiedDate(
  //   searchFilteredTasks,
  //   cutoffDate,
  //   true
  // ).map((t) => {
  //   t.opened = t._id === opened;
  //   return t;
  // });

  const filters: Filter<TaskWithVisualOverrides>[] = [];

  const [currentFilters, setCurrentFilters] = useListState(filters);
  const [quantifier, setQuantifier] = useState<"and" | "or">("and");
  const freeFilteredTasks =
    currentFilters.length > 0
      ? apply_filter(
          { type: quantifier, operands: currentFilters },
          searchFilteredTasks
        )
      : searchFilteredTasks;

  const [auth, setAuth] = useAuth();

  // Open opened tasks :)
  freeFilteredTasks.forEach(
    (task) => (task.opened = opened.includes(task._id))
  );

  return (
    <Center>
      <Drawer
        opened={settingsOpened}
        onClose={settingsClose}
        position="bottom"
        title={"Laari"}
        overlayProps={{ backgroundOpacity: 0.15 }}
        padding={"xl"}
        size={"xl"}
        styles={{ title: { fontWeight: 700, fontSize: rem(35) } }}
      >
        <Stack>
          <Text>
            Laari on Tietoan kehitysideoiden ja -ajatusten talletuspaikka.
            Työympäristössä jotain kehitettävää? Laita Slackkiin, kanavalle{" "}
            <Anchor href="slack://channel?team=T1FB2571R&id=C07RSEW76D9">
              #c-laari
            </Anchor>
            .
          </Text>

          <Text>
            Teknisissä asioissa laita idea Laariin tai pistä viesti{" "}
            <Anchor href="slack://user?team=T1FB2571R&id=DCHJRD96D">
              @ville
            </Anchor>
            lle.
          </Text>
          <Divider />
          <Button disabled={!auth} onClick={() => setAuth(null)} w={"10rem"}>
            Kirjaudu ulos
          </Button>
          <Divider />
          <Changelog />
        </Stack>
      </Drawer>
      <Stack maw={{ base: "100%", md: "80%" }}>
        <Flex wrap={"nowrap"} justify={"flex-start"} align={"center"}>
          <Burger opened={settingsOpened} onClick={settingsToggle}></Burger>
          <TextInput
            w="100%"
            value={search}
            placeholder="Vapaa haku"
            m="0.3em"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearch(event.currentTarget.value);
            }}
          />
          <AddNewFilter tasks={tasks} handlers={setCurrentFilters} />
          <LightDarkModeButton />
        </Flex>
        <FilterBar
          all_tasks={tasks}
          filtered_tasks={freeFilteredTasks}
          filters={currentFilters}
          handlers={setCurrentFilters}
          quantifier={quantifier}
          onQuantifierChange={setQuantifier}
          // onChange={setCurrentFilters}
        />

        <Table
          stickyHeader
          highlightOnHover
          layout="fixed"
          verticalSpacing="xs"
        >
          <Table.Thead>
            <Table.Tr style={{ fontWeight: 700 }}>
              <Th
                reversed={isReversed("description")}
                sorted={isSorted("description")}
                onSort={() => setSorting("description")}
                miw="68%"
                // w="68%"
              >
                Ajatus
              </Th>
              <Th
                visibleFrom="md"
                reversed={isReversed("created")}
                sorted={isSorted("created")}
                onSort={() => setSorting("created")}
                w={rem(135)}
              >
                Ehdotettu
              </Th>
              <Th
                visibleFrom="md"
                reversed={isReversed("teams")}
                sorted={isSorted("teams")}
                onSort={() => setSorting("teams")}
                w={rem(170)}
              >
                Tiimi
              </Th>

              <Th
                reversed={isReversed("status")}
                sorted={isSorted("status")}
                onSort={() => setSorting("status")}
                w="4rem"
              >
                <Tooltip tooltip="Status">
                  <IconArrowBigRightLinesFilled size="1rem" stroke={2} />
                </Tooltip>
              </Th>
              <Th
                reversed={isReversed("votes")}
                sorted={isSorted("votes")}
                onSort={() => setSorting("votes")}
                w="4rem"
              >
                <Tooltip tooltip="Slack-reaktioita">
                  <IconThumbUpFilled size="1rem" stroke={2} />
                </Tooltip>
              </Th>
            </Table.Tr>
          </Table.Thead>
          <TasklistItems
            tasks={freeFilteredTasks}
            onOpen={(openedTask) =>
              setOpened(opened === openedTask._id ? "" : openedTask._id)
            }
          />
          {/* <Table.Tbody>
            {dateFilteredTasks.map((task) => (
              <TasklistItem
                key={task._id}
                task={task}
                selected={false}
                opened={opened === task._id}
                onOpen={(openedTask) =>
                  setOpened(opened === openedTask._id ? "" : openedTask._id)
                }
              />
            ))}
          </Table.Tbody> */}
        </Table>
      </Stack>
    </Center>
  );
}
