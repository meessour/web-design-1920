function dragstart(ev) {
    ev.dataTransfer.setData('application/drag-and-drop', ev.target.id);

    setTimeout(() => ev.target.closest('.box').className = "box-skeleton"
        , 0);
}

function dragend(ev) {
    setTimeout(() => ev.target.closest('.box-skeleton').className = "box"
        , 0);
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