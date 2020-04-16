const navigateLeftKeys = ["ArrowLeft", "KeyH"];
const navigateUpKeys = ["ArrowUp", "KeyK"];
const navigateRightKeys = ["ArrowRight", "KeyL"];
const navigateDownKeys = ["ArrowDown", "KeyJ"];
const grabItemKeys = ["Enter", "Space", "NumpadEnter"];

// Has to be in chronological order
const boardIds = ["todo-board", "doing-board", "verify-board", "done-board"];

let currentFocusedBoardId;
let currentFocusedBoardNode;
let currentFocusedItemNode;

let currentLiftedItemNode;

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
        console.log("currentFocusedBoardNode", currentFocusedBoardNode);
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
            dropItem();
        } else if (navigateRightKeys.includes(event.code) && currentLiftedItemNode) {
            moveItemToRight();
        } else if (navigateLeftKeys.includes(event.code) && currentLiftedItemNode) {
            moveItemToLeft();
        } else if (navigateDownKeys.includes(event.code) && currentLiftedItemNode) {
            moveItemDown();
        } else if (navigateUpKeys.includes(event.code) && currentLiftedItemNode) {
            moveItemUp();
        } else if (grabItemKeys.includes(event.code)) {
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


function setInitialFocus() {
    const firstTabbableElement = document.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])')[0];
    firstTabbableElement.focus();
    currentFocusedItemNode = firstTabbableElement;
}

function grabItem() {
    currentLiftedItemNode = currentFocusedItemNode;

    currentLiftedItemNode.classList.add("lifted");
}

function dropItem() {
    if (currentLiftedItemNode)
        currentLiftedItemNode.classList.remove("lifted");

    currentLiftedItemNode = undefined;
}

function moveItemUp() {
    const previousItem = currentLiftedItemNode.previousElementSibling;

    if (previousItem)
        currentFocusedBoardNode.insertBefore(currentLiftedItemNode, previousItem);

    currentLiftedItemNode.focus();
}

function moveItemDown() {
    const nextItem = currentLiftedItemNode.nextElementSibling;

    if (nextItem)
        // https://stackoverflow.com/a/4793630/11119707
        currentFocusedBoardNode.insertBefore(currentLiftedItemNode, nextItem.nextElementSibling);

    currentLiftedItemNode.focus();
}

function moveItemToRight() {
    const selectedBoardNodePosition = boardNodes.indexOf(currentFocusedBoardNode);

    selectedBoardNodePosition === boardNodes.length - 1 ?
        currentFocusedBoardNode = boardNodes[0] :
        currentFocusedBoardNode = boardNodes[selectedBoardNodePosition + 1];

    currentFocusedBoardNode.appendChild(currentLiftedItemNode);
    currentLiftedItemNode.focus();
}

function moveItemToLeft() {
    const selectedBoardNodePosition = boardNodes.indexOf(currentFocusedBoardNode);

    selectedBoardNodePosition === 0 ?
        currentFocusedBoardNode = boardNodes[(boardNodes.length - 1)] :
        currentFocusedBoardNode = boardNodes[selectedBoardNodePosition - 1];

    currentFocusedBoardNode.appendChild(currentLiftedItemNode);
    currentLiftedItemNode.focus();
}

// HTML_Drag_and_Drop_API with mouse - V Below here V

function dragstart(ev) {
    dropItem();
    ev.dataTransfer.setData('application/drag-and-drop', ev.target.id);

    setTimeout(() => ev.target.closest('.box').className = "box-skeleton", 0);
}

function dragend(ev) {
    dropItem();
    setTimeout(() => ev.target.closest('.box-skeleton').className = "box", 0);
}

function dragover(ev) {
    dropItem();
    ev.preventDefault();

    ev.target.closest('.board').classList.add("hovered");
}

function dragenter(ev) {
    dropItem();
    ev.preventDefault();

    ev.target.closest('.board').classList.add("hovered");
}

function dragleave(ev) {
    dropItem();
    ev.target.closest('.board').classList.remove("hovered");
}

function drop(ev) {
    dropItem();
    ev.preventDefault();

    ev.target.closest('.board').classList.remove("hovered");

    const item = ev.dataTransfer.getData('application/drag-and-drop');

    if (item) {
        ev.target.closest('.board').appendChild(document.getElementById(item));
    }
}
