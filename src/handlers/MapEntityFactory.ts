import { Adventurer } from "../objects/Adventurer";
import {
  EntityLabelEnum,
  MovementEnum,
  OrientationEnum,
} from "../objects/Enums";
import { MapEntity } from "../objects/MapEntity";
import { Mountain } from "../objects/Mountain";
import { Treasure } from "../objects/Treasure";
import { ValidationHandler } from "./ValidationHandler";

export class MapEntityFactory {
  private readonly validationHandler = new ValidationHandler();

  constructor(
    private readonly objectData: string[],
    private readonly rowSize: number,
    private readonly columnSize: number,
  ) {}

  createMapEntity(): MapEntity {
    switch (this.objectData[0] as EntityLabelEnum) {
      case EntityLabelEnum.MOUNTAIN:
        return this.createMountain();
      case EntityLabelEnum.TREASURE:
        return this.createTreasure();
      case EntityLabelEnum.ADVENTURER:
        return this.createAdventurer();
      default:
        throw new Error("Invalid box label");
    }
  }

  private createMountain(): Mountain {
    const mountain = new Mountain(+this.objectData[2], +this.objectData[1]);

    this.validationHandler.validateMountain(
      mountain,
      this.rowSize,
      this.columnSize,
    );

    return mountain;
  }

  private createTreasure(): Treasure {
    const treasure = new Treasure(
      +this.objectData[2],
      +this.objectData[1],
      +this.objectData[3],
    );

    this.validationHandler.validateTreasure(
      treasure,
      this.rowSize,
      this.columnSize,
    );

    return treasure;
  }

  private createAdventurer(): Adventurer {
    const movementList = this.objectData[5].split("") as MovementEnum[];

    const adventurer = new Adventurer(
      this.objectData[1],
      +this.objectData[3],
      +this.objectData[2],
      this.objectData[4] as OrientationEnum,
      movementList,
    );

    this.validationHandler.validateAdventurer(
      adventurer,
      this.rowSize,
      this.columnSize,
    );

    return adventurer;
  }
}
