


document.addEventListener("DOMContentLoaded", () => {

  let currentPage = 1
  const monstersDiv = document.querySelector("div#monster-container")
  const newmonsterDiv = document.querySelector("div#create-monster")
  const btnbck = document.querySelector('button#back')
  const btnfrwrd = document.querySelector('button#forward')

  
  loadMonsters(currentPage)

  btnbck.addEventListener("click", () => {
    if (currentPage > 1){
      currentPage-- 
      loadMonsters(currentPage)
    } 
  })

  btnfrwrd.addEventListener("click", () => {
    currentPage++
    loadMonsters(currentPage)
  })
  const form = document.createElement("form")
  const labelName = document.createElement("label")
  labelName.innerText = "Name:"
  const labelAge = document.createElement("label")
  labelAge.innerText = "Age:"
  const labelDesc = document.createElement("label")
  labelDesc.innerText = "Description:"
  const inputName = document.createElement("input")
  inputName.type = "text"
  const inputAge = document.createElement("input")
  inputAge.type = "number"
  const inputDesc = document.createElement("input")
  inputDesc.type = "text"
  const inputSubmit = document.createElement("input")
  inputSubmit.type = "submit"
  form.append(labelName, inputName, labelAge, inputAge, labelDesc, inputDesc, inputSubmit)
  newmonsterDiv.append(form)
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    let monster = JSON.stringify( {
      name: inputName.value,
      age: parseInt(inputAge.value),
      description: inputDesc.value
    })
    let params = {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: monster
    }
    fetch("http://localhost:3000/monsters", params)
      .then(resp => resp.json())
      .then(form.reset())
  })


  function loadMonsters(currentPage) {
    const firtMonster = ((currentPage - 1)*50)
    const lastMonster = firtMonster + 50
    fetch("http://localhost:3000/monsters")
      .then(resp => resp.json())
      .then(monsters => {displayMonsters(monsters, firtMonster, lastMonster)})
  }

  function displayMonsters(monsters, firtMonster, lastMonster){
    if (monsters.length > lastMonster){
      monsters = monsters.slice(firtMonster, lastMonster)
    }
    else if (monsters.length < firtMonster){
      currentPage--
      return false
    }
    else if (monsters.length <= lastMonster){
      lastMonster = monsters.length
      monsters = monsters.slice(firtMonster, lastMonster)
    }
    deleteMonsters()
    monsters.forEach(monster => displayMonster(monster))
  }

  function deleteMonsters(){
    let allmonsters = document.querySelectorAll("div.monster")
    allmonsters.forEach(mon => mon.remove())
  }

  function displayMonster(monster){
    const div = document.createElement('div')
    div.className = "monster"
    div.id = monster.id
    const h2 = document.createElement('h2')
    h2.innerText = monster.name
    const h4 = document.createElement('h4')
    h4.innerText = `Age: ${monster.age}`
    const p = document.createElement('p')
    p.innerText = `Bio: ${monster.description}`
    div.append(h2, h4, p)
    monstersDiv.append(div)
  }

})
  