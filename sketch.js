let baseWidth;
let scaleFactor = 1;
let dWidth = 355;
let heightD = 250;
let x, y;
let collapseAmount = 0;
let collapsing = false;
let expanding = false;
let colorChange = false;
let colors, colorIndex;
let baseColor, bgColor;
let words = ["2025  SENIORS", "LIAM  ARCH", "FIONA  ARMSTRONG","CLARA  BUTCHER", "GENEVIEVE  CARSTENSEN", "SPROUT  DICKERSON", "CECI  FOLEY", "SARAH  GLENN", "ABIGAIL  HOLEMAN", "STEPHANIE  IJOMA", "RYLEY  IRWIN", "FAITH  JESTER", "JOY  KAPLAN", "LETICIA  K CLAUSEN", "SARAH  KOLESAR", "MADDIE  MARQUESS", "HANNAH  MCCONIHE", "ALEX  MILLER", "ABIGAIL  MYERS", "KATIA  MZEHEM", "JACOB  NICHOLSON", "AUDREY  PIERSON", "MADELYN  POWELL", "BROOKE  REPASKY", "IVY  RYAN", "HANNA  SALCIUS", "BRENT  SANDERSON", "LUCILLE  SCHNEIDER", "MADDY  SMITH", "SYDNEE  TIRRI", "JILLIAN  WILSON"];



let currentWord = 0;
let nextWord = 0;
let easingFactor = 0.4;
let myFont;
let textPositions = [];
let scrollInterval;
let canvasContainer;
let p5pic = [];
let currentBio = 0;
let nextBio = 0;


function preload() {
  myFont = loadFont('Fonts/Thunder-ExtraBoldLC.otf');

}

function setup() {
  console.log(biosStored); 
  document.body.style.overflow = 'hidden'; 
  p5pic[1]  = loadImage("p5pic/LiamArch.png");  
  p5pic[2]  = loadImage("p5pic/Fiona Armstrong 2.png");
  p5pic[3]  =loadImage("p5pic/ClaraButcher.png");
  p5pic[4]  = loadImage("p5pic/GenevieveCarstensen.png");
  p5pic[5]  = loadImage("p5pic/SproutDickerson.png");
  p5pic[6]  =loadImage("p5pic/CeciFoley.png");
  p5pic[7]  = loadImage("p5pic/SarahGlenn.png");
  p5pic[8]  = loadImage("p5pic/Abigail Holeman cutout.png"); 
  p5pic[9]  =loadImage("p5pic/Stephanie Ijoma 1.png");
  p5pic[10]  = loadImage("p5pic/RyleyIrwin.png");
  p5pic[11]  = loadImage("p5pic/FaithJester.png");
  p5pic[12]  = loadImage("p5pic/JoyKaplan.png");
  p5pic[13]  =loadImage("p5pic/LeticiaKesterkeClausen.png");
  p5pic[14]  = loadImage("p5pic/SarahKolesar.png");
  p5pic[15]  =loadImage("p5pic/MaddieMarquess.png");
  p5pic[16]  = loadImage("p5pic/HannahMcConihe.png");
  p5pic[17]  = loadImage("p5pic/AlexMiller.png");
  p5pic[18]  = loadImage("p5pic/AbigailMyers.png");
  p5pic[19]  = loadImage("p5pic/KatiaMzehem.png");
  p5pic[20]  = loadImage("p5pic/JacobNicholson.png");
  p5pic[21]  = loadImage("p5pic/Audrey Pierson 1.png");
  p5pic[22]  = loadImage("p5pic/Madelyn Powell 1.png");
  p5pic[23]  = loadImage("p5pic/Brooke Repasky 1.png");
  p5pic[24]  = loadImage("p5pic/IvyRyan.png");
  p5pic[25]  = loadImage("p5pic/HannaSalcius.png");
  p5pic[26]  = loadImage("p5pic/BrentSanderson.png");
  p5pic[27]  = loadImage("p5pic/LucilleSchneider.png");
  p5pic[28]  = loadImage("p5pic/Maddy Smith 1.png");
  p5pic[29]  = loadImage("p5pic/Sydnee Tirri 1.png");
  p5pic[30]  = loadImage("p5pic/JillianWilson.png");
  

  // Create div container for canvas
  canvasContainer = createDiv();
  canvasContainer.id("canvas-container");
  canvasContainer.style("display", "flex");
  canvasContainer.style("justify-content", "center");
  canvasContainer.style("align-items", "center");
  canvasContainer.style("width", "100vw");
  canvasContainer.style("height", "750px");
  canvasContainer.style("position", "absolute");
  canvasContainer.style("top", "120px");
  canvasContainer.style("left", "0");


  let canvas = createCanvas(canvasContainer.width, canvasContainer.height);
  canvas.parent(canvasContainer); // Attach canvas to container
  canvasContainer.parent(document.body); // Attach container to body



  function removeSketch() {
    if (canvasContainer) {
        canvasContainer.remove(); // Remove canvas container
        canvasContainer = null;
    }
    remove(); // Remove the p5 instance
}

  x = 420;
  y = 80;

  colors = [
    color(93, 74, 226), // blue
    color(237, 111, 244), // pink
    color(29, 224, 207) // green
  ];

  colorIndex = 0;
  baseColor = colors[colorIndex];
  bgColor = baseColor;

  textFont(myFont);
  createButtons();
  

}

