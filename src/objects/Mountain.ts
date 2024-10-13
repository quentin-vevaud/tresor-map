import { Box } from "./Box";
import { ObjectLabelEnum } from "./Enums";

export class Mountain extends Box {
  constructor(xAxis: number, yAxis: number) {
    super(ObjectLabelEnum.MOUNTAIN, xAxis, yAxis);
  }
}
