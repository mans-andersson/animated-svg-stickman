let xPos = 100;
let maxSpeed = 8;
let xSpeed = 0;
let rightPressed = false;
let leftPressed = false;

const main = () => {
    const assetsDiv = document.createElement('div');
    assetsDiv.id = 'svgAssets';
    assetsDiv.style = 'display:none;widht:0px;height:0px;position:absolute;';
    const stickManImage = document.createElement('img');
    stickManImage.id = 'stickFigureImg';
    stickManImage.style.position = 'absolute';
    document.body.appendChild(assetsDiv);
    document.body.appendChild(stickManImage);
    fetch('stick_man.svg').then(r => r.text()).then(text => {
        const stickFigureSvg = new DOMParser().parseFromString(text, "image/svg+xml");
        document.getElementById('svgAssets').appendChild(stickFigureSvg.lastChild);
    });
    fetch('stick_man_running_right.svg').then(r => r.text()).then(text => {
        const stickFigureSvg = new DOMParser().parseFromString(text, "image/svg+xml");
        document.getElementById('svgAssets').appendChild(stickFigureSvg.lastChild);
    });
    fetch('stick_man_running_left.svg').then(r => r.text()).then(text => {
        const stickFigureSvg = new DOMParser().parseFromString(text, "image/svg+xml");
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

const resizeStickFigure = (stickFigureImg)  => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    console.log(height);
    stickFigureImg.width = height * 0.2;
    stickFigureImg.height = height * 0.2;
    stickFigureImg.style.top = height - stickFigureImg.height;
    return stickFigureImg;
}

const slowDownX = () => {
    if (xSpeed > 0)
        xSpeed = xSpeed - 1;
    if (xSpeed < 0)
        xSpeed = xSpeed + 1;
 }
const render = () => {
 console.log('render');
 const runnningStickFigureRightSvg = document.getElementById('runningSvgRight');
 const runningStickFigureLeftSvg = document.getElementById('runningSvgLeft');
 const stillStickFigureSvg = document.getElementById('stillSvg');
 let stickFigure = document.getElementById("stickFigureImg");
 xPos = xPos + xSpeed;
 if (rightPressed) {
    xSpeed = Math.min(xSpeed + 1,1 * maxSpeed);
    const xml = (new XMLSerializer).serializeToString(runnningStickFigureRightSvg);
    stickFigure.src = 'data:image/svg+xml;base64,' + btoa(xml);
 }
 if (leftPressed) {
    xSpeed = Math.max(xSpeed - 1,-1 * maxSpeed);
    const xml = (new XMLSerializer).serializeToString(runningStickFigureLeftSvg);
    stickFigure.src = 'data:image/svg+xml;base64,' + btoa(xml);
 }
 if (!leftPressed && !rightPressed) {
    slowDownX();
    const xml = (new XMLSerializer).serializeToString(stillStickFigureSvg);
    stickFigure.src = 'data:image/svg+xml;base64,' + btoa(xml);
 }
 stickFigure = resizeStickFigure(stickFigure);
 stickFigure.style.left = xPos;
};

main();