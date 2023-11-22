# Caos de Colisiones Cromáticas(h1)

***Ejemplo de aplicación de Objetos de Alto Nivel en JavaScript y de Objetos Nativos(cursiva)***

## Introducción al concepto de Modulación de js en JavaScript(h2)

* scripts(lista desordenada)
    1. ball-class.js(lista ordenada)
    2. canvas-setup.js
    3. main.js

**Autor**(negrita): Caterina Ilario Paz

import { balls } from "./main.js";

const canvas = document.querySelector('canvas');
// Le generamos un contexto a canvas, pudiendo ser 2d o 3d
export const ctx = canvas.getContext('2d');
// Creamos ancho y alto, lo igualamos al que tiene el canvas en html y al de la ventana
// PUEDE QUE CAMBIEN EN EXAMEN
export const width = (canvas.width = window.innerWidth);
export const height = (canvas.height = window.innerHeight);

export const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomRGB = () => {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
};
// Función principal del programa
export const loop = () => {
    // Añadimos color al contexto (fondo negro transparente)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    // Tamaño del contexto
    ctx.fillRect(0, 0, width, height);
    
    // Bucle for para dibujar las bolas en el contexto
    for(const ball of balls){
        ball.draw();
        ball.update();
        ball.collisionDetect();
    }
    // Método propio, parecido al addEventListener, aplicado a un contexto canvas en 2d
    requestAnimationFrame(loop);
}

import { ctx, width, height, randomRGB } from "./canvas-setup.js";
import { balls } from "./main.js";

//Implementacion de una clase. EXAMEN SE PONE EN OTRA CLASE
export class Ball {
    // Bola tiene posición en eje x, en eje y, una velocidad en x, una velocidad en y, un color y un tamaño
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    draw() {
        // Método propio de canvas, para una nueva ruta que inicia una figura
        ctx.beginPath();
        // Añadimos el color al estilo
        ctx.fillStyle = this.color;
        // Método propio de canvas que define cada bola
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);  // damos posición, tamaño y valor empírico al ser circular
        // Método que rellenará la bola con el color seleccionado
        ctx.fill();
    }

    // Actualizar en cada instante donde está la bola. Tener en cuenta lo que sucede vertical y horizontalmente
    update() {
        //Si la posicion x de la pelota + su tamaño, supera el ancho del lienzo. Si hay colisión con borde derecho...
        if ((this.x + this.size) >= width) {
            // Cambiamos el signo a la velocidad para producir un choque y cambiar de sentido
            this.velX = -(Math.abs(this.velX));
        }

        // Verifica si la posicion x de la pelota - su tamaño es menor o igual a 0 (x=0 en borde izquierdo)
        // Si hay colisión con el borde izq...
        if ((this.x - this.size) <= 0) {
            // Se invierte la direccion horizontal
            this.velX = (Math.abs(this.velX));
        }

        // Controlar posición y, en el campo vertical
        if ((this.y + this.size) >= height) {
            this.velY = -(Math.abs(this.velY));
        }

        if ((this.y + this.size) <= 0) {
            this.velY = Math.abs(this.velY);
        }
        // Actualizar las coordenadas de la bola en función de las velocidades actuales
        this.x += this.velX;
        this.y += this.velY;
    }

    // Método que recorre el array de balls y detectará el choque de unas bolas con otras
    collisionDetect() {
        // for of se parece al foreach, tratando cada elemtno ball dentro de balls
        for (const ball of balls) {
            // Verificar que la bola actual sea distinta que la bola con la que iterar
            if (!(this === ball)) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                // Método de colisión detectada: POSIBLE CAMBIADO EN EL EXAMEN
                // Calcular distancia entre el centro de la pelota actual y la pelota de la iteración
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                }
            }

        }

    }
}

import { Ball } from "./Ball.js";
import { width, height, random, randomRGB, loop } from "./canvas-setup.js";

// Array de bolas
export const balls = [];

// Mientras que el nº de bolas sea menor que 25, añadir bolas
while (balls.length < 25){
    const size = random(10, 20);
    // Creamos instancias de la clase Ball con valores aleatorios
    const ball = new Ball(
        random(0 + size, width - size),  // posición en x de forma aleatoria
        random(0 + size, height - size), // posición en y
        random(-7, 7),  // velocidad en x (aleatoria entre -7 y 7)
        random(-7, 7), // velocidad en y (aleatoria entre -7 y 7)
        randomRGB(), // color aleatorio
        size // tamaño aleatorio ya declarado arriba
    )
    
    balls.push(ball);  // añadimos cada instancia creada al array balls
}
// Llamada a la función principal para que pinte las bolas
loop();