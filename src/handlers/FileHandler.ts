import fs from "fs";

export class FileHandler {
  private readonly ENTRY_FILE_PATH = "simulation/simulationDefinition.txt";
  private readonly OUTPUT_FILE_PATH = "simulation/simulationResult.txt";

  public getParsedSimulationDefinition(): string[][] {
    const fileMock = fs.readFileSync(this.ENTRY_FILE_PATH, "utf8");
    return fileMock
      .replaceAll(" ", "")
      .split("\r\n")
      .map((row: string) => row.split("-"));
  }

  public writeResultFile(parsedResult: string[][]): void {
    const stringToWrite = parsedResult
      .map((row) => row.join(" - "))
      .join("\r\n");
    fs.writeFileSync(this.OUTPUT_FILE_PATH, stringToWrite, "utf8");
  }
}
