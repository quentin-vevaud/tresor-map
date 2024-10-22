import { describe, test, vi } from "vitest";
import { FileHandler } from "../../src/handlers/FileHandler";
import { GameHandler } from "../../src/handlers/GameHandler";
import { ParsedSimulationToGameInitialisationMapper } from "../../src/handlers/ParsedSimulationToTreasureMapMapper";
import { SimulationHandler } from "../../src/handlers/SimulationHandler";
import {
  parsedResultMock,
  parsedSimulationMock,
} from "../mocks/ParsedSimulationMocks";

describe("SimulationHandler", async () => {
  test("SimulationHandler should work as expected", async () => {
    vi.spyOn(
      FileHandler.prototype,
      "getParsedSimulationDefinition",
    ).mockReturnValue(parsedSimulationMock);

    vi.spyOn(
      ParsedSimulationToGameInitialisationMapper.prototype,
      "mapParsedSimulationToGameDefinition",
    ).mockReturnValue({
      treasureMap: [],
      adventurers: [],
    });

    vi.spyOn(GameHandler.prototype, "play").mockReturnValue({
      treasureMap: [],
      adventurers: [],
    });

    vi.spyOn(
      ParsedSimulationToGameInitialisationMapper.prototype,
      "mapGameDefinitionToParsedResult",
    ).mockReturnValue(parsedResultMock);

    vi.spyOn(FileHandler.prototype, "writeResultFile").mockReturnValue();

    new SimulationHandler()["handleSimulation"]();
  });
});
