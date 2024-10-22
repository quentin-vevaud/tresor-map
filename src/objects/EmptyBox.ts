import { Box } from "./Box";
import { EntityLabelEnum } from "./Enums";

export class EmptyBox extends Box {
  constructor(row: number, column: number) {
    super(EntityLabelEnum.EMPTY, row, column);
  }
}
