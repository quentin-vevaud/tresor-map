import { Adventurer } from "../../src/objects/Adventurer";
import { EmptyBox } from "../../src/objects/EmptyBox";
import { MovementEnum, OrientationEnum } from "../../src/objects/Enums";
import { TGameDefinition } from "../../src/objects/GameInititalisation";
import { Mountain } from "../../src/objects/Mountain";
import { Treasure } from "../../src/objects/Treasure";

const adventurer = new Adventurer("Lara", 1, 1, OrientationEnum.SOUTH, [
  MovementEnum.FORWARD,
  MovementEnum.FORWARD,
  MovementEnum.TURN_RIGHT,
  MovementEnum.FORWARD,
  MovementEnum.TURN_RIGHT,
  MovementEnum.FORWARD,
  MovementEnum.TURN_LEFT,
  MovementEnum.TURN_LEFT,
  MovementEnum.FORWARD,
]);

const emptyBox1 = new EmptyBox(0, 0);
const emptyBox2 = new EmptyBox(0, 2);
const emptyBox3 = new EmptyBox(1, 0);
const emptyBox4 = new EmptyBox(1, 1);
const emptyBox5 = new EmptyBox(2, 0);
const emptyBox6 = new EmptyBox(2, 1);
const emptyBox7 = new EmptyBox(2, 2);
const emptyBox8 = new EmptyBox(3, 2);

emptyBox4.setAdventurer(adventurer);

const mountain1 = new Mountain(0, 1);
const mountain2 = new Mountain(1, 2);

const treasure1 = new Treasure(3, 0, 2);
const treasure2 = new Treasure(3, 1, 3);

export const gameDefinitionMock: TGameDefinition = {
  adventurers: [adventurer],
  treasureMap: [
    [emptyBox1, mountain1, emptyBox2],
    [emptyBox3, emptyBox4, mountain2],
    [emptyBox5, emptyBox6, emptyBox7],
    [treasure1, treasure2, emptyBox8],
  ],
};
