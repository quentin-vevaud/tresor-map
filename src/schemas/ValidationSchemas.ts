import { Type } from "@sinclair/typebox";
import { MovementEnum, OrientationEnum } from "../objects/Enums";

export const adventurerSchema = Type.Object({
  name: Type.String(),
  xIndex: Type.Number(),
  yIndex: Type.Number(),
  orientation: Type.Enum(OrientationEnum),
  reversedMovements: Type.Array(Type.Enum(MovementEnum)),
});

export const mountainSchema = Type.Object({
  xIndex: Type.Number(),
  yIndex: Type.Number(),
});

export const treasureSchema = Type.Object({
  xIndex: Type.Number(),
  yIndex: Type.Number(),
  amount: Type.Number(),
});

export const treasureMapEntrySchema = Type.Array(Type.Number());
