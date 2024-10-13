import { FileHandler } from "./FileHandler";

export class SimulationHandler {
  constructor() {}

  launch() {
    const result = new FileHandler().getParsedSimulationDefinition();
    console.log(result);
  }
}
