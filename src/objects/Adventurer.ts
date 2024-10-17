import { Box } from "./Box";
import { MovementEnum, ObjectLabelEnum, OrientationEnum } from "./Enums";

export class Adventurer extends Box {
  private reversedMovements: MovementEnum[];

  constructor(
    xIndex: number,
    yIndex: number,
    private orientation: OrientationEnum,
    movements: MovementEnum[],
    private readonly name: string,
  ) {
    super(ObjectLabelEnum.ADVENTURER, xIndex, yIndex);

    this.reversedMovements = movements.reverse();
  }

  isOccupied(): boolean {
    return true;
  }

  getOrientation(): OrientationEnum {
    return this.orientation;
  }

  setOrientation(orientation: OrientationEnum): void {
    this.orientation = orientation;
  }

  act(): MovementEnum | undefined {
    return this.reversedMovements.pop();
  }

  getName(): string {
    return this.name;
  }

  setPosition(xIndex: number, yIndex: number): void {
    this.xIndex = xIndex;
    this.yIndex = yIndex;
  }
}
