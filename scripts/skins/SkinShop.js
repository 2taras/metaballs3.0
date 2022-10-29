import SetSkin from "./SetSkin.js"

export default function () {
    ;[...document.getElementsByClassName("skin")].forEach((skin) => {
        let price = skin.getAttribute("price")
        skin.addEventListener("click", () => {
            if(window.highScore >= price){
                SetSkin(skin.getAttribute("objID"), skin.getAttribute("data"))
                window.ship_skin = parseInt(skin.getAttribute("num_id"))
            }
        })
        let node = document
            .getElementById(skin.getAttribute("objID"))
            .cloneNode()
        node.data = `graphics/${skin.getAttribute("data")}`
        node.style.transform = "translate(0, 1vh)"
        skin.appendChild(node)
        let text = document.createElement("span")
        text.style.transform = "translate(0, 10vh)"
        text.innerText = price
        skin.appendChild(text)
    })
}
