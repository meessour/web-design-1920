const navigateLeftKeys = ["ArrowLeft", "KeyA", "Numpad4"];
const navigateUpKeys = ["ArrowUp", "KeyW", "Numpad8"];
const navigateRightKeys = ["ArrowRight", "KeyD", "Numpad6"];
const navigateDownKeys = ["ArrowDown", "KeyS", "Numpad2"];
const grabItemKeys = ["Enter", "Space", "Numpad0", "Numpad5", "NumpadEnter"];
const cancelActionKeys = ["Escape", "NumpadSubtract", "Backspace"];

const boardIds = ["todo-board", "doing-board", "verify-board", "done-board"];

let currentFocusedBoardId;
let currentFocusedBoardNode;
let currentFocusedItemNode;

let currentLiftedItemNode;
let currentHoveredBoardNode;

const todoBoardNode = document.getElementById("todo-board").getElementsByClassName("board")[0];
const doingBoardNode = document.getElementById("doing-board").getElementsByClassName("board")[0];
const verifyBoardNode = document.getElementById("verify-board").getElementsByClassName("board")[0];
const doneBoardNode = document.getElementById("done-board").getElementsByClassName("board")[0];

const boardNodes = [todoBoardNode, doingBoardNode, verifyBoardNode, doneBoardNode];

let todoBoardFirstNodeChild = todoBoardNode.firstElementChild;
let doingBoardFirstNodeChild = doingBoardNode.firstElementChild;
let verifyBoardFirstNodeChild = verifyBoardNode.firstElementChild;
let doneBoardFirstNodeChild = doneBoardNode.firstElementChild;

// var box1 = document.getElementById("demo") = "Hello World";
document.addEventListener('focusin', function (e) {
    try {
        const currentBoardId = e.target.parentNode.parentNode.id;

        currentFocusedBoardNode = e.target.parentNode;
        console.log("currentFocusedBoardNode", currentFocusedBoardNode)
        currentFocusedItemNode = e.target;

        if (boardIds.includes(currentBoardId))
            currentFocusedBoardId = currentBoardId;
    } catch (e) {
        console.log("Selected item is not in a board", e)
    }
});

setInitialFocus();
setFirstNodeChildForBoards();

document.addEventListener("keydown", event => {
    console.log("event.code", event.code);

    // Checks for a bug, not sure what it does
    if (event.isComposing || event.keyCode === 229)
        return;

    // Set the first item nodes for every board
    setFirstNodeChildForBoards();

    // Grab
    if (grabItemKeys.includes(event.code) || currentLiftedItemNode) {
        if (grabItemKeys.includes(event.code) && currentLiftedItemNode) {
            console.log("Drop")
            dropItem();
        } else if (navigateRightKeys.includes(event.code) && currentLiftedItemNode) {
            console.log("over board on right")
            hoverItemOverBoardOnRight();
        } else if (navigateLeftKeys.includes(event.code) && currentLiftedItemNode) {
            console.log("over board on left")

            hoverItemOverBoardOnLeft();
        } else if (cancelActionKeys.includes(event.code) && currentLiftedItemNode) {
            console.log("Cancel")
            // returnItem();
        } else if (grabItemKeys.includes(event.code)) {
            console.log("Lift");

            grabItem();
        }

        // Navigate left
    } else if (navigateLeftKeys.includes(event.code)) {
        navigateToNodeOnLeft();

        // Navigate right
    } else if (navigateRightKeys.includes(event.code)) {
        navigateToNodeOnRight();

        // Navigate down
    } else if (navigateDownKeys.includes(event.code)) {
        navigateToNodeBelow();

        // Navigate up
    } else if (navigateUpKeys.includes(event.code)) {
        navigateToNodeAbove();
    }
});

function setFirstNodeChildForBoards() {
    try {
        todoBoardFirstNodeChild = todoBoardNode.firstElementChild;
        doingBoardFirstNodeChild = doingBoardNode.firstElementChild;
        verifyBoardFirstNodeChild = verifyBoardNode.firstElementChild;
        doneBoardFirstNodeChild = doneBoardNode.firstElementChild;
    } catch (e) {
        console.log("Couldn't set First Node Child For Boards", e)
    }
}

function navigateToNodeOnLeft() {
    if (currentFocusedBoardId && currentFocusedBoardId === "todo-board") {
        setFocusChronological([doneBoardFirstNodeChild, verifyBoardFirstNodeChild, doingBoardFirstNodeChild])
    } else if (currentFocusedBoardId && currentFocusedBoardId === "doing-board") {
        setFocusChronological([todoBoardFirstNodeChild, doneBoardFirstNodeChild, verifyBoardFirstNodeChild])
    } else if (currentFocusedBoardId && currentFocusedBoardId === "verify-board") {
        setFocusChronological([doingBoardFirstNodeChild, todoBoardFirstNodeChild, doneBoardFirstNodeChild])
    } else if (currentFocusedBoardId && currentFocusedBoardId === "done-board") {
        setFocusChronological([verifyBoardFirstNodeChild, doingBoardFirstNodeChild, todoBoardFirstNodeChild])
    } else {
        currentFocusedBoardId = "todo-board"
    }
}

