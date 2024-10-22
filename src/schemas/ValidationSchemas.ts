import { Type } from "@sinclair/typebox";
import { MovementEnum, OrientationEnum } from "../objects/Enums";

export const adventurerSchema = (rowSize: number, columnSize: number) =>
  Type.Object({
    name: Type.String(),
    row: Type.Number({ minimum: 0, maximum: rowSize - 1 }),
    column: Type.Number({ minimum: 0, maximum: columnSize - 1 }),
    orientation: Type.Enum(OrientationEnum),
    reversedMovements: Type.Array(Type.Enum(MovementEnum)),
  });

export const mountainSchema = (rowSize: number, columnSize: number) =>
  Type.Object({
    row: Type.Number({ minimum: 0, maximum: rowSize - 1 }),
    column: Type.Number({ minimum: 0, maximum: columnSize - 1 }),
  });

export const treasureSchema = (rowSize: number, columnSize: number) =>
  Type.Object({
    row: Type.Number({ minimum: 0, maximum: rowSize - 1 }),
    column: Type.Number({ minimum: 0, maximum: columnSize - 1 }),
    amount: Type.Number({ minimum: 0 }),
  });

export const treasureMapEntrySchema = Type.Array(Type.Number());
