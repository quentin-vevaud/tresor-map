import { ObjectLabelEnum } from "./Enums";

export abstract class Box {
  protected constructor(
    protected readonly label: ObjectLabelEnum,
    protected xIndex: number,
    protected yIndex: number,
  ) {}

  abstract isOccupied(): boolean;

  getXIndex(): number {
    return this.xIndex;
  }

  getYIndex(): number {
    return this.yIndex;
  }

  getLabel(): ObjectLabelEnum {
    return this.label;
  }
}
