const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerHeight;
const height = canvas.height = window.innerHeight;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
    constructor(x, y, velX, velY, color, size) { //Error1: falta atributo color en el constructor de la clase
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //Error2: Math.PI no es una función, es objeto nativo de js
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


    collisionDetect() {
        //Error 2: Creamos un bucle for para recorrer el array bolas
        for(const ball of balls){
            //Comprobar que la bola no es la misma que con la que estamos iterando
            if(!this === ball){
            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + ball.size) {
            ball.color = this.color = randomRGB();
            }
            }
        }
        
    }
}


const balls = [];

while (balls.length < 4) {
    const size = random(10, 20);
    const ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomRGB(),
        size
    );

    balls.push(ball);
}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; //Error3: color de fondo negro transparente
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
        ball.draw();
        ball.update(); 
        ball.collisionDetect();
        for (const otherBall of balls) {
            if (ball !== otherBall) {
                ball.collisionDetect(otherBall);
            }
        }
    }

    requestAnimationFrame(loop);
}

loop();