let xPos = 100;
let maxSpeed = 5;
let xSpeed = 0;
let rightPressed = false;
let leftPressed = false;
let stickFigureSvg;

const main = () => {
    const assetsDiv = document.createElement('div');
    assetsDiv.id = 'svgAssets';
    assetsDiv.style = 'display:none;widht:0px;height:0px;positionn:absolute;';
    document.body.appendChild(assetsDiv);
    fetch('wip.svg').then(r => r.text()).then(text => {
        stickFigureSvg = new DOMParser().parseFromString(text, "image/svg+xml");
        document.getElementById('svgAssets').appendChild(stickFigureSvg.lastChild);
    });
    setInterval('render()', 10);
}

document.addEventListener('keydown', (event) => {
     if (event.key == 'a') {
         console.log('pressed a');
         leftPressed = true;
     } else if (event.key == 'd') {
         console.log('pressed d');
         rightPressed = true;
     }
});

document.addEventListener('keyup', (event) => {
    if (event.key == 'a') {
         leftPressed = false;
    } else if (event.key == 'd') {
         rightPressed = false;
    }
});

const slowDownX = () => {
     if (xSpeed > 0)
         xSpeed = xSpeed - 1;
     if (xSpeed < 0)
         xSpeed = xSpeed + 1;
 }
const render = () => {
 console.log('render');
 const runnningStickFigureSvg = document.getElementById('runningSvg');
 console.log(runnningStickFigureSvg);
 const stickFigure = document.getElementById("stickFigure");
 const xml = (new XMLSerializer).serializeToString(runnningStickFigureSvg);
 stickFigure.src = "data:image/svg+xml;base64," + btoa(xml);
 xPos = xPos + xSpeed;
 if (rightPressed) {
     xSpeed = Math.min(xSpeed + 1,1*maxSpeed);
 }
 if (leftPressed) {
     xSpeed = Math.max(xSpeed - 1,-1*maxSpeed);
 }
 if (!leftPressed && !rightPressed) {
     slowDownX();
 }
 stickFigure.style.left = xPos;
};

main();