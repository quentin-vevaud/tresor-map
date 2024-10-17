import { Adventurer } from "../objects/Adventurer";
import { Box } from "../objects/Box";
import { MovementEnum } from "../objects/Enums";

export class GameHandler {
  private turn: number = 1;
  private adventurers: Adventurer[];

  constructor(private map: Box[][]) {
    this.adventurers = map.flat().filter((box) => box instanceof Adventurer);
  }

  play(): Box[][] {
    this.adventurers.forEach((adventurer) => {
      const nextPosition = this.getNextPosition(adventurer);
      if (nextPosition) {
        this.moveAdventurer(adventurer, nextPosition);
      }
    });
    console.log(`Turn ${this.turn}`);
    this.turn++;
  }

  private playTurn(adventurer: Adventurer): void {
    this.adventurers.forEach((adventurer) => {
      const movement = adventurer.act();
      if ()

    });
  }

  private computeNextPosition(movement: MovementEnum) {
    switch (movement) {
      case MovementEnum.FORWARD:

    }
  }
}
