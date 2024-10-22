import { describe, test, vi } from "vitest";
import { GameHandler } from "../../src/handlers/GameHandler";
import { Adventurer } from "../../src/objects/Adventurer";
import { Box } from "../../src/objects/Box";
import { MovementEnum, OrientationEnum } from "../../src/objects/Enums";
import { adventurerMock, adventurerMock2 } from "../mocks/AdventurerMocks";
import {
  emptyBoxMock,
  emptyBoxWithAdventurerMock,
} from "../mocks/EmptyBoxMocks";
import { getMountainMock } from "../mocks/MountainMocks";
import { treasureMock } from "../mocks/TreasureMocks";

describe("GameHandler", async () => {
  describe("play", async () => {
    test("play shoud be called as many times as adventurers biggest movement list", async ({
      expect,
    }): Promise<void> => {
      vi.spyOn(GameHandler.prototype, "move" as never).mockReturnValue(
        undefined,
      );
      const playSpy = vi.spyOn(GameHandler.prototype, "play");

      new GameHandler({
        treasureMap: [[]] as Box[][],
        adventurers: [adventurerMock(), adventurerMock2()],
      }).play();

      expect(playSpy).toBeCalledTimes(4);
    });
  });

  describe("move", async () => {
    test("move should work as expected if moveForward", async ({ expect }) => {
      const moveForwardSpy = vi
        .spyOn(GameHandler.prototype, "moveForward" as never)
        .mockReturnValue(undefined);

      new GameHandler({
        treasureMap: [[]] as Box[][],
        adventurers: [] as Adventurer[],
      })["move"](MovementEnum.FORWARD, Adventurer.prototype);

      expect(moveForwardSpy).toBeCalled();
    });

    test("move should work as expected if turnLeft", async ({ expect }) => {
      const adventurer = adventurerMock();
      new GameHandler({
        treasureMap: [[]] as Box[][],
        adventurers: [] as Adventurer[],
      })["move"](MovementEnum.TURN_LEFT, adventurer);

      expect(adventurer.getOrientation()).toBe(OrientationEnum.NORTH);
    });

    test("move should work as expected if turnRight", async ({ expect }) => {
      const adventurer = adventurerMock();

      new GameHandler({
        treasureMap: [[]] as Box[][],
        adventurers: [] as Adventurer[],
      })["move"](MovementEnum.TURN_RIGHT, adventurer);

      expect(adventurer.getOrientation()).toBe(OrientationEnum.SOUTH);
    });
  });

  describe("moveForward", async () => {
    test("moveForward should work as expected if destinationBox is free and contains treasure", async ({
      expect,
    }) => {
      const treasure = treasureMock();
      const adventurer = adventurerMock2();
      const emptyBoxWithAdventurer = emptyBoxWithAdventurerMock(adventurer);

      vi.spyOn(
        GameHandler.prototype,
        "getDestinationBox" as never,
      ).mockReturnValue(treasure);

      new GameHandler({
        treasureMap: [[treasure, emptyBoxWithAdventurer]] as Box[][],
        adventurers: [] as Adventurer[],
      })["moveForward"](adventurer);

      expect(treasure.getAdventurer()).toBe(adventurer);
      expect(emptyBoxWithAdventurer.getAdventurer()).toBe(undefined);
      expect(treasure.getAmount()).toBe(2);
      expect(treasure.getAdventurer()?.getCollectedTreasures()).toBe(1);
    });

    test("moveForward should work as expected if destinationBox is free and doesn't contain treasure", async ({
      expect,
    }) => {
      const emptyBox = emptyBoxMock();
      const adventurer = adventurerMock2();
      const emptyBoxWithAdventurer = emptyBoxWithAdventurerMock(adventurer);

      vi.spyOn(
        GameHandler.prototype,
        "getDestinationBox" as never,
      ).mockReturnValue(emptyBox);
      const collectTreasureMock = vi.spyOn(
        GameHandler.prototype,
        "collectTreasure" as never,
      );

      new GameHandler({
        treasureMap: [[emptyBox, emptyBoxWithAdventurer]] as Box[][],
        adventurers: [] as Adventurer[],
      })["moveForward"](adventurer);

      expect(emptyBox.getAdventurer()).toBe(adventurer);
      expect(emptyBoxWithAdventurer.getAdventurer()).toBe(undefined);
      expect(collectTreasureMock).toBeCalledTimes(0);
    });

    test("moveForward should work as expected if destinationBox is occupied", async ({
      expect,
    }) => {
      const mountain = getMountainMock();
      const adventurer = adventurerMock2();
      const emptyBoxWithAdventurer = emptyBoxWithAdventurerMock(adventurer);

      vi.spyOn(
        GameHandler.prototype,
        "getDestinationBox" as never,
      ).mockReturnValue(mountain);
      const moveAdventurerMock = vi.spyOn(
        GameHandler.prototype,
        "moveAdventurer" as never,
      );

      new GameHandler({
        treasureMap: [[mountain, emptyBoxWithAdventurer]] as Box[][],
        adventurers: [] as Adventurer[],
      })["moveForward"](adventurer);

      expect(moveAdventurerMock).toBeCalledTimes(0);
    });
  });

  describe("getDestinationBox", async () => {
    test("getDestinationBox should work as expected when orientation east", async ({
      expect,
    }) => {
      const emptyBox = emptyBoxMock();

      const destinationBox = new GameHandler({
        treasureMap: [
          [],
          [getMountainMock(), getMountainMock(), emptyBox],
        ] as Box[][],
        adventurers: [] as Adventurer[],
      })["getDestinationBox"](adventurerMock());

      expect(destinationBox).toBe(emptyBox);
    });

    test("getDestinationBox should work as expected when orientation north", async ({
      expect,
    }) => {
      const emptyBox = emptyBoxMock();
      const adventurer = adventurerMock();
      adventurer.turnLeft();

      const destinationBox = new GameHandler({
        treasureMap: [[getMountainMock(), emptyBox], []] as Box[][],
        adventurers: [] as Adventurer[],
      })["getDestinationBox"](adventurer);

      expect(destinationBox).toBe(emptyBox);
    });

    test("getDestinationBox should work as expected when orientation west", async ({
      expect,
    }) => {
      const emptyBox = emptyBoxMock();
      const adventurer = adventurerMock();
      adventurer.turnLeft();
      adventurer.turnLeft();

      const destinationBox = new GameHandler({
        treasureMap: [[], [emptyBox]] as Box[][],
        adventurers: [] as Adventurer[],
      })["getDestinationBox"](adventurer);

      expect(destinationBox).toBe(emptyBox);
    });

    test("getDestinationBox should work as expected when orientation south", async ({
      expect,
    }) => {
      const emptyBox = emptyBoxMock();
      const adventurer = adventurerMock();
      adventurer.turnRight();

      const destinationBox = new GameHandler({
        treasureMap: [[], [], [getMountainMock(), emptyBox]] as Box[][],
        adventurers: [] as Adventurer[],
      })["getDestinationBox"](adventurer);

      expect(destinationBox).toBe(emptyBox);
    });
  });
});
