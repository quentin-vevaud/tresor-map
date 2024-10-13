import { readFileSync, writeFileSync } from "fs";

export class FileHandler {
  private readonly ENTRY_FILE_PATH = "simulation/simulationDefinition.txt";
  private readonly OUTPUT_FILE_PATH = "simulation/simulationResult.txt";

  public getParsedSimulationDefinition(): string[][] {
    return readFileSync(this.ENTRY_FILE_PATH, "utf8")
      .replaceAll(" ", "")
      .split("\r\n")
      .map((line: string) => line.split("-"));
  }

  public writeResultFile(content: string): void {
    writeFileSync(this.OUTPUT_FILE_PATH, content, "utf8");
  }
}
