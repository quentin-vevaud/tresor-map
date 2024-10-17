import { Box } from "../objects/Box";
import { EmptyBox } from "../objects/EmptyBox";
import { BoxFactory } from "./BoxFactory";
import { ValidationHandler } from "./ValidationHandler";

export class SimulationToTreasureMapMapper {
  private readonly validationHandler = new ValidationHandler();

  mapParsedSimulationToTreasureMap(parsedSimulation: string[][]): Box[][] {
    const treasureMapLine = parsedSimulation[0];

    this.validationHandler.validateTreasureMapLine(treasureMapLine);

    return this.createTreasureMap(
      this.getDefinedBoxes(parsedSimulation),
      treasureMapLine,
    );
  }

  // mapTreasureMapToResult(treasureMap: Box[][]): string[][] {
  //   return;
  // }

  private getDefinedBoxes(parsedSimulation: string[][]): Box[] {
    const treasureMapObjects = parsedSimulation.slice(1);

    return treasureMapObjects.map((objectData) => {
      return new BoxFactory(objectData).createBox();
    });
  }

  private createTreasureMap(
    definedBoxes: Box[],
    treasureMapLine: string[],
  ): Box[][] {
    const treasureMap: Box[][] = [];
    for (let i = 0; i < +treasureMapLine[1]; i++) {
      treasureMap.push([]);
      for (let j = 0; j < +treasureMapLine[2]; j++) {
        treasureMap[i][j] = this.getCorrespondingBox(i, j, definedBoxes);
      }
    }
    return treasureMap;
  }

  private getCorrespondingBox(
    xIndex: number,
    yIndex: number,
    boxes: Box[],
  ): Box {
    return (
      boxes.find(
        (box) => box.getXIndex() === xIndex && box.getYIndex() === yIndex,
      ) || new EmptyBox(xIndex, yIndex)
    );
  }
}
