import * as process from "node:process";
import { FileHandler } from "./FileHandler";
import { GameHandler } from "./GameHandler";
import { ParsedSimulationToGameInitialisationMapper } from "./ParsedSimulationToTreasureMapMapper";

export class SimulationHandler {
  launch() {
    try {
      this.handleSimulation();
      process.exit(0);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }

  private handleSimulation() {
    const fileHandler = new FileHandler();

    const parsedSimulation = fileHandler.getParsedSimulationDefinition();

    const simulationToGameInitialisation =
      new ParsedSimulationToGameInitialisationMapper();

    const gameInitialisation =
      simulationToGameInitialisation.mapParsedSimulationToGameDefinition(
        parsedSimulation,
      );

    const gameResult = new GameHandler(gameInitialisation).play();

    const parsedResult =
      simulationToGameInitialisation.mapGameDefinitionToParsedResult(
        gameResult,
      );

    fileHandler.writeResultFile(parsedResult);
  }
}
