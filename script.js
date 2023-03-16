document.addEventListener("DOMContentLoaded", function () {
    const cards = [
        { url: "", found: false },
        { url: "", found: false },
        { url: "", found: false },
        { url: "", found: false },
        { url: "", found: false },
        { url: "", found: false },
        { url: "", found: false },
        { url: "", found: false },
    ].concat(
        [
            { url: "", found: false },
            { url: "", found: false },
            { url: "", found: false },
            { url: "", found: false },
            { url: "", found: false },
            { url: "", found: false },
            { url: "", found: false },
            { url: "", found: false },
        ]
    );

    let capturedImages = 0;
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const captureButton = document.getElementById("capture-button");

    let firstCard = null;
    let secondCard = null;
    let busy = false;

    async function initializeCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
        } catch (err) {
            alert("Error accessing camera: " + err.message);
        }
    }

function captureImage() {
    if (capturedImages >= 8) {
        alert("You have already captured 8 images. Start the game!");
        return;
    }

    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    const imageUrl = canvas.toDataURL("image/png");
    cards[capturedImages].url = imageUrl;
    cards[capturedImages + 8].url = imageUrl;

    capturedImages++;

    if (capturedImages === 8) {
        alert("8 images captured. You can start the game!");
        buildBoard();
        captureButton.style.display = "none"; // Add this line to hide the capture button
        video.style.display = "none"; // Hide the video element
        canvas.style.display = "none"; // Hide the canvas element
    }
}


    function shuffle(array) {
        let currentIndex = array.length,
            temporaryValue,
            randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function buildBoard() {
        const gameBoard = document.getElementById("game-board");
        const shuffledCards = shuffle(cards);

        shuffledCards.forEach((card, index) => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");
            cardElement.addEventListener("click", () => onCardClick(card, cardElement));

            const cardImage = document.createElement("img");
            cardImage.classList.add("card-image");
            cardImage.src = card.url;

            cardElement.appendChild(cardImage);
            gameBoard.appendChild(cardElement);
        });
    }

    function onCardClick(card, cardElement) {
        if (busy || card.found || cardElement.classList.contains("open")) return;

        cardElement.classList.add("open");

        if (!firstCard) {
            firstCard = { card: card, element: cardElement };
        } else {
            secondCard = { card: card, element: cardElement };
            checkForMatch();
        }
    }

    function checkForMatch() {
        busy = true;

        if (firstCard.card.url === secondCard.card.url) {
           
            firstCard.card.found = true;
            secondCard.card.found = true;
            firstCard = null;
            secondCard = null;
            busy = false;
            checkForGameOver();
        } else {
            setTimeout(() => {
                firstCard.element.classList.remove("open");
                secondCard.element.classList.remove("open");
                firstCard = null;
                secondCard = null;
                busy = false;
            }, 1000);
        }
    }

    function checkForGameOver() {
        const unmatchedCards = cards.filter(card => !card.found);

        if (unmatchedCards.length === 0) {
            setTimeout(() => {
                alert("Congratulations! You've found all the matches!");
                location.reload();
            }, 500);
        }
    }

    // Add event listener for the capture button
    captureButton.addEventListener("click", captureImage);

    // Call initializeCamera to request camera access
    initializeCamera();
});