function createButtons() {
  // Create a container div for the buttons at the bottom of the page
  let buttonContainer = createDiv('');
  buttonContainer.position(0, windowHeight - 120);
  buttonContainer.style('width', '100%');
  buttonContainer.style('display', 'flex');
  buttonContainer.style('justify-content', 'center');
  buttonContainer.style('align-items', 'center');
  buttonContainer.style('gap', '40px');
  buttonContainer.style('z-index', '100');
  
  // Create the buttons
  let leftButton = createButton("");
  let rightButton = createButton("");

  
  // Append buttons to the container instead of positioning them absolutely
  leftButton.parent(buttonContainer);
  rightButton.parent(buttonContainer);

  
  // Add event listeners
  leftButton.mousePressed(() => startScrolling(-1));
  leftButton.mouseReleased(stopScrolling);
  rightButton.mousePressed(() => startScrolling(1));
  rightButton.mouseReleased(stopScrolling);

  
  // Style for left arrow (←)
  leftButton.style("width", "60px");
  leftButton.style("height", "20px");
  leftButton.style("border", "none");
  leftButton.style("background", "none");
  leftButton.style("cursor", "pointer");
  leftButton.html(`
    <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="10" x2="55" y2="10" stroke="white" stroke-width="4" stroke-linecap="round"/>
      <polyline points="15,2 5,10 15,18" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>
  `);
  
  // Style for right arrow (→)
  rightButton.style("width", "60px");
  rightButton.style("height", "20px");
  rightButton.style("border", "none");
  rightButton.style("background", "none");
  rightButton.style("cursor", "pointer");
  rightButton.html(`
    <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="10" x2="55" y2="10" stroke="white" stroke-width="4" stroke-linecap="round"/>
      <polyline points="45,2 55,10 45,18" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>
  `);
  

  
  // Hover effects
  [leftButton, rightButton].forEach(button => {
    button.mouseOver(() => button.style("opacity", "0.7"));
    button.mouseOut(() => button.style("opacity", "1"));
  });
  
  return buttonContainer; // Return the container in case you need to reference it later
}



function startScrolling(direction) {
  changeWord(direction);
  scrollInterval = setInterval(() => changeWord(direction), 200);
}

function stopScrolling() {
  clearInterval(scrollInterval);
}

function changeWord(direction) {
  nextWord = (currentWord + direction + words.length) % words.length;
  collapsing = true;
}

