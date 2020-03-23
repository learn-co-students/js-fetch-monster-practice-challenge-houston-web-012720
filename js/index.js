const divMon = document.querySelector("div#monster-container")
const divNewMon = document.querySelector("div#create-monster")


fetch('http://localhost:3000/monsters')
.then(resp => resp.json())
.then(monsters => {
    monsters.forEach(monster => createMonsterCard(monster))
})

function createMonsterCard(monster){
    let div = document.createElement("div")
    div.id = "monster-card"

    let h2 = document.createElement("h2")
    h2.innerText = monster.name

    let h4 = document.createElement("h2")
    h4.innerText = monster.age

    let p = document.createElement("p")
    p.innerText = `Bio: ${monster.description}`

    let delBtn = document.createElement("button")
    delBtn.innerText = "Delete"

    delBtn.addEventListener("click", ()=> {
        fetch(`http://localhost:3000/monsters/${monster.id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(monster => {
            div.remove()
        })
    });
    


    div.append(h2,h4,p,delBtn)
    divMon.append(div)
}

let form = document.createElement("form")

let input1 = document.createElement("input")
input1.placeholder = "monster name"
input1.type = "text"

let input2 = document.createElement("input")
input2.placeholder = "monster age"
input2.type = "text"

let input3 = document.createElement("input")
input3.placeholder = "monster bio"
input3.type = "text"

let input4 = document.createElement("input")
input4.type = "submit"

form.append(input1,input2,input3,input4)
divNewMon.append(form)

form.addEventListener("submit", ()=> {
    event.preventDefault

fetch('http://localhost:3000/monsters', {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: form[0].value,
        age: form[1].value,
        description: form[2].value
        })  
    })
    // .then(resp => console.log(resp))
    // .then(monster => console.log(monster))
});