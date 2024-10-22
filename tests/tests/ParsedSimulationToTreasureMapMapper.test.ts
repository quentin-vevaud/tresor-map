import { describe, test } from "vitest";
import { ParsedSimulationToGameInitialisationMapper } from "../../src/handlers/ParsedSimulationToTreasureMapMapper";
import { gameDefinitionMock } from "../mocks/GameDefinitionMocks";
import {
  parsedResultMock,
  parsedSimulationMock,
} from "../mocks/ParsedSimulationMocks";

describe("ParsedSimulationToTreasureMapMapper", async () => {
  describe("mapParsedSimulationToGameDefinition", async () => {
    test("mapParsedSimulationToGameDefinition should work as expected", async ({
      expect,
    }) => {
      const gameDefinition =
        new ParsedSimulationToGameInitialisationMapper().mapParsedSimulationToGameDefinition(
          parsedSimulationMock,
        );

      expect(gameDefinition).toEqual(gameDefinitionMock);
    });
  });
  describe("mapParsedSimulationToGameDefinition", async () => {
    test("mapParsedSimulationToGameDefinition should work as expected", async ({
      expect,
    }) => {
      const parsedResult =
        new ParsedSimulationToGameInitialisationMapper().mapGameDefinitionToParsedResult(
          gameDefinitionMock,
        );

      expect(parsedResult).toEqual(parsedResultMock);
    });
  });
});
