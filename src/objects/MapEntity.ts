import { EntityLabelEnum } from "./Enums";

export abstract class MapEntity {
  protected constructor(
    protected readonly label: EntityLabelEnum,
    protected row: number,
    protected column: number,
  ) {}

  getRow(): number {
    return this.row;
  }

  getColumn(): number {
    return this.column;
  }

  toString(): string {
    return this.label;
  }

  toParsedResult(): string[] {
    return [this.label, this.column.toString(), this.row.toString()];
  }
}
