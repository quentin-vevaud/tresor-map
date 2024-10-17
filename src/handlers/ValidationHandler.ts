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

  public validateMountain(mountain: Mountain): void {
    if (!this.ajv.validate(mountainSchema, mountain)) {
      throw this.getValidationException();
    }
  }

  public validateAdventurer(adventurer: Adventurer): void {
    if (!this.ajv.validate(adventurerSchema, adventurer)) {
      throw this.getValidationException();
    }
  }

  public validateTreasure(box: Box): void {
    if (!this.ajv.validate(treasureSchema, box)) {
      throw this.getValidationException();
    }
  }

  public validateTreasureMapLine(entry: string[]): void {
    if (entry[0] !== "C") {
      throw new Error("You must define the map in the first line of the file");
    }
    if (!this.ajv.validate(treasureMapEntrySchema, entry.slice(1))) {
      throw this.getValidationException();
    }
  }

  private getValidationException(): Error {
    return new Error(JSON.stringify(this.ajv.errors));
  }
}
