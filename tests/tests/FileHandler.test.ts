import fs from "fs";
import { describe, test, vi } from "vitest";
import { FileHandler } from "../../src/handlers/FileHandler";
import { readFileMock, writeFileMock } from "../mocks/FileMocks";
import {
  parsedResultMock,
  parsedSimulationMock,
} from "../mocks/ParsedSimulationMocks";

describe("FileHandler", async () => {
  describe("getParsedSimulationDefinition", async () => {
    test("getParsedSimulationDefinition should work as expected", async ({
      expect,
    }) => {
      vi.spyOn(fs, "readFileSync").mockReturnValue(readFileMock);
      const parsedSimulationDefinition =
        new FileHandler().getParsedSimulationDefinition();

      expect(parsedSimulationDefinition).toStrictEqual(parsedSimulationMock);
    });
  });

  describe("writeSimulationResult", async () => {
    test("writeSimulationResult should work as expected", async ({
      expect,
    }) => {
      const writeMock = vi
        .spyOn(fs, "writeFileSync")
        .mockReturnValue(undefined);

      new FileHandler().writeResultFile(parsedResultMock);

      expect(writeMock).toBeCalledWith(
        "simulation/simulationResult.txt",
        writeFileMock,
        "utf8",
      );
    });
  });
});
