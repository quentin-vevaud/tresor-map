import { ObjectLabelEnum } from "./Enums";

export class Box {
  protected constructor(
    protected readonly label: ObjectLabelEnum,
    protected readonly xAxis: number,
    protected readonly yAxis: number,
  ) {}
}
