import { Group, Menu, MultiSelect, Text, UnstyledButton } from "@mantine/core";
import { ArrayFilter } from "./Filter";
import { IconTags } from "@tabler/icons-react";
import { ExtendedTask } from "../../types/Task";
import classes from "../../styles/FieldFilterInput.module.css";

interface ArrayPickerMenuProps<D> {
  collection: D[];
  field: keyof D;
  onChange: (value: string[]) => void;
}

export function ArrayPickerMenu<D>({
  collection,
  field,
  onChange,
}: ArrayPickerMenuProps<D>) {
  const array_values = collection.map((item) => item[field]);
  const unique_values = Array.from(new Set(array_values.flat()));

  return (
    <>
      {unique_values.map((value) => (
        <Menu.Item onClick={() => onChange([value as string])}>
          {value as string}
        </Menu.Item>
      ))}
    </>
  );
}

interface ArrayValueProps<D> {
  collection: D[];
  field: keyof D;
  values: string[];
  onChange: (values: string[]) => void;
}

export function ArrayValue<D>({
  values,
  field,
  collection,
  onChange,
}: ArrayValueProps<D>) {
  const array_values = collection.map((item) => item[field]);
  const unique_values = Array.from(new Set(array_values.flat()));

  return (
    <MultiSelect
      value={values}
      variant="unstyled"
      classNames={{ input: `${classes.hover} ${classes.mid}` }}
      size="xs"
      data={unique_values.map((item) => ({
        value: item as string,
        label: (item as string).toUpperCase().slice(0, 3),
      }))}
      onChange={(values) => onChange(values)}
      searchable
      comboboxProps={{ width: 200 }}
    />
  );
}

interface ArrayFieldNameProps {
  field: Extract<keyof ExtendedTask, string> | string;
}

function ArrayFieldName({ field }: ArrayFieldNameProps) {
  const [Icon, text] = field === "teams" ? [IconTags, "Tiimi"] : [null, ""];

  return (
    <Group className={`${classes.left}`} gap="xs">
      {Icon ? <Icon stroke={1.5} size={18} /> : null}
      <Text fz="small">{text}</Text>
    </Group>
  );
}

interface ArrayFieldInputProps<D> {
  collection: D[];
  filter: ArrayFilter<D>;
  onChange: (f: ArrayFilter<D>) => void;
}

export function ArrayFieldInput<D>({
  collection,
  filter,
  onChange,
}: ArrayFieldInputProps<D>) {
  return (
    <>
      <ArrayFieldName field={filter.field} />
      <ArrayValue
        collection={collection}
        field={filter.field as keyof D}
        values={filter.value}
        onChange={(values) => onChange({ ...filter, value: values })}
      />
    </>
  );
}
