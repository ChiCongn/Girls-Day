class Image {

    constructor(id, source, owner, message) {
        this.id = id;
        this.source = source;
        this.owner = owner;
        this.message = message;
    }

    displayInfo() {
        return `Owner: ${this.owner}, Message: ${this.message}`;
    }
    
}

document.addEventListener("DOMContentLoaded", async () => {
    await loadImages();

    const name = localStorage.getItem("username");
    if (name) {
        console.log("Retrieved name:", name);
        currentUserImages = getImagesByName(name);

        if (currentUserImages.length > 0) {
            showImage(currentIndex); // Show first image after loading
        } else {
            console.log("No images found for this user.");
        }
    } else {
        console.log("No name found.");
        alert("You typed the wrong name!");
    }

    setupNavigation(); // Attach event listeners after images load
});

document.addEventListener("DOMContentLoaded", createFloatingElements);

let currentIndex = 0;
let currentUserImages = [];

const imageElement = document.getElementById("image-display");
const messageElement = document.getElementById("image-message");

function showImage(index) {
    console.log("show image");
    if (currentUserImages.length === 0) return;

    imageElement.style.opacity = "0"; // Fade out
    setTimeout(() => {
        imageElement.src = currentUserImages[index].source;
        messageElement.textContent = currentUserImages[index].message;
        imageElement.style.opacity = "1"; // Fade in
    }, 500);
}

// Navigation Setup
function setupNavigation() {
    console.log("navigate");
    document.getElementById("prev-btn").addEventListener("click", () => {
        if (currentUserImages.length === 0) return;
        currentIndex = (currentIndex - 1 + currentUserImages.length) % currentUserImages.length;
        showImage(currentIndex);
    });

    document.getElementById("next-btn").addEventListener("click", () => {
        if (currentUserImages.length === 0) return;
        currentIndex = (currentIndex + 1) % currentUserImages.length;
        showImage(currentIndex);
    });

    // setInterval(() => {
    //     if (currentUserImages.length > 0) {
    //         currentIndex = (currentIndex + 1) % currentUserImages.length;
    //         showImage(currentIndex);
    //     }
    // }, 5000);
}


const imageList = [];
const userImagesMap = new Map();

async function loadImages() {
    if (imageList.length > 0) return; // Avoid reloading if already loaded
    console.log("load all images");
    imageList.push(new Image(0, "placeholder.png", "none", "none"));

    try {
        const response = await fetch("images.csv");
        const data = await response.text();
        const lines = data.split("\n").slice(1);

        for (let line of lines) {
            if (line.trim() === "") continue;
            const [id, source, owner, message] = line.split(",");

            const image = new Image(id, source, owner, message);
            imageList.push(image);

            if (!userImagesMap.has(owner)) {
                userImagesMap.set(owner, []);
            }
            
            userImagesMap.get(owner).push(image);
        }

        console.log("Images Cached:", imageList);
    } catch (error) {
        console.error("Error loading images:", error);
    }
}

function getImagesByName(name) {
    console.log("get images by name");
    return imageList.filter(image => image.owner === name);
}

// Function to create floating effects (snow, confetti, etc.)
function createFloatingElements() {
    const numElements = 20;
    const elements = ['🌸', '🌺', '🎁', '🎊', '💖', '🔥', '❄️', '🍀'];
    const colors = ['#ff4d6d', '#ff9f1c', '#ffcc00', '#6a0572', '#00a8e8', '#ff5e57', '#ff66c4', '#80ffdb'];

    for (let i = 0; i < numElements; i++) {
        const element = document.createElement('div');
        element.classList.add('floating-element');
        element.innerHTML = elements[Math.floor(Math.random() * elements.length)];
        document.body.appendChild(element);

        // Random properties
        element.style.left = Math.random() * 100 + 'vw';
        element.style.fontSize = Math.random() * 50 + 10 + 'px';
        element.style.color = colors[Math.floor(Math.random() * colors.length)];

        // Animation settings
        const fallDuration = Math.random() * 5 + 5 + 's';
        const delay = Math.random() * 5 + 's';
        const swayAmount = Math.random() * 30 + 10 + 'px';

        element.style.animationDuration = `${fallDuration}, ${parseFloat(fallDuration) / 2}s`;
        element.style.animationDelay = `${delay}, ${delay}`;
        element.style.setProperty('--sway', swayAmount);
    }
}

function getRandomGif(gifPaths) {
    const randomIndex = Math.floor(Math.random() * gifPaths.length);
    return gifPaths[randomIndex];
  }

  const gifList = [
    './images/bunny-rabbit-congratz.gif',
    './images/bunny-happy.gif',
    './images/bunny-rabbit.gif',
    './images/bunny-rabit02.gif',
    './images/cheer-cheering.gif',
    './images/congratz.gif',
    './images/happy-bunny.gif'
  ];
  
  // assign random GIFs to the left and right containers
  document.addEventListener("DOMContentLoaded", () => {
    const leftGif = document.getElementById("left-gif");
    const rightGif = document.getElementById("right-gif");
  
    if (leftGif) {
      leftGif.src = getRandomGif(gifList);
    }
    if (rightGif) {
      rightGif.src = getRandomGif(gifList);
    }
  });
  