function navigateToNodeOnRight() {
    if (currentFocusedBoardId && currentFocusedBoardId === "todo-board") {
        setFocusChronological([doingBoardFirstNodeChild, verifyBoardFirstNodeChild, doneBoardFirstNodeChild])
    } else if (currentFocusedBoardId && currentFocusedBoardId === "doing-board") {
        setFocusChronological([verifyBoardFirstNodeChild, doneBoardFirstNodeChild, todoBoardFirstNodeChild])
    } else if (currentFocusedBoardId && currentFocusedBoardId === "verify-board") {
        setFocusChronological([doneBoardFirstNodeChild, todoBoardFirstNodeChild, doingBoardFirstNodeChild])
    } else if (currentFocusedBoardId && currentFocusedBoardId === "done-board") {
        setFocusChronological([todoBoardFirstNodeChild, doingBoardFirstNodeChild, verifyBoardFirstNodeChild])
    } else {
        currentFocusedBoardId = "todo-board"
    }
}

function navigateToNodeAbove() {
    if (currentFocusedItemNode) {
        setFocusChronological([currentFocusedItemNode.previousElementSibling, currentFocusedItemNode.parentNode.lastElementChild]);
    }
}

function navigateToNodeBelow() {
    if (currentFocusedItemNode) {
        setFocusChronological([currentFocusedItemNode.nextElementSibling, currentFocusedItemNode.parentNode.firstElementChild]);
    }
}

function setFocusChronological(choices) {
    try {
        for (let i = 0; i < choices.length; i++) {
            if (choices[i]) {
                choices[i].focus();
                break;
            }
        }
    } catch (e) {
        console.log("Couldn't set focus on new item", e)
    }
}

function validFocusTarget(target) {
    if (target.parentNode.parentNode.id === "todo-board" ||
        target.parentNode.parentNode.id === "doing-board" ||
        target.parentNode.parentNode.id === "verify-board" ||
        target.parentNode.parentNode.id === "done-board")
        return true
}

function setInitialFocus() {
    const firstTabbableElement = document.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])')[0];
    firstTabbableElement.focus();
    currentFocusedItemNode = firstTabbableElement;
}

function grabItem() {
    console.log("Current board", currentFocusedBoardNode.parentNode.id)
    currentLiftedItemNode = currentFocusedItemNode;
    currentHoveredBoardNode = currentFocusedBoardNode;

    currentLiftedItemNode.classList.add("lifted");

    hoverItemOverCurrentBoard();
}

function dropItem() {
    currentHoveredBoardNode.appendChild(currentLiftedItemNode);
    currentLiftedItemNode.focus();

    removeAllBoardStyling();
    currentLiftedItemNode.classList.remove("lifted");

    currentFocusedBoardNode = currentHoveredBoardNode;
    currentFocusedBoardId = currentHoveredBoardNode.parentNode.id;

    currentHoveredBoardNode = undefined;
    currentLiftedItemNode = undefined;
}

function hoverItemOverCurrentBoard() {
    removeAllBoardStyling();

    currentHoveredBoardNode.classList.add("hovered");
}

function hoverItemOverBoardOnRight() {
    const selectedBoardNodePosition = boardNodes.indexOf(currentHoveredBoardNode);

    removeAllBoardStyling();

    selectedBoardNodePosition === boardNodes.length - 1 ?
        currentHoveredBoardNode = boardNodes[0] :
        currentHoveredBoardNode = boardNodes[selectedBoardNodePosition + 1];

    currentHoveredBoardNode.classList.add("hovered");
}

function hoverItemOverBoardOnLeft() {
    const selectedBoardNodePosition = boardNodes.indexOf(currentHoveredBoardNode);

    removeAllBoardStyling();

    selectedBoardNodePosition === 0 ?
        currentHoveredBoardNode = boardNodes[(boardNodes.length - 1)] :
        currentHoveredBoardNode = boardNodes[selectedBoardNodePosition - 1];

    currentHoveredBoardNode.classList.add("hovered");
}

function removeAllBoardStyling() {
    boardNodes.forEach(boardNode => boardNode.classList.remove("hovered"));
}

// HTML_Drag_and_Drop_API - V Below here V

function dragstart(ev) {
    ev.dataTransfer.setData('application/drag-and-drop', ev.target.id);

    setTimeout(() => ev.target.closest('.box').className = "box-skeleton", 0);
}

function dragend(ev) {
    setTimeout(() => ev.target.closest('.box-skeleton').className = "box", 0);
}

function dragover(ev) {
    ev.preventDefault();

    ev.target.closest('.board').classList.add("hovered");
}

function dragenter(ev) {
    ev.preventDefault();

    ev.target.closest('.board').classList.add("hovered");
}

function dragleave(ev) {
    ev.target.closest('.board').classList.remove("hovered");
}

function drop(ev) {
    ev.preventDefault();

    ev.target.closest('.board').classList.remove("hovered");

    const item = ev.dataTransfer.getData('application/drag-and-drop');

    if (item) {
        ev.target.closest('.board').appendChild(document.getElementById(item));
    }
}
