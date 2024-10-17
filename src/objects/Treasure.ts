import { Box } from "./Box";
import { ObjectLabelEnum } from "./Enums";

export class Treasure extends Box {
  constructor(
    xAxis: number,
    yAxis: number,
    private amount: number,
  ) {
    super(ObjectLabelEnum.TREASURE, xAxis, yAxis);
  }

  isOccupied(): boolean {
    return false;
  }

  getAmount(): number {
    return this.amount;
  }

  setAmount(amount: number): void {
    this.amount = amount;
  }
}
