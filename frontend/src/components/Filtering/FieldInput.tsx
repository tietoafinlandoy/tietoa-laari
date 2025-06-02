import {
  ActionIcon,
  Button,
  Group,
  rem,
  UnstyledButton,
  Text,
  Center,
} from "@mantine/core";
import { DateFieldInput } from "./DateFieldInput";
import { Filter } from "./Filter";
import classes from "../../styles/FieldFilterInput.module.css";
import { IconX } from "@tabler/icons-react";
import { ArrayFieldInput } from "./ArrayFieldInput";
import { StatusFieldInput } from "./StatusFieldInput";
import { apply_filter } from "../../api/apply_filter";

interface FieldInputProps<D> {
  collection: D[];
  filter: Filter<D>;
  onChange: (f: Filter<D>) => void;
  onDelete: () => void;
}

function Close<D>({ onDelete }: { onDelete: FieldInputProps<D>["onDelete"] }) {
  return (
    <UnstyledButton
      pt={rem(7)}
      onClick={() => onDelete()}
      className={`${classes.right} ${classes.hover}`}
    >
      <IconX stroke={1.5} size={17} />
    </UnstyledButton>
  );
}

function NumberOfFilteredItems<D>({
  collection,
  filter,
}: Pick<FieldInputProps<D>, "collection" | "filter">) {
  const x = apply_filter(filter, collection);
  return (
    <Center pt={rem(7)} className={`${classes.mid}`}>
      {x.length} / {collection.length}
    </Center>
  );
}

export function FieldInput<D>({
  collection,
  filter,
  onChange,
  onDelete,
}: FieldInputProps<D>) {
  if (filter.type === "field")
    if (filter.field_type === "datetime")
      return (
        <Group gap="xs" className={classes.field}>
          <DateFieldInput filter={filter} onChange={(f) => onChange(f)} />
          <NumberOfFilteredItems collection={collection} filter={filter} />
          <Close onDelete={onDelete} />
        </Group>
      );
    else if (filter.field_type === "array")
      return (
        <Group gap="xs" className={classes.field}>
          <ArrayFieldInput
            collection={collection}
            filter={filter}
            onChange={(f) => onChange(f)}
          />
          <NumberOfFilteredItems collection={collection} filter={filter} />
          <Close onDelete={onDelete} />
        </Group>
      );
    else if (filter.field_type === "status")
      return (
        <Group gap="xs" className={classes.field}>
          <StatusFieldInput
            collection={collection}
            filter={filter}
            onChange={(f) => onChange(f)}
          />
          <NumberOfFilteredItems collection={collection} filter={filter} />
          <Close onDelete={onDelete} />
        </Group>
      );

  return <></>;
}
