import { Adventurer } from "../objects/Adventurer";
import {
  MovementEnum,
  ObjectLabelEnum,
  OrientationEnum,
} from "../objects/Enums";
import { Mountain } from "../objects/Mountain";
import { Treasure } from "../objects/Treasure";

export class BoxFactory {
  static createBox(objectData: string[]) {
    switch (objectData[0] as ObjectLabelEnum) {
      case ObjectLabelEnum.MOUNTAIN:
        return this.createMountain(objectData);
      case ObjectLabelEnum.TREASURE:
        return this.createTreasure(objectData);
      case ObjectLabelEnum.ADVENTURER:
        return this.createAdventurer(objectData);
      default:
        throw new Error("Invalid box label");
    }
  }

  private static createMountain(objectData: string[]): Mountain {
    return new Mountain(+objectData[1], +objectData[2]);
  }

  private static createTreasure(objectData: string[]): Treasure {
    return new Treasure(+objectData[1], +objectData[2], +objectData[3]);
  }

  private static createAdventurer(objectData: string[]): Adventurer {
    const movementList = objectData[5].split("") as MovementEnum[];
    return new Adventurer(
      +objectData[2],
      +objectData[3],
      objectData[4] as OrientationEnum,
      movementList,
      objectData[2],
    );
  }
}
