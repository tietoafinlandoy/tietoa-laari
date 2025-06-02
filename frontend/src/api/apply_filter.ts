import { DateTime } from "ts-luxon";
import { FieldFilter, Filter } from "../components/Filtering/Filter";
import { ExtendedTask } from "../types/Task";

function is_key<D>(
  field: FieldFilter<D>["field"]
): field is Extract<keyof D, string> {
  return !field.includes(".");
}

function apply_filter_to_single_value<T>(filter: Filter<T>, value: T): boolean {
  // console.log("filter", filter);
  // console.log("value", value);
  if (filter.type === "and") {
    return filter.operands.every((op) =>
      apply_filter_to_single_value(op, value)
    );
  } else if (filter.type === "or") {
    return filter.operands.some((op) =>
      apply_filter_to_single_value(op, value)
    );
  } else if (filter.type === "field") {
    if (is_key(filter.field)) {
      if (filter.op === "is") return value[filter.field] === filter.value;
      else if (filter.op === "contains") {
        const field_as_str = value[filter.field];
        if (typeof field_as_str === "string")
          return field_as_str.includes(filter.value);
      } else if (filter.op === "before") {
        return value[filter.field] < filter.value;
      } else if (filter.op === "after") {
        return value[filter.field] > filter.value;
      } else if (filter.op === "at") {
        const date = value[filter.field];
        if (DateTime.isDateTime(date) && DateTime.isDateTime(filter.value))
          return date.toISODate() === filter.value.toISODate();
        else {
          console.log("error:", date, filter.value);
          return false;
        }
      } else if (filter.op === "all") {
        if (filter.field_type === "status") {
          // dirty :/
          const task = value as ExtendedTask;
          return (
            !filter.value.length || filter.value.includes(task.status.status)
          );
        } else {
          const field_value = value[filter.field];
          const arr = Array.isArray(field_value) ? field_value : [field_value];

          return (
            !filter.value.length ||
            arr.every((item) => filter.value.includes(item))
          );
        }
      } else if (filter.op === "some") {
        const field_value = value[filter.field];
        const arr = Array.isArray(field_value) ? field_value : [field_value];

        return (
          !filter.value.length ||
          arr.some((item) => filter.value.includes(item))
        );
      }
    } else {
      const dot = filter.field.indexOf(".");
      // console.log("dot", dot);
      const first_key: keyof T = filter.field.slice(0, dot) as keyof T;
      // console.log("first_key", first_key);

      // It's a little bit fishy recursion here, but kinda works
      return apply_filter_to_single_value(
        { ...filter, field: filter.field.slice(dot + 1) },
        value[first_key]
      );
    }
  }

  throw new Error(`incorrect filter: ${JSON.stringify(filter)}`);
}

export function apply_filter<T>(filter: Filter<T>, data: T[]) {
  return data.filter((element) =>
    apply_filter_to_single_value(filter, element)
  );
}
