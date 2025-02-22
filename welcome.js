
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
