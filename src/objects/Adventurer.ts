import { Box } from "./Box";
import { MovementEnum, ObjectLabelEnum, OrientationEnum } from "./Enums";

export class Adventurer extends Box {
  constructor(
    xIndex: number,
    yIndex: number,
    private readonly orientation: OrientationEnum,
    private readonly movements: MovementEnum[],
    private readonly name: string,
  ) {
    super(ObjectLabelEnum.ADVENTURER, xIndex, yIndex);
  }
}
