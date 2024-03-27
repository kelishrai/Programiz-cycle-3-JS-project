import text from "./assets/text.js";

const sky = document.getElementById("sky");

let finished = false;

let speed = 30;
let textLength = 200;
let randomStartIndex = Math.floor(Math.random() * (text.length - 200));
let trimmedText = text.slice(randomStartIndex, randomStartIndex + textLength);

let tarzanStaggerFrames = 15;

const settingsButton = document.getElementById("settings-button");

settingsButton.addEventListener("click", () => {
    speed = document.getElementById("speed").value;
    tarzanStaggerFrames = Math.floor(speed / 1.5);
    textLength = document.getElementById("characters").value;
    randomStartIndex = Math.floor(Math.random() * (text.length - 200));
    trimmedText = text.slice(randomStartIndex, randomStartIndex + textLength);
});

const tarzan = document.getElementById("tarzan");
const tarzanC = tarzan.getContext("2d");
const tarzanWidth = (tarzan.width = 80);
const tarzanHeight = (tarzan.height = 50);
const tarzanImage = new Image();
tarzanImage.src = "assets/tarzan.png";
let nextTarzanImage = 0;
let tarzanGameFrame = 0;
function animateTarzan() {
    tarzanC.clearRect(0, 0, tarzanWidth, tarzanHeight);

    if (nextTarzanImage >= 0.85 * 6) nextTarzanImage = 0;
    tarzanC.drawImage(
        tarzanImage,
        tarzanWidth * nextTarzanImage,
        0,
        tarzanWidth,
        tarzanHeight,
        0,
        0,
        tarzanWidth,
        tarzanHeight
    );
    requestAnimationFrame(animateTarzan);
    tarzanGameFrame++;

    if (tarzanGameFrame % tarzanStaggerFrames == 0) nextTarzanImage += 0.85;
}

const orca = document.getElementById("orca");
const orcaC = orca.getContext("2d");
const orcaWidth = (orca.width = 200);
const orcaHeight = (orca.height = 90);
const orcaImage = new Image();
orcaImage.src = "assets/orca.png";
let nextOrcaImage = 0;
let orcaGameFrame = 0;
const orcaStaggerFrames = 15;
function animateOrca() {
    orcaC.clearRect(0, 0, orcaWidth, orcaHeight);

    if (nextOrcaImage >= 0.6 * 8) nextOrcaImage = 0;
    orcaC.drawImage(
        orcaImage,
        0,
        orcaHeight * nextOrcaImage,
        orcaWidth,
        orcaHeight,
        0,
        0,
        orcaWidth,
        orcaHeight
    );
    requestAnimationFrame(animateOrca);
    orcaGameFrame++;

    if (orcaGameFrame % orcaStaggerFrames == 0) nextOrcaImage += 0.8;
}

const textScreen = document.getElementById("text-screen");
const textArea = document.getElementById("typing-area");
let tarzanTop = 0;

textArea.addEventListener("focus", (event) => {
    console.log("Started");
    textScreen.textContent = trimmedText;
    const startTime = new Date().getTime();
    const inputChecker = () => {
        const inputText = textArea.value;
        if (
            inputText[inputText.length - 1] === trimmedText[inputText.length - 1]
        ) {
            tarzanTop -= 20;
            if (tarzanTop <= 0) tarzanTop = 0;
            tarzan.style.top = `${tarzanTop}px`;
            console.log(inputText[inputText.length - 1]);
        }

        if (inputText == trimmedText) {
            const endTime = new Date().getTime();
            const totalTime = (endTime - startTime) / 1000;
            console.log("finished");
            console.log(totalTime);
            textArea.removeEventListener("input", inputChecker);
            setTimeout(() => {
                location.reload();
            }, 2500);
            finished = true;
        }
    };
    textArea.addEventListener("input", inputChecker);

    const gameRun = setInterval(() => {
        if (finished) {
            document.getElementById("end-text").textContent = "Play Again?";
            setTimeout(() => {
                location.reload();
            }, 2500);
            clearInterval(gameRun);
        }

        if (tarzanTop <= 200) {
            tarzanTop += 1;
            tarzan.style.top = `${tarzanTop}px`;
        } else {
            orca.classList.add("orca-animation");
            orca.style.animationDelay = `{0}s`;
            finished = true;
        }
    }, speed);
});

animateOrca();
animateTarzan();
