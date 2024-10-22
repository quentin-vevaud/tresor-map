import { Ajv } from "ajv";
import { Adventurer } from "../objects/Adventurer";
import { Box } from "../objects/Box";
import { Mountain } from "../objects/Mountain";
import {
  adventurerSchema,
  mountainSchema,
  treasureMapEntrySchema,
  treasureSchema,
} from "../schemas/ValidationSchemas";

export class ValidationHandler {
  private readonly ajv = new Ajv({
    allErrors: true,
    coerceTypes: true,
    strictTypes: true,
  });

  constructor() {}

  public validateMountain(
    mountain: Mountain,
    rowSize: number,
    columnSize: number,
  ): void {
    if (!this.ajv.validate(mountainSchema(rowSize, columnSize), mountain)) {
      throw this.getValidationException();
    }
  }

  public validateAdventurer(
    adventurer: Adventurer,
    rowSize: number,
    columnSize: number,
  ): void {
    if (!this.ajv.validate(adventurerSchema(rowSize, columnSize), adventurer)) {
      throw this.getValidationException();
    }
  }

  public validateTreasure(box: Box, rowSize: number, columnSize: number): void {
    if (!this.ajv.validate(treasureSchema(rowSize, columnSize), box)) {
      throw this.getValidationException();
    }
  }

  public validateTreasureMapLine(entry: string[]): void {
    if (entry[0] !== "C") {
      throw new Error("You must define the map in the first row of the file");
    }
    if (!this.ajv.validate(treasureMapEntrySchema, entry.slice(1))) {
      throw this.getValidationException();
    }
  }

  private getValidationException(): Error {
    return new Error(JSON.stringify(this.ajv.errors));
  }
}
