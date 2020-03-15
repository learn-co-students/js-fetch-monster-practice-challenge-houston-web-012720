document.addEventListener('DOMContentLoaded', function() {


    fetch(`http://localhost:3000/monsters`)
        .then(function(res) {
            return res.json()
        }).then(function(monstersarray) {
            showmonster(monstersarray)
        })

    function showmonster(monsters) {
        monsters.forEach(function(monster) {
            addmonester(monster)
        })
    }

    function createmonster(monster) {
        const div = document.createElement("div");
        let h1 = document.createElement('h1')
        h1.innerText = monster["name"]
        let h3 = document.createElement('h3')
        h3.innerText = monster["age"]
        let p = document.createElement('p')
        p.innerText = monster["description"]
        div.append(h1, h3, p)
        return div
    }

    function addmonester(monster) {
        let container = document.getElementById('monster-container')
        let divmoster = createmonster(monster)
        container.append(divmoster)
    }

    let createdive = document.getElementById("create-monster")
    let form = document.createElement('form')

    let namelabel = document.createElement('label')
    namelabel.innerHTML = "Name:"

    let namefield = document.createElement('input')
    namefield.placeholder = "type monester name"

    let agelabel = document.createElement('label')
    agelabel.innerText = "Age:"

    let agefiled = document.createElement('input')
    agefiled.placeholder = "type monester age"

    let bio = document.createElement('label')
    bio.innerText = "Bio:"

    let biofield = document.createElement('input')
    biofield.placeholder = "type description"

    let button = document.createElement('button')
    button.innerText = "Create Monster"
    button.setAttribute("type", "submit")

    form.append(namelabel, namefield, agelabel, agefiled, bio, biofield, button)
    createdive.append(form)


    form.addEventListener('submit', function(event) {
        event.preventDefault()
        let name = event.target[0].value
        let age = event.target[1].value
        let bio = event.target[2].value

        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "age": age,
                "description": bio
            })
        }).then(function(res) {
            return res.json()
        }).then(function(json) {
            createmonster(json)
        })

    })

})