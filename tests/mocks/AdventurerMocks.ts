import { Adventurer } from "../../src/objects/Adventurer";
import { MovementEnum, OrientationEnum } from "../../src/objects/Enums";

export const adventurerMock = () =>
  new Adventurer("Mock", 1, 1, OrientationEnum.EAST, [
    MovementEnum.FORWARD,
    MovementEnum.TURN_LEFT,
  ]);

export const adventurerMock2 = () =>
  new Adventurer("Mock2", 0, 1, OrientationEnum.NORTH, [
    MovementEnum.TURN_RIGHT,
    MovementEnum.FORWARD,
    MovementEnum.TURN_LEFT,
  ]);

export const invalidAdventurerMock = () =>
  new Adventurer("Mock", 1, 1, OrientationEnum.EAST, [
    MovementEnum.FORWARD,
    "M" as MovementEnum,
    MovementEnum.TURN_LEFT,
  ]);
