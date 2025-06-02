import { Group, Menu, MultiSelect, Text } from "@mantine/core";
import { Status, statuses } from "../../types/Status";
import { StatusFilter } from "./Filter";
import classes from "../../styles/FieldFilterInput.module.css";
import { ExtendedTask } from "../../types/Task";
import { IconArrowBigRightLinesFilled, IconTags } from "@tabler/icons-react";

interface StatusPickerMenuProps<D> {
  collection: D[];
  field: keyof D;
  onChange: (value: Status[]) => void;
}

export function StatusPickerMenu<D>({
  collection,
  field,
  onChange,
}: StatusPickerMenuProps<D>) {
  return (
    <>
      {statuses.map((value) => (
        <Menu.Item
          onClick={() => onChange([value.status])}
          key={value.number}
          leftSection={<value.iconElement stroke={1.5} size={18} />}
        >
          {value.label}
        </Menu.Item>
      ))}
    </>
  );
}

interface StatusFieldNameProps {
  field: Extract<keyof ExtendedTask, string> | string;
}

function StatusFieldName({ field }: StatusFieldNameProps) {
  const [Icon, text] =
    field === "status" ? [IconArrowBigRightLinesFilled, "Status"] : [null, ""];
  return (
    <Group className={`${classes.left}`} gap="xs">
      {Icon ? <Icon stroke={1.5} size={18} /> : null}
      <Text fz="small">{text}</Text>
    </Group>
  );
}

interface StatusValueProps<D> {
  //   collection: D[];
  //   field: keyof D;
  values: Status[];
  onChange: (values: Status[]) => void;
}

function StatusValue<D>({ values, onChange }: StatusValueProps<D>) {
  return (
    <MultiSelect
      value={values}
      variant="unstyled"
      classNames={{ input: `${classes.hover} ${classes.mid}` }}
      size="xs"
      data={statuses.map((item) => ({
        value: item.status,
        label: item.label,
      }))}
      onChange={(values) => onChange(values as Status[])}
      searchable
      comboboxProps={{ width: 120 }}
    />
  );
}

interface StatusFieldInputProps<D> {
  collection: D[];
  filter: StatusFilter<D>;
  onChange: (f: StatusFilter<D>) => void;
}

export function StatusFieldInput<D>({
  collection,
  filter,
  onChange,
}: StatusFieldInputProps<D>) {
  return (
    <>
      <StatusFieldName field={filter.field} />
      <StatusValue
        values={filter.value}
        onChange={(values) => onChange({ ...filter, value: values })}
      />
    </>
  );
}
