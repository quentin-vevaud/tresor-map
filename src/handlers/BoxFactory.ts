import { Adventurer } from "../objects/Adventurer";
import { Box } from "../objects/Box";
import {
  MovementEnum,
  ObjectLabelEnum,
  OrientationEnum,
} from "../objects/Enums";
import { Mountain } from "../objects/Mountain";
import { Treasure } from "../objects/Treasure";
import { ValidationHandler } from "./ValidationHandler";

export class BoxFactory {
  private readonly validationHandler = new ValidationHandler();

  constructor(private readonly objectData: string[]) {}

  createBox(): Box {
    switch (this.objectData[0] as ObjectLabelEnum) {
      case ObjectLabelEnum.MOUNTAIN:
        return this.createMountain();
      case ObjectLabelEnum.TREASURE:
        return this.createTreasure();
      case ObjectLabelEnum.ADVENTURER:
        return this.createAdventurer();
      default:
        throw new Error("Invalid box label");
    }
  }

  private createMountain(): Mountain {
    const mountain = new Mountain(+this.objectData[1], +this.objectData[2]);

    this.validationHandler.validateMountain(mountain);

    return mountain;
  }

  private createTreasure(): Treasure {
    const treasure = new Treasure(
      +this.objectData[1],
      +this.objectData[2],
      +this.objectData[3],
    );

    this.validationHandler.validateTreasure(treasure);

    return treasure;
  }

  private createAdventurer(): Adventurer {
    const movementList = this.objectData[5].split("") as MovementEnum[];

    const adventurer = new Adventurer(
      +this.objectData[2],
      +this.objectData[3],
      this.objectData[4] as OrientationEnum,
      movementList,
      this.objectData[1],
    );

    this.validationHandler.validateAdventurer(adventurer);

    return adventurer;
  }
}
