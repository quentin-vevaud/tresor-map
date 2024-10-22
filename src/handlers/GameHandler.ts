import { Adventurer } from "../objects/Adventurer";
import { Box } from "../objects/Box";
import { MovementEnum, OrientationEnum } from "../objects/Enums";
import { TGameDefinition } from "../objects/GameInititalisation";
import { Treasure } from "../objects/Treasure";

export class GameHandler {
  private readonly treasureMap: Box[][];
  private readonly adventurers: Adventurer[];

  constructor(gameDefinition: TGameDefinition) {
    this.treasureMap = gameDefinition.treasureMap;
    this.adventurers = gameDefinition.adventurers;
  }

  play(remainingAdventurers?: Adventurer[]): TGameDefinition {
    const remainingAdventurersAfterTurnPlayed =
      this.moveAdventurersAndGetRemainingOnes(
        remainingAdventurers ?? this.adventurers,
      );

    if (remainingAdventurersAfterTurnPlayed.length === 0) {
      return {
        treasureMap: this.treasureMap,
        adventurers: this.adventurers,
      };
    }
    this.logEndOfTurn();
    return this.play(remainingAdventurersAfterTurnPlayed);
  }

  private moveAdventurersAndGetRemainingOnes(
    remainingAdventurers: Adventurer[],
  ) {
    return remainingAdventurers.reduce((acc, adventurer) => {
      const movement = adventurer.act();
      if (movement) {
        this.move(movement, adventurer);
        acc.push(adventurer);
      }
      return acc;
    }, [] as Adventurer[]);
  }

  private move(movement: MovementEnum, adventurer: Adventurer) {
    switch (movement) {
      case MovementEnum.FORWARD:
        return this.moveForward(adventurer);
      case MovementEnum.TURN_LEFT:
        return adventurer.turnLeft();
      case MovementEnum.TURN_RIGHT:
        return adventurer.turnRight();
    }
  }

  private moveForward(adventurer: Adventurer): void {
    const destinationBox = this.getDestinationBox(adventurer);

    if (!destinationBox || destinationBox.isOccupied()) {
      return;
    }

    this.moveAdventurer(adventurer, destinationBox);

    if (destinationBox instanceof Treasure) {
      this.collectTreasure(adventurer, destinationBox);
    }
  }

  private getDestinationBox(adventurer: Adventurer): Box {
    const indexChangeByOrientationMap = new Map<OrientationEnum, number[]>([
      [OrientationEnum.NORTH, [-1, 0]],
      [OrientationEnum.SOUTH, [1, 0]],
      [OrientationEnum.WEST, [0, -1]],
      [OrientationEnum.EAST, [0, 1]],
    ]);

    const [rowChange, columnChange] = indexChangeByOrientationMap.get(
      adventurer.getOrientation(),
    )!;

    return this.treasureMap[adventurer.getRow() + rowChange][
      adventurer.getColumn() + columnChange
    ];
  }

  private moveAdventurer(adventurer: Adventurer, destinationBox: Box) {
    this.treasureMap[adventurer.getRow()][adventurer.getColumn()].setAdventurer(
      undefined,
    );
    destinationBox.setAdventurer(adventurer);
    adventurer.setPosition(destinationBox.getRow(), destinationBox.getColumn());
  }

  private collectTreasure(adventurer: Adventurer, treasure: Treasure): void {
    const treasureCollected = treasure.collect();
    if (treasureCollected) adventurer.collectTreasure();
  }

  private logEndOfTurn() {
    this.treasureMap.forEach((row) => {
      row.map((box) => box.toString());
      console.log(row.join(" "));
    });
    console.log();
  }
}