function draw() {
  scale(1.2);
  background(bgColor);

  // Draw static elements
  fill(color(248, 248, 248));
  quad(30, 50, 170, 50, 145, 350, 55, 350);
  fill(bgColor);
  quad(90, 50, 110, 50, 104, 260, 100, 260);
  
  fill(color(248, 248, 248));
  rect(200, 50, 160, 300, 80);
  fill(bgColor);
  rect(270, 120, 20, 160, 10);
  stroke(bgColor);
  strokeWeight(14);
  line(290, 195, 365, 195);

  // Handle collapse/expand animation
  if (collapsing) {
    collapseAmount += (dWidth - collapseAmount) * easingFactor;
    if (collapseAmount >= dWidth - 1) {
      collapseAmount = dWidth + 1;
      collapsing = false;
      colorChange = true;
    }
  } else if (colorChange) {
    currentWord = nextWord;
    colorIndex = (colorIndex + 1) % colors.length;
    baseColor = colors[colorIndex];
    bgColor = baseColor;
    colorChange = false;
    expanding = true;
  } else if (expanding) {
    collapseAmount -= collapseAmount * easingFactor;
    if (collapseAmount <= 1) {
      collapseAmount = 0;
      expanding = false;
    }
  }
  

  // Reset stroke for text
  strokeWeight(0);
  textAlign(LEFT, CENTER);

  let textX = x + dWidth / 8;
  let textY = y + heightD / 3;
  let textHeight = 60;

  textPositions = [];
  cursor(ARROW);

  // Draw the text AFTER the rectangle, so it's covered when collapsing
  fill(baseColor);
  stroke(color(248, 248, 248));
  strokeWeight(45);
  rect(x, y, dWidth - collapseAmount, heightD, 0, 20, 20, 0);
  strokeWeight(0);
  

  if (words[currentWord] !== "BFA SHOWCASE") {
    let nameParts = words[currentWord].split("  ");
    let isHovered = isMouseOver(textX, textY, textWidth(words[currentWord]), textHeight);

    if (isHovered) {
      cursor(HAND);
    }

    fill(isHovered ? color(12, 14, 20) : color(248, 248, 248));
    textSize(90);
    text(nameParts[0], textX - 10, textY + 15);
    textPositions.push({ x: textX, y: textY, w: textWidth(nameParts[0]), h: textHeight });

    if (nameParts.length > 1) {
      textSize(60);
      text(nameParts[1], textX - 10, textY + 85);
      textPositions.push({ x: textX, y: textY + 95, w: textWidth(nameParts[1]), h: textHeight });
    }
  }

  
  fill(baseColor);
  rect(x - collapseAmount + dWidth, y, dWidth, heightD, 0, 20, 20, 0);

  strokeWeight(40);
  line(x + dWidth - collapseAmount, y + 10, x + dWidth - collapseAmount, y + heightD - 10);
  strokeWeight(0);
  fill(color(248,248,248));
  
  textSize(35)
  
     fill(color(248, 248, 248));
  textSize(35);

    let bioIndex = currentWord // Align words index to biosStored array
    if (bioIndex < biosStored.length) {
        let bioParts = biosStored[bioIndex].split("  "); // Split bio text at double spaces
        
        textAlign(LEFT, TOP);
        let bioX = dWidth + dWidth + 100;
        let bioY = y ;
        let lineSpacing = 50; // Adjust for better readability
        
        for (let i = 0; i < bioParts.length; i++) {
            if (i === 0) {
                // First part (e.g., "BIO: Name") styled differently
                textLeading(18)
                textSize(35);
                textFont(myFont); // Use main font
                fill(248, 248, 248);
            } else {
         
                // Other parts (regular bio text)
                textSize(11);
                textFont('Arial'); // Change to a different font if needed
            }
            text(bioParts[i], bioX, bioY + i * lineSpacing, 350); // Draw each part on a new line
        }
    
}

  textFont(myFont); 
  
  scale(1.5);

  // Left rectangle for p5pic
let imgX = 10 - collapseAmount;
let imgY = y;
let rectW = heightD - 5; // Width of the rectangle
let rectH = dWidth; // Height of the rectangle

if (currentWord > 0) { // To avoid trying to access an index that doesn't exist
  let imgIndex = currentWord;
  if (imgIndex < p5pic.length && p5pic[imgIndex]) {
    let img = p5pic[imgIndex];
    let imgAspect = img.width / img.height;
    let rectAspect = rectW / rectH;

    let drawW, drawH;
    if (imgAspect > rectAspect) {
      // Image is wider, scale based on width
      drawW = rectW;
      drawH = rectW / imgAspect;
    } else {
      // Image is taller, scale based on height
      drawH = rectH;
      drawW = rectH * imgAspect;
    }

    // Center the image within the rectangle
    let imgCenterX = imgX + rectW / 2;
    let imgCenterY = imgY + rectH / 2;

    imageMode(CENTER);
    image(img, imgCenterX, imgCenterY, drawW, drawH);
    imageMode(CORNER); // Reset to default
  } else {
    fill(50); // Placeholder color if no image exists
    rect(imgX, imgY, rectW, rectH, 0, 20, 20, 0);
  }
}
}



function isMouseOver(x, y, w, h) {
  return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}

function mousePressed() {
  for (let pos of textPositions) {
    if (isMouseOver(pos.x, pos.y, pos.w, pos.h)) {
      let cleanName = words[currentWord].replace(/\s+/g, "_").toLowerCase();
      let url = cleanName + ".html";
      window.open(url, "_blank");
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, 750);
}
