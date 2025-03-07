
document.getElementById("navigate-enter-name").addEventListener("click", function() {
    window.location.href = "enter-name.html";
});

document.addEventListener("DOMContentLoaded", function () {
    let images = document.querySelectorAll(".floating-image");
    let { positionX, positionY } = generateRandomPositions(images.length, window.innerWidth, window.innerHeight);

    // Assign initial positions
    assignPositions(images, positionX, positionY);

    images.forEach(img => {
        img.addEventListener("animationiteration", function () {
            // Generate new positions
            let { positionX, positionY } = generateRandomPositions(images.length, window.innerWidth, window.innerHeight);
            assignPositions(images, positionX, positionY);

        });
    });

    function generateRandomPositions(count, width, height) {
        let positionX = [];
        let positionY = [];
        let stepX = window.innerWidth / count; // Distribute across width

        for (let i = 0; i < count; i++) {
            positionX.push(i * stepX + Math.random() * stepX * 0.5);
            positionY.push(window.innerHeight + Math.random() * (window.innerHeight * 0.5)); // Random depth below screen
        }

        shuffleArray(positionX);
        shuffleArray(positionY);

        return { positionX, positionY };
    }

    function assignPositions(images, positionX, positionY) {
        images.forEach((img, index) => {
            img.style.left = `${positionX[index]}px`;
            img.style.top = `${positionY[index]}px`;
        });
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("fireworks-canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    class Firework {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = Math.random() * 4 + 2;
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.velocity = {
                x: (Math.random() - 0.5) * 4,
                y: Math.random() * -5 - 2
            };
            this.alpha = 1;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }

        update() {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= 0.01;
        }
    }

    let fireworks = [];

    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        fireworks.forEach((firework, index) => {
            firework.update();
            firework.draw();
            if (firework.alpha <= 0) {
                fireworks.splice(index, 1);
            }
        });

        if (Math.random() < 0.1) {
            fireworks.push(new Firework(Math.random() * canvas.width, canvas.height));
        }
    }

    animate();
});
