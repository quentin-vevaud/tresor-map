import { EntityLabelEnum, MovementEnum, OrientationEnum } from "./Enums";
import { MapEntity } from "./MapEntity";

export class Adventurer extends MapEntity {
  private reversedMovements: MovementEnum[];
  private readonly ORDERED_ORIENTATIONS = Object.values(OrientationEnum);
  private collectedTreasures = 0;

  constructor(
    private readonly name: string,
    row: number,
    column: number,
    private orientation: OrientationEnum,
    movements: MovementEnum[],
  ) {
    super(EntityLabelEnum.ADVENTURER, row, column);
    this.reversedMovements = movements.reverse();
  }

  turnLeft(): void {
    const indexOfOrientation = this.ORDERED_ORIENTATIONS.indexOf(
      this.orientation,
    );

    const previousOrientation =
      this.ORDERED_ORIENTATIONS[indexOfOrientation - 1] ||
      this.ORDERED_ORIENTATIONS[this.ORDERED_ORIENTATIONS.length - 1];

    this.orientation = previousOrientation;
  }

  turnRight(): void {
    const indexOfOrientation = this.ORDERED_ORIENTATIONS.indexOf(
      this.orientation,
    );

    const nextOrientation =
      this.ORDERED_ORIENTATIONS[indexOfOrientation + 1] ||
      this.ORDERED_ORIENTATIONS[0];

    this.orientation = nextOrientation;
  }

  getOrientation(): OrientationEnum {
    return this.orientation;
  }

  act(): MovementEnum | undefined {
    return this.reversedMovements.pop();
  }

  setPosition(row: number, column: number): void {
    this.row = row;
    this.column = column;
  }

  collectTreasure(): void {
    this.collectedTreasures++;
  }

  getCollectedTreasures(): number {
    return this.collectedTreasures;
  }

  toString(): string {
    return `${this.label}(${this.name})`;
  }

  toParsedResult(): string[] {
    return [this.name]
      .concat(super.toParsedResult())
      .concat([this.orientation, this.collectedTreasures.toString()]);
  }
}
