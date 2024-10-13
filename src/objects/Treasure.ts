import { Box } from "./Box";
import { ObjectLabelEnum } from "./Enums";

export class Treasure extends Box {
  constructor(
    xAxis: number,
    yAxis: number,
    private readonly numberOfTreasures: number,
  ) {
    super(ObjectLabelEnum.TREASURE, xAxis, yAxis);
  }
}
