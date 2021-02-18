// CSS
import "../scss/index.scss";

// Data
import data from "../assets/menu.json";

function component() {
    const el = document.createElement("h1");

    el.innerHTML = _.join(["Hello", "World"], " ");

    return el;
}

document.getElementById("root").appendChild(component());

console.log(data);
