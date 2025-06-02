import { Chip, Group, rem, Text } from "@mantine/core";
import { ExtendedTask } from "../../types/Task";
import { FieldInput } from "./FieldInput";
import { Filter } from "./Filter";
import { UseListStateHandlers } from "@mantine/hooks";
import { IconLetterA, IconLetterE } from "@tabler/icons-react";

interface FilterBarProps {
  all_tasks: ExtendedTask[];
  filtered_tasks: ExtendedTask[];
  filters: Filter<ExtendedTask>[];
  handlers: UseListStateHandlers<Filter<ExtendedTask>>;
  quantifier: "and" | "or";
  onQuantifierChange: (q: "and" | "or") => void;
  //   onChange: (handlers: UseListStateHandlers<Filter<ExtendedTask>>) => void;
}

// const structure: FilterStructure<ExtendedTask> = [
//   {
//     field: "description",
//     label: "Kuvaus",
//     type: "string",
//   },
//   {
//     field: "created",
//     label: "Kirjattu",
//     type: "datetime",
//   },
//   {
//     field: "modified",
//     label: "Muokattu",
//     type: "datetime",
//   },
//   {
//     field: "teams",
//     label: "Tiimi",
//     type: "array",
//   },
//   {
//     field: "author.profile.display_name",
//     label: "Ehdottaja",
//     type: "string",
//   },
//   {
//     field: "status.label",
//     label: "Status",
//     type: "string",
//   },
//   {
//     field: "channel.name",
//     label: "Kanava",
//     type: "string",
//   },
// ];

export function FilterBar({
  all_tasks,
  filtered_tasks,
  filters,
  handlers,
  quantifier,
  onQuantifierChange,
}: FilterBarProps) {
  return filters.length > 0 ? (
    <Group justify="space-between">
      <Group>
        {filters.map((filter, index) => (
          <FieldInput
            collection={all_tasks}
            key={index}
            filter={filter}
            onChange={(item) => handlers.setItem(index, item)}
            onDelete={() => handlers.remove(index)}
          />
        ))}
      </Group>
      <Group>
        {filters.length > 1 ? (
          <Chip
            variant="light"
            checked={true}
            onChange={(value) =>
              onQuantifierChange(quantifier === "or" ? "and" : "or")
            }
            icon={
              quantifier === "or" ? (
                <IconLetterE
                  style={{
                    transform: "rotate(180deg)",
                    width: rem(16),
                  }}
                />
              ) : (
                <IconLetterA
                  style={{
                    transform: "rotate(180deg)",
                    width: rem(16),
                  }}
                />
              )
            }
          >
            {quantifier === "and" ? "Kaikki" : "Joku"}
          </Chip>
        ) : (
          <></>
        )}
      </Group>
    </Group>
  ) : (
    <></>
  );
}
