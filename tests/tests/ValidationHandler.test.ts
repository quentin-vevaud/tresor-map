import { describe, test } from "vitest";
import { ValidationHandler } from "../../src/handlers/ValidationHandler";
import { invalidAdventurerMock } from "../mocks/AdventurerMocks";
import { invalidMountainMock } from "../mocks/MountainMocks";
import { invalidTreasureMock } from "../mocks/TreasureMocks";

describe("ValidationHandler", async () => {
  describe("validateMountain", async () => {
    test("validate should throw error if mountain definition not right", async ({
      expect,
    }) => {
      try {
        new ValidationHandler().validateMountain(invalidMountainMock(), 2, 2);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });

    test("validate should throw error if adventurer definition not right", async ({
      expect,
    }) => {
      try {
        new ValidationHandler().validateAdventurer(
          invalidAdventurerMock(),
          2,
          2,
        );
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });

    test("validate should throw error if treasure definition not right", async ({
      expect,
    }) => {
      try {
        new ValidationHandler().validateTreasure(invalidTreasureMock(), 3, 4);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });

    test("validate should throw error if treasure map label definition not right", async ({
      expect,
    }) => {
      try {
        new ValidationHandler().validateTreasureMapLine(["F", "3", "4"]);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });

    test("validate should throw error if treasure map definition not right", async ({
      expect,
    }) => {
      try {
        new ValidationHandler().validateTreasureMapLine(["C", "A", "4"]);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  });
});
