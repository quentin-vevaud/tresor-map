import { Adventurer } from "../../src/objects/Adventurer";
import { EmptyBox } from "../../src/objects/EmptyBox";

export const emptyBoxMock = () => new EmptyBox(0, 1);

export const emptyBoxWithAdventurerMock = (adventurer: Adventurer) => {
  const box = new EmptyBox(0, 1);
  box.setAdventurer(adventurer);
  return box;
};
