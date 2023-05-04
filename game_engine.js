let xPos = -100;
let maxSpeed = 8;
let xSpeed = 0;
let yPos = 0;
let ySpeed = 0;
let rightPressed = false;
let leftPressed = false;
let spacePressed = false;
let direction = 'right';

const main = () => {
    const assetsDiv = document.createElement('div');
    assetsDiv.id = 'svgAssets';
    assetsDiv.style = 'display:none;widht:0px;height:0px;position:absolute;';
    const stickManImage = document.createElement('img');
    stickManImage.id = 'stickFigureImg';
    stickManImage.style.position = 'absolute';
    document.body.appendChild(assetsDiv);
    document.body.appendChild(stickManImage);
    stickManImage.style.bottom = "0px";
    fetch('animated-svg-stickman/stick_man.svg').then(r => r.text()).then(text => {
        const stickFigureSvg = new DOMParser().parseFromString(text, "image/svg+xml");
        document.getElementById('svgAssets').appendChild(stickFigureSvg.lastChild);
    });
    fetch('animated-svg-stickman/stick_man_running_right.svg').then(r => r.text()).then(text => {
        const stickFigureSvg = new DOMParser().parseFromString(text, "image/svg+xml");
        document.getElementById('svgAssets').appendChild(stickFigureSvg.lastChild);
    });
    fetch('animated-svg-stickman/stick_man_running_left.svg').then(r => r.text()).then(text => {
        const stickFigureSvg = new DOMParser().parseFromString(text, "image/svg+xml");
        document.getElementById('svgAssets').appendChild(stickFigureSvg.lastChild);
    });
    fetch('animated-svg-stickman/stick_man_crouching_left.svg').then(r => r.text()).then(text => {
        const stickFigureSvg = new DOMParser().parseFromString(text, "image/svg+xml");
        document.getElementById('svgAssets').appendChild(stickFigureSvg.lastChild);
    });
    fetch('animated-svg-stickman/stick_man_crouching_right.svg').then(r => r.text()).then(text => {
        const stickFigureSvg = new DOMParser().parseFromString(text, "image/svg+xml");
        document.getElementById('svgAssets').appendChild(stickFigureSvg.lastChild);
    });
    setInterval('render()', 10);
    rightPressed = true;
    setTimeout(() => { rightPressed = false; }, 600);
}

document.addEventListener('keydown', (event) => {
    if (event.code == 'Space') {
        console.log('pressed space');
        spacePressed = true;
    }
    if (event.key == 'a' || event.key == 'ArrowLeft') {
        console.log('pressed a');
        leftPressed = true;
    } else if (event.key == 'd' || event.key == 'ArrowRight') {
        console.log('pressed d');
        rightPressed = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.code == 'Space') {
        spacePressed = false;
        jump();
    }
    if (event.key == 'a' || event.key == 'ArrowLeft') {
        leftPressed = false;
    }
    if (event.key == 'd' || event.key == 'ArrowRight') {
        rightPressed = false;
    }
});

const jump = () => {
    ySpeed = 90;
}

const gravity = () => {
    if (ySpeed > -5000) {
        ySpeed = ySpeed - 2.7;
    }
}

const resizeStickFigure = (stickFigureImg) => {
    const height = window.innerHeight;
    stickFigureImg.width = height * 0.2;
    stickFigureImg.height = height * 0.2;
    return stickFigureImg;
}

const calculateBottomCoordinate = (stickFigureImg) => {
    const newYPos = yPos + ySpeed;
    if (newYPos < 0) {
        return 0;
    } else {
        return newYPos;
    }
}

const slowDownX = () => {
    if (xSpeed > 0)
        xSpeed = xSpeed - 1;
    if (xSpeed < 0)
        xSpeed = xSpeed + 1;
}

const render = () => {
    const runnningStickFigureRightSvg = document.getElementById('runningSvgRight');
    const runningStickFigureLeftSvg = document.getElementById('runningSvgLeft');
    const stillStickFigureSvg = document.getElementById('stillSvg');
    const crouchingStickFigureLeftSvg = document.getElementById('crouchingSvgLeft');
    const crouchingStickFigureRightSvg = document.getElementById('crouchingSvgRight');
    let stickFigure = document.getElementById("stickFigureImg");
    xPos = xPos + xSpeed;
    if (rightPressed) {
        direction = 'right';
        xSpeed = Math.min(xSpeed + 1, 1 * maxSpeed);
        const xml = (new XMLSerializer).serializeToString(runnningStickFigureRightSvg);
        stickFigure.src = 'data:image/svg+xml;base64,' + btoa(xml);
    }
    if (leftPressed) {
        direction = 'left';
        xSpeed = Math.max(xSpeed - 1, -1 * maxSpeed);
        const xml = (new XMLSerializer).serializeToString(runningStickFigureLeftSvg);
        stickFigure.src = 'data:image/svg+xml;base64,' + btoa(xml);
    }
    if (!leftPressed && !rightPressed) {
        slowDownX();
        const xml = (new XMLSerializer).serializeToString(stillStickFigureSvg);
        stickFigure.src = 'data:image/svg+xml;base64,' + btoa(xml);
    }
    if (spacePressed && direction === 'left') {
        console.log('leftCrouch');
        const xml = (new XMLSerializer).serializeToString(crouchingStickFigureLeftSvg);
        stickFigure.src = 'data:image/svg+xml;base64,' + btoa(xml);
    }
    if (spacePressed && direction === 'right') {
        console.log('rightCrouch');
        const xml = (new XMLSerializer).serializeToString(crouchingStickFigureRightSvg);
        stickFigure.src = 'data:image/svg+xml;base64,' + btoa(xml);
    }
    gravity();
    stickFigure = resizeStickFigure(stickFigure);
    stickFigure.style.bottom = calculateBottomCoordinate(stickFigure) + "px";
    stickFigure.style.left = xPos + "px";
};

main();