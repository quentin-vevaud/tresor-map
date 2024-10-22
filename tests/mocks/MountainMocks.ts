import { Mountain } from "../../src/objects/Mountain";

export const getMountainMock = () => new Mountain(1, 1);

export const invalidMountainMock = () => new Mountain(1, 5);
