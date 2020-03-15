document.addEventListener('DOMContentLoaded', function() {
    // let page = 1
    //fetch(page)
    // fetch(`http://localhost:3000/monsters/?_limit=${num1}&_page=${num2}`)
    function fetchme(page) {
        fetch(`http://localhost:3000/monsters/?_limit=10&_page=${page}`)

        .then(function(res) {
            return res.json()
        }).then(function(monstersarray) {
            showmonster(monstersarray)
        })
    }


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

    const container = document.getElementById('monster-container')

    function addmonester(monster) {
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





    let page = 1
    let back = document.getElementById('back')
    back.addEventListener('click', function() {
        if (page === 1) {
            alert("Can't go back.")
        } else {
            container.innerHTML = ''
            page--
            fetchme(page)
        }
    })

    let forward = document.getElementById('forward')
    forward.addEventListener('click', function() {
        if (page === 19) {
            alert("Can't go forward.")
        } else {
            container.innerHTML = ''
            page++
            fetchme(page)
        }
    })

    fetchme(page)




})