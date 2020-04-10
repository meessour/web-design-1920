let focusedBox;
let currentFocusedItemNode;

const todoBoardNode = document.getElementById("todo-board").getElementsByClassName("board")[0];
const doingBoardNode = document.getElementById("doing-board").getElementsByClassName("board")[0];
const verifyBoardNode = document.getElementById("verify-board").getElementsByClassName("board")[0];
const doneBoardNode = document.getElementById("done-board").getElementsByClassName("board")[0];

// var box1 = document.getElementById("demo") = "Hello World";
document.addEventListener('focusin', function (e) {
    if (e.target.parentNode.parentNode.id === "todo-board") {
        focusedBox = "todo-board";
    } else if (e.target.parentNode.parentNode.id === "doing-board") {
        focusedBox = "doing-board";
    } else if (e.target.parentNode.parentNode.id === "verify-board") {
        focusedBox = "verify-board";
    } else if (e.target.parentNode.parentNode.id === "done-board") {
        focusedBox = "done-board";
    }
});

setInitialFocus();

document.addEventListener("keydown", event => {
    if (event.isComposing || event.keyCode === 229) {
        return;
    }

    const firstChildTodo = todoBoardNode.firstElementChild;
    const firstChildDoing = doingBoardNode.firstElementChild;
    const firstChildVerify = verifyBoardNode.firstElementChild;
    const firstChildDone = doneBoardNode.firstElementChild;

    console.log("event.code0, ", event.code)

    if (event.code === "ArrowLeft" || event.code === "KeyA" || event.code === "Numpad4" ) {
        if (focusedBox && focusedBox === "todo-board") {
            setFocusChronological(firstChildDone, firstChildVerify, firstChildDoing)
        } else if (focusedBox && focusedBox === "doing-board") {
            setFocusChronological(firstChildTodo, firstChildDone, firstChildVerify)
        } else if (focusedBox && focusedBox === "verify-board") {
            setFocusChronological(firstChildDoing, firstChildTodo, firstChildDone)
        } else if (focusedBox && focusedBox === "done-board") {
            setFocusChronological(firstChildVerify, firstChildDoing, firstChildTodo)
        } else {
            focusedBox = "todo-board"
        }
    } else if (event.code === "ArrowRight" || event.code === "KeyD" || event.code === "Numpad6") {
        if (focusedBox && focusedBox === "todo-board") {
            setFocusChronological(firstChildDoing, firstChildVerify, firstChildDone)
        } else if (focusedBox && focusedBox === "doing-board") {
            setFocusChronological(firstChildVerify, firstChildDone, firstChildTodo)
        } else if (focusedBox && focusedBox === "verify-board") {
            setFocusChronological(firstChildDone, firstChildTodo, firstChildDoing)
        } else if (focusedBox && focusedBox === "done-board") {
            setFocusChronological(firstChildTodo, firstChildDoing, firstChildVerify)
        } else {
            focusedBox = "todo-board"
        }
    } else if (event.code === "ArrowUp" || event.code === "KeyW" || event.code === "Numpad8") {
        if (event.target) {
            setFocusChronological(currentFocusedItemNode.previousElementSibling, currentFocusedItemNode.parentNode.lastElementChild, undefined);
        }
    } else if (event.code === "ArrowDown" || event.code === "KeyS" || event.code === "Numpad2") {
        if (event.target) {
            setFocusChronological(currentFocusedItemNode.nextElementSibling, currentFocusedItemNode.parentNode.firstElementChild, undefined);
        }
    }
});

function setFocusChronological(firstChoice, secondChoice, thirdChoice) {
    if (firstChoice) {
        firstChoice.focus();
        currentFocusedItemNode = firstChoice;
    } else if (secondChoice) {
        secondChoice.focus();
        currentFocusedItemNode = secondChoice;
    } else if (thirdChoice) {
        thirdChoice.focus();
        currentFocusedItemNode = thirdChoice;
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