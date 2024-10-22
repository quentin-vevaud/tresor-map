import { Adventurer } from "./Adventurer";
import { Box } from "./Box";

export type TGameDefinition = {
  treasureMap: Box[][];
  adventurers: Adventurer[];
};
