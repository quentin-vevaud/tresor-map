import * as process from "node:process";
import { FileHandler } from "./FileHandler";
import { SimulationToTreasureMapMapper } from "./SimulationToTreasureMapMapper";

export class SimulationHandler {
  launch() {
    try {
      this.handleSimulation();
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }

  private handleSimulation() {
    const fileHandler = new FileHandler();

    const parsedSimulation = fileHandler.getParsedSimulationDefinition();

    const simulationToTreasureMapMapper = new SimulationToTreasureMapMapper();

    const map =
      simulationToTreasureMapMapper.mapParsedSimulationToTreasureMap(
        parsedSimulation,
      );

    map.forEach((line) => line.forEach((cell) => console.log(cell.getLabel())));

    // new GameHandler(map).play();

    // simulationToTreasureMapMapper.fileHandler.writeResultFile();
  }
}
