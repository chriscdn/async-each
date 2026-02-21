import { describe, expect, it, test } from "vitest";
import { asyncEach } from "../src";

const pause = async (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

const randomIntBetween = (a: number, b: number): number => {
    const min = Math.ceil(a);
    const max = Math.floor(b);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const pauseAndEcho = async (text: string) => {
    const randomPause = randomIntBetween(500, 3000); // between 0.5 and 3s
    await pause(randomPause);
    return text;
};

const trees = [
    "oak",
    "maple",
    "pine",
    "birch",
    "cedar",
    "willow",
    "cherry",
    "elm",
    "redwood",
    "spruce",
];

describe("Retry", () => {
    test("one", async () => {
        expect(
            JSON.stringify(
                await asyncEach(trees, (tree) => pauseAndEcho(tree)),
            ),
        ).toBe(
            JSON.stringify(trees),
        );
    });
});
