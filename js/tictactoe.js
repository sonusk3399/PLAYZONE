let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

// Winning patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Enable all boxes // sara box ko khale krne ka liye
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("winner");
        box.style.color = "";
    });
};

// Disable all boxes  ye use hwa qki winnig ka bad vi kaam ho rha tha to usko rokne ka liye
const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true; //click hone pe ek bar he kaam krga
    });
};

// Reset game
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Show winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Check winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (
            pos1val !== "" &&
            pos1val === pos2val &&
            pos2val === pos3val
        ) {
            // Highlight the winning boxes
            pattern.forEach((index) => {
                boxes[index].classList.add("winner");
            });

            showWinner(pos1val);
            return true;
        }
    }

    return false;
};

// Box click event
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.disabled) return;

        if (turnO) {
            box.innerText = "O";
            box.style.color = "#0077ff";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "#b0413e";
            turnO = true;
        }

        box.disabled = true; // dubra click nhi hoga 
        count++;

        if (checkWinner()) {
            return;
        }

        // Draw condition
        if (count === 9) {
            msg.innerText = "It's a Draw!";
            msgContainer.classList.remove("hide");
            disableBoxes();
        }
    });
});

// Buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);