import { Adventurer } from "./Adventurer";
import { EntityLabelEnum } from "./Enums";
import { MapEntity } from "./MapEntity";

export abstract class Box extends MapEntity {
  protected adventurer: Adventurer | undefined;

  protected constructor(
    protected readonly label: EntityLabelEnum,
    row: number,
    column: number,
  ) {
    super(label, row, column);
  }

  isOccupied(): boolean {
    return !!this.adventurer;
  }

  getAdventurer(): Adventurer | undefined {
    return this.adventurer;
  }

  setAdventurer(adventurer: Adventurer | undefined): void {
    this.adventurer = adventurer;
  }

  toString(): string {
    return this.adventurer?.toString() || this.label;
  }
}
