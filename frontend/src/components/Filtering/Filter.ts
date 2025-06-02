import { DateTime } from "ts-luxon";
import { Status } from "../../types/Status";

// Logic filters

export interface AndFilter<D> {
  type: "and";
  operands: Filter<D>[];
}

export interface OrFilter<D> {
  type: "or";
  operands: Filter<D>[];
}

export interface NotFilter<D> {
  type: "not";
  operand: Filter<D>[];
}

// Field filters

interface _FieldFilterCommon<D> {
  type: "field";
  field: Extract<keyof D, string> | string;
}

export interface StringFilter<D> extends _FieldFilterCommon<D> {
  field_type: "string";
  op: "is" | "contains";
  value: string;
}

export interface DateFilter<D> extends _FieldFilterCommon<D> {
  field_type: "datetime";
  op: "at" | "after" | "before";
  value: DateTime;
}

export interface ArrayFilter<D> extends _FieldFilterCommon<D> {
  field_type: "array";
  op: "all" | "some";
  value: string[];
}

export interface StatusFilter<D> extends _FieldFilterCommon<D> {
  field_type: "status";
  op: "all";
  value: Status[];
}

export type FieldFilter<D> =
  | StringFilter<D>
  | DateFilter<D>
  | ArrayFilter<D>
  | StatusFilter<D>;

export type Filter<D> =
  | AndFilter<D>
  | OrFilter<D>
  | NotFilter<D>
  | FieldFilter<D>;
