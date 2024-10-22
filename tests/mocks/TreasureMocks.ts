import { Treasure } from "../../src/objects/Treasure";

export const treasureMock = () => new Treasure(2, 3, 3);

export const invalidTreasureMock = () => new Treasure(2, 3, -2);
