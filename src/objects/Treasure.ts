import { Box } from "./Box";
import { EntityLabelEnum } from "./Enums";

export class Treasure extends Box {
  constructor(
    row: number,
    column: number,
    private amount: number,
  ) {
    super(EntityLabelEnum.TREASURE, row, column);
  }

  getAmount(): number {
    return this.amount;
  }

  collect(): number {
    if (this.amount === 0) return 0;
    this.amount--;
    return 1;
  }

  toString(): string {
    return `${this.label}(${this.amount})`;
  }

  toParsedResult(): string[] {
    return super.toParsedResult().concat(this.amount.toString());
  }
}
