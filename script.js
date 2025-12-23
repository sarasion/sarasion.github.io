
function generateSnowBatch() {
    const snowContainer = document.getElementById("snow");
    const batchSize = 25; 

    for (let i = 0; i < batchSize; i++) {
        let snowflake = document.createElement("div");
        snowflake.classList.add("flake");
        snowflake.style.left = Math.random() * 100 + "vw";
        const duration = 5 + Math.random() * 5; 
        snowflake.style.animationDuration = duration + "s";
        snowflake.style.opacity = Math.random() * 0.5 + 0.5; 
        snowflake.style.fontSize = 10 + Math.random() * 20 + "px";
        snowflake.innerHTML = "❄";
        snowContainer.appendChild(snowflake);
        
        setTimeout(() => {
            snowflake.remove();
        }, duration * 1000); 
    }
}
document.getElementById("snowbutton").addEventListener("click", function() {
    if (this.classList.contains('snow-active')) {
        return; 
    }
    this.classList.add('snow-active'); 
    generateSnowBatch();
    setInterval(generateSnowBatch, 1500); 
});

const P1 = { x: 50, y: 0 }; 
const P2 = { x: 15, y: 80 }; 
const P3 = { x: 85, y: 80 }; 

const colors = ['#ff5252', '#ffd700', '#00eb76', '#f7407d', '#8344f1'];
function getRandomPointInTriangle(p1, p2, p3) {
    let r1 = Math.random();
    let r2 = Math.random();

    if (r1 + r2 > 1) {
        r1 = 1 - r1;
        r2 = 1 - r2;
    }

    const x = p1.x + r1 * (p2.x - p1.x) + r2 * (p3.x - p1.x);
    const y = p1.y + r1 * (p2.y - p1.y) + r2 * (p3.y - p1.y);
    
    return { x, y };
}

function placeLights() {
    const treeContainer = document.querySelector(".tree-container");
    const numberOfLights = 18; 

    for (let i = 0; i < numberOfLights; i++) {
        const { x, y } = getRandomPointInTriangle(P1, P2, P3);
        const lightDiv = document.createElement("div");
        
        lightDiv.classList.add("light");
        lightDiv.style.left = `${x}%`;
        lightDiv.style.top = `${y}%`;
        lightDiv.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        lightDiv.style.animationDelay = `${Math.random() * 2}s`;
        lightDiv.style.zIndex = "99";
        treeContainer.appendChild(lightDiv);
    }
}

document.addEventListener("DOMContentLoaded", placeLights);

