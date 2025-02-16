const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
const button = document.getElementById("explodeButton");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiPieces = [];
const colors = ["#ff0a54", "#ff477e", "#ff85a1", "#fbb1bd", "#f9bec7", "#ffcc00", "#00ccff", "#33ff99"];

function playSound(source) {
    const audio = new Audio(source);
    audio.play();
}

class ConfettiPiece {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 5;
        this.speedX = (Math.random() - 0.5) * 8;
        this.speedY = (Math.random() - 1) * 8;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
        this.gravity = 0.2;
        this.opacity = 1;
        this.color = color;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += this.gravity;
        this.rotation += this.rotationSpeed;
        this.opacity -= 0.02; // Fade out effect
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

// Create Confetti Explosion at Given Position
function explodeConfetti(x, y) {
    for (let i = 0; i < 50; i++) {
        confettiPieces.push(new ConfettiPiece(x, y, colors[Math.floor(Math.random() * colors.length)]));
    }
}

// Animation Loop
function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiPieces.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.opacity <= 0) {
            confettiPieces.splice(index, 1);
        }
    });
    requestAnimationFrame(animateConfetti);
}

// Start Animation
animateConfetti();

// Button Click Event
button.addEventListener("click", (event) => {
    const xLeft = 280;
    const xRight = 1200;
    const y = 150;
    
    explodeConfetti(xLeft, y);
    explodeConfetti(xRight, y);
    playSound('./sounds/single-firework-explode.mp3');
});


