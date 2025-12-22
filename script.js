// Function to generate a batch of snowflakes
function generateSnowBatch() {
    const snowContainer = document.getElementById("snow");
    // Generate around 20-30 snowflakes in this batch
    const batchSize = 25; 

    for (let i = 0; i < batchSize; i++) {
        let snowflake = document.createElement("div");
        snowflake.classList.add("flake");

        // Start position is random horizontally
        snowflake.style.left = Math.random() * 100 + "vw";
        // Animation duration varies, making flakes fall at different speeds
        const duration = 5 + Math.random() * 5; // duration between 5s and 10s
        snowflake.style.animationDuration = duration + "s";
        
        // Vary opacity and size
        snowflake.style.opacity = Math.random() * 0.5 + 0.5; // 50% to 100% opacity
        snowflake.style.fontSize = 10 + Math.random() * 20 + "px";

        snowflake.innerHTML = "❄";

        snowContainer.appendChild(snowflake);

        // Remove the element from the DOM once its animation is complete
        setTimeout(() => {
            snowflake.remove();
        }, duration * 1000); // Timeout matches the CSS animation duration
    }
}

document.getElementById("snowbutton").addEventListener("click", function() {
    // We use a class to manage the state instead of 'disabled' to prevent
    // the button from sticking in a disabled visual state after the first click.
    if (this.classList.contains('snow-active')) {
        return; 
    }
    this.classList.add('snow-active'); 

    // Generate the first batch immediately
    generateSnowBatch();
    
    // Set an interval to generate a new batch of snowflakes every 1.5 seconds.
    setInterval(generateSnowBatch, 1500); 
});


// --- Tree Lights functionality (Updated margins) ---

// We define the vertices of the triangle in percentages of the container size (0% to 100%)
// Top point (center top)
const P1 = { x: 50, y: 0 }; 
// Bottom left point (15% margin from left, 20% margin from bottom)
const P2 = { x: 15, y: 80 }; 
// Bottom right point (15% margin from right, 20% margin from bottom)
const P3 = { x: 85, y: 80 }; 

const colors = ['#ff5252', '#ffd700', '#00eb76', '#f7407d', '#8344f1'];

/**
 * Function to generate a random point within a defined triangle 
 * using barycentric coordinates for uniform distribution.
 */
function getRandomPointInTriangle(p1, p2, p3) {
    let r1 = Math.random();
    let r2 = Math.random();
    
    // Algorithm adjustment for uniform sampling
    if (r1 + r2 > 1) {
        r1 = 1 - r1;
        r2 = 1 - r2;
    }

    // Convert barycentric coordinates back to Cartesian (X, Y) coordinates
    const x = p1.x + r1 * (p2.x - p1.x) + r2 * (p3.x - p1.x);
    const y = p1.y + r1 * (p2.y - p1.y) + r2 * (p3.y - p1.y);
    
    return { x, y };
}

function placeLights() {
    const treeContainer = document.querySelector(".tree-container");
    const numberOfLights = 18; // Reduced number of lights

    for (let i = 0; i < numberOfLights; i++) {
        const { x, y } = getRandomPointInTriangle(P1, P2, P3);
        const lightDiv = document.createElement("div");
        
        lightDiv.classList.add("light");
        lightDiv.style.left = `${x}%`;
        lightDiv.style.top = `${y}%`;
        
        // Randomly pick a color from the list
        lightDiv.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        // Add a slight animation delay for varied blinking
        lightDiv.style.animationDelay = `${Math.random() * 2}s`; 

        treeContainer.appendChild(lightDiv);
    }
}

// Place the lights automatically when the page loads
document.addEventListener("DOMContentLoaded", placeLights);