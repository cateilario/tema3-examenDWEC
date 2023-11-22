import { ctx, width, height, randomRGB } from "./canvasSetUp.js";
import { balls } from "./main.js";

export class Ball {
    constructor(x, y, velX, velY, color, size) { //Error2: falta atributo color en el constructor de la clase
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = randomRGB();
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //Error3: Math.PI no es una función, es objeto nativo de js
        ctx.fill();
    }

    update() {
        // Error: habría que realizar 4 condiciones
        // En la primera si hay colisión derecha: cambiamos el signo del valor absoluto de la velocidad
        // para que se produzca un choque y un cambio de sentido
        if ((this.x + this.size) >= width) {
            this.velX = -(Math.abs(this.velX));
        } 
        
        if ((this.x - this.size) <= 0) {
            // Si hay colisión izquierda (x es 0 en el borde izquierdo), cambiamos el signo del valor absoluto
            this.velX = Math.abs(this.velX);
        }
        // Lo mismo del eje x para el eje y
        if ((this.y + this.size) >= height) {
            this.velY = -(Math.abs(this.velY));
        }

        if ((this.y - this.size) <= 0) {
            this.velY = Math.abs(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect(otherBall) {
        const dx = this.x - otherBall.x;
        const dy = this.y - otherBall.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + otherBall.size) {
            otherBall.color = this.color = randomRGB();
        }
    }
}