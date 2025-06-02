import {
  ActionIcon,
  Button,
  Combobox,
  Menu,
  UnstyledButton,
  useCombobox,
} from "@mantine/core";
import {
  IconArrowBigRightLinesFilled,
  IconCalendarPlus,
  IconCalendarRepeat,
  IconFilterPlus,
  IconTags,
} from "@tabler/icons-react";
import { FieldFilter, Filter } from "./Filter";
import { UseListStateHandlers } from "@mantine/hooks";
import { ExtendedTask } from "../../types/Task";
import { DatePickerMenu, DateValue } from "./DateFieldInput";
import { DateTime } from "ts-luxon";
import { DateInput, DatePicker } from "@mantine/dates";
import { ArrayPickerMenu } from "./ArrayFieldInput";
import { StatusPickerMenu } from "./StatusFieldInput";

interface AddNewFilterProps {
  //   onChange: () => void;
  tasks: ExtendedTask[];
  handlers: UseListStateHandlers<Filter<ExtendedTask>>;
}

export function AddNewFilter({ tasks, handlers }: AddNewFilterProps) {
  return (
    <Menu withinPortal={false} closeOnItemClick={false} shadow="lg">
      <Menu.Target>
        <ActionIcon
          variant="transparent"
          //   onClick={() => combobox.toggleDropdown()}
        >
          <IconFilterPlus stroke={1.5} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Aikajana</Menu.Label>
        <Menu.Item leftSection={<IconCalendarPlus size={20} />}>
          <Menu
            position="left-start"
            offset={55}
            withinPortal={false}
            closeOnItemClick={false}
          >
            <Menu.Target>
              <UnstyledButton>Ehdotettu</UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <DatePickerMenu
                onChange={(value) =>
                  handlers.append({
                    type: "field",
                    field: "created",
                    field_type: "datetime",
                    op: "after",
                    value: value,
                  })
                }
              />
            </Menu.Dropdown>
          </Menu>
        </Menu.Item>
        <Menu.Item leftSection={<IconCalendarRepeat size={20} />}>
          <Menu
            position="left-start"
            offset={55}
            withinPortal={false}
            closeOnItemClick={false}
          >
            <Menu.Target>
              <UnstyledButton>Muokattu</UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <DatePickerMenu
                onChange={(value) =>
                  handlers.append({
                    type: "field",
                    field: "modified",
                    field_type: "datetime",
                    op: "after",
                    value: value,
                  })
                }
              />
            </Menu.Dropdown>
          </Menu>
        </Menu.Item>
        <Menu.Label>Muut tiedot</Menu.Label>
        <Menu.Item leftSection={<IconTags size={20} />}>
          <Menu
            position="left-start"
            offset={55}
            withinPortal={false}
            closeOnItemClick={false}
          >
            <Menu.Target>
              <UnstyledButton>Tiimi</UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <ArrayPickerMenu
                collection={tasks}
                field="teams"
                onChange={(value) =>
                  handlers.append({
                    type: "field",
                    field: "teams",
                    field_type: "array",
                    op: "all",
                    value: value,
                  })
                }
              />
            </Menu.Dropdown>
          </Menu>
        </Menu.Item>
        <Menu.Item leftSection={<IconArrowBigRightLinesFilled size={20} />}>
          <Menu
            position="left-start"
            offset={55}
            withinPortal={false}
            closeOnItemClick={false}
          >
            <Menu.Target>
              <UnstyledButton>Status</UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <StatusPickerMenu
                collection={tasks}
                field="status"
                onChange={(value) =>
                  handlers.append({
                    type: "field",
                    field: "status",
                    field_type: "status",
                    op: "all",
                    value: value,
                  })
                }
              />
            </Menu.Dropdown>
          </Menu>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
