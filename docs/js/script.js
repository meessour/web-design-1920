class App {

    static init() {

        const items = document.getElementsByClassName('box');

        for (const item of items) {
            item.addEventListener("dragstart", App.dragstart);
            item.addEventListener("dragend", App.dragend)
        }

        const containers = document.getElementsByClassName('board');

        for (const container of containers) {
            container.addEventListener("dragover", App.dragover);
            container.addEventListener("dragenter", App.dragenter);
            container.addEventListener("dragleave", App.dragleave);
            container.addEventListener("drop", App.drop);
        }
    }

    static dragstart(e) {

        e.dataTransfer.setData('text/html', this.outerHTML)

        // e.target.outerHTML = ""

        setTimeout(() => this.className = "invisible", 0)

    }

    static dragend(e) {
        console.log("draggend?")

        this.className = "box"
    }

    static dragover(e) {
        e.preventDefault()
    }

    static dragenter(e) {
        e.preventDefault()
        this.className += " hovered"
    }

    static dragleave() {
        this.className = "board"
    }

    static drop(e) {
        // this.className = "board"
        // this.append(App.box)
        // console.log("e.target.getAttribute('box'):", e.target.getAttribute('box'));


        // if (e.target.getAttribute('box') == 'target') {
        const item = e.dataTransfer.getData('text/html');

        console.log("target", e.target)

        this.innerHTML = item



        e.preventDefault();
        // }
        //
        // const pointA = document.getElementById(div)
        // const pointB = document.getElementById(e.target.parentNode.id)
        // App.swapElements(pointA, pointB)
    }

}

document.addEventListener("DOMContentLoaded", App.init)

