import { Adventurer } from "../objects/Adventurer";
import { Box } from "../objects/Box";
import { EmptyBox } from "../objects/EmptyBox";
import { TGameDefinition } from "../objects/GameInititalisation";
import { MapEntity } from "../objects/MapEntity";
import { MapEntityFactory } from "./MapEntityFactory";
import { ValidationHandler } from "./ValidationHandler";

export class ParsedSimulationToGameInitialisationMapper {
  private readonly validationHandler = new ValidationHandler();

  mapParsedSimulationToGameDefinition(
    parsedSimulation: string[][],
  ): TGameDefinition {
    const mapSizeDefinition = parsedSimulation[0];

    this.validationHandler.validateTreasureMapLine(mapSizeDefinition);

    return this.createTreasureMapAndGetAdventurers(
      parsedSimulation,
      mapSizeDefinition,
    );
  }

  mapGameDefinitionToParsedResult(gameResult: TGameDefinition): string[][] {
    const treasureMapParsedResults = this.getTreasureMapParsedResults(
      gameResult.treasureMap,
    );

    const adventurersParsedResults = gameResult.adventurers.map((adventurer) =>
      adventurer.toParsedResult(),
    );

    return treasureMapParsedResults.concat(adventurersParsedResults);
  }

  private getTreasureMapParsedResults(treasureMap: Box[][]) {
    const mapDefinitionParsedResult = [
      "C",
      treasureMap[0].length.toString(),
      treasureMap.length.toString(),
    ];

    const treasureMapDefinedObjects = treasureMap
      .flat()
      .filter((box) => !(box instanceof EmptyBox));
    const treasureMapObjectsParsedResults = treasureMapDefinedObjects.map(
      (box) => box.toParsedResult(),
    );

    return [mapDefinitionParsedResult].concat(treasureMapObjectsParsedResults);
  }

  private getDefinedMapEntities(
    parsedSimulation: string[][],
    rowSize: number,
    columnSize: number,
  ): MapEntity[] {
    const treasureMapObjects = parsedSimulation.slice(1);

    return treasureMapObjects.map((objectData) => {
      return new MapEntityFactory(
        objectData,
        rowSize,
        columnSize,
      ).createMapEntity();
    });
  }

  private createTreasureMapAndGetAdventurers(
    parsedSimulation: string[][],
    mapSizeDefinition: string[],
  ): TGameDefinition {
    const emptyTreasureMap = this.createEmptyTreasureMap(mapSizeDefinition);

    const definedMapEntities = this.getDefinedMapEntities(
      parsedSimulation,
      emptyTreasureMap.length,
      emptyTreasureMap[0].length,
    );

    return this.getTreasureMapWithDefinedBoxesAndAdventurers(
      definedMapEntities,
      emptyTreasureMap,
    );
  }

  private createEmptyTreasureMap(mapSizeDefinition: string[]): Box[][] {
    return Array.from({ length: +mapSizeDefinition[2] }, (_a, row) =>
      Array.from(
        { length: +mapSizeDefinition[1] },
        (_b, column) => new EmptyBox(row, column),
      ),
    );
  }

  private getTreasureMapWithDefinedBoxesAndAdventurers(
    definedEntities: MapEntity[],
    emptyTreasureMap: Box[][],
  ): TGameDefinition {
    const adventurers = definedEntities.filter(
      (adventurer) => adventurer instanceof Adventurer,
    );

    const treasureMap = definedEntities.reduce((acc, box) => {
      if (!(box instanceof Adventurer)) {
        acc[box.getRow()][box.getColumn()] = box as Box;
      }
      return acc;
    }, emptyTreasureMap);

    this.addAdventurersToTreasureMap(adventurers, treasureMap);

    return {
      treasureMap,
      adventurers,
    };
  }

  private addAdventurersToTreasureMap(
    adventurers: Adventurer[],
    treasureMap: Box[][],
  ) {
    adventurers.forEach((adventurer) =>
      treasureMap[adventurer.getRow()][adventurer.getColumn()].setAdventurer(
        adventurer,
      ),
    );
  }
}
