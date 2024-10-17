import { Box } from "./Box";
import { ObjectLabelEnum } from "./Enums";

export class EmptyBox extends Box {
  constructor(xAxis: number, yAxis: number) {
    super(ObjectLabelEnum.EMPTY, xAxis, yAxis);
  }

  isOccupied(): boolean {
    return false;
  }
}
