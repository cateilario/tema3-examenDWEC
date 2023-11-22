/**
 * Autor: Caterina Ilario Paz
 * GitHub: 
 */

import { width, height, random, randomRGB, loop } from "./canvasSetUp.js";
import { Ball } from "./Ball.js";

export const balls = [];

while (balls.length < 4) {
    const size = random(10, 20);
    const ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomRGB(), // Error: falta dar valor a color 
        size
    );

    balls.push(ball);
}

loop();