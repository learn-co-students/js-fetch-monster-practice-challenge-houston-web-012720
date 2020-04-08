
const MONSTERS_URL = "http://localhost:3000/monsters/?_limit=50&_page="

document.addEventListener("DOMContentLoaded", () => {

  var current_page = 1

  function createMonsterForm() {
    const form_container = document.querySelector("#create-monster")

    const monster_form = document.createElement("form")

    const name_label = document.createElement("label")
    const name_input = document.createElement("input")

    const age_label = document.createElement("label")
    const age_input = document.createElement("input")

    const bio_label = document.createElement("label")
    const bio_input = document.createElement("input")

    const submit_btn = document.createElement("input")

    name_label.innerHTML = "<br>Name: "
    age_label.innerHTML = "<br>Age: "
    bio_label.innerHTML = "<br>Bio: "

    submit_btn.type = "submit"
    submit_btn.value = "Create New Monster"

    form_container.append(monster_form)

    monster_form.append(name_label)
    monster_form.append(name_input)

    monster_form.append(age_label)
    monster_form.append(age_input)

    monster_form.append(bio_label)
    monster_form.append(bio_input)

    monster_form.append(submit_btn)

    submit_btn.addEventListener("click", () => {
      event.preventDefault()
      fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          name: name_input.value,
          age: age_input.value,
          description: bio_input.value
        }
      })
        .then( res => res.json() )
        .then( monsters => {
          console.log(monsters)
        })
    })
  }

  function getMonsters() {
    fetch(MONSTERS_URL + current_page)
      .then(res => res.json())
      .then(monsters => {
        for (monster of monsters) {
          addMonsterDiv(monster)
        }
      })
  }

  createMonsterForm()
  getMonsters()

  function addMonsterDiv(monster) {
    const monster_container = document.querySelector("#monster-container")

    const monster_div = document.createElement("div")
    const monster_name = document.createElement("h2")
    const monster_age = document.createElement("h4")
    const monster_bio = document.createElement("p")

    monster_div.setAttribute("monster-id", monster.id)
    monster_name.innerText = monster.name
    monster_age.innerText = "Age: " + monster.age
    monster_bio.innerText = "Bio: " + monster.description

    monster_container.append(monster_div)
    monster_div.append(monster_name, monster_age, monster_bio)
  }

  const forward = document.querySelector("#forward")
  const back = document.querySelector("#back")

  forward.addEventListener("click", () => {
    if (current_page < 21) {
      current_page += 1
      const div = document.querySelector("#monster-container")
      div.childNodes.forEach(child => { child.remove() })
      getMonsters()
    }
  })

  back.addEventListener("click", () => {
    if (current_page > 1) {
      current_page -= 1
      const div = document.querySelector("#monster-container")
      div.childNodes.forEach(child => { child.remove() })
      getMonsters()
    } else {
      alert("Yikes! Looks like this is the first page...")
    }
  })

})

