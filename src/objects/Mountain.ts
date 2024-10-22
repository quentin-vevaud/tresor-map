import { Adventurer } from "./Adventurer";
import { Box } from "./Box";
import { EntityLabelEnum } from "./Enums";

export class Mountain extends Box {
  constructor(row: number, column: number) {
    super(EntityLabelEnum.MOUNTAIN, row, column);
  }

  isOccupied(): boolean {
    return true;
  }

  setAdventurer(_adventurer: Adventurer | undefined) {
    return;
  }

  toString(): EntityLabelEnum {
    return this.label;
  }
}
