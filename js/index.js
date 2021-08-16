//on page load, show 1st 50 monsters

document.addEventListener('DOMContentLoaded', () => {
     let pageNum = 19
  const monsterCont = document.querySelector('#monster-container')  
  const backButton = document.getElementById('back')
  const forwardButton = document.getElementById('forward')
 
  const monsterForm = document.createElement('form')
  const monsterFormCont= document.querySelector('#create-monster')

  monsterForm.innerHTML = `
  <label>Name: </label>
  <input type="text" id="monster-name"/>
  <label>Age: </label>
  <input type="text" id="monster-age"/>
  <label>Description: </label>
  <input type="text" id="monster-desc"/>
  <input type="submit" value="Create Monster"/>
  `
monsterFormCont.append(monsterForm)

monsterForm.addEventListener('click', (e) => {
  e.preventDefault()
  fetch('http://localhost:3000/monsters',{  
    method: "POST", 
    headers: 
        {"Accept": "application/json",
         "Content-Type": "application/json"},
    body: JSON.stringify({
      name: document.getElementById('monster-name').value,
      age: document.getElementById('monster-age').value, 
      description: document.getElementById('monster-desc').value 
    }),
   })
   .then(resp => resp.json())
   .then(console.log)
})
  

  backButton.addEventListener('click', (e)=> {   
    if(pageNum===1){
        window.alert("You are on the 1st page")
    }else{
        pageNum -= 1
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)    
    .then(resp => resp.json())
    .then((monsters) => {
        monsterCont.innerHTML = `Page ${pageNum}`
       monsters.forEach((monster) => {
        monsterCont.append(renderMonster(monster), document.createElement('hr'))
       })
    }) 
    }
  })

  forwardButton.addEventListener('click', (e)=> {
    pageNum += 1
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)    
    .then(resp => resp.json())
    .then((monsters) => {
        console.log(monsters)
        if(monsters.length === 0){
            pageNum -= 1
            window.alert("You are on the final page")
        }else{
            monsterCont.innerHTML = `Page ${pageNum}`
       monsters.forEach((monster) => {
        monsterCont.append(renderMonster(monster), document.createElement('hr'))
       })}
        
    }) 
  })

    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)    
    .then(resp => resp.json())
    .then((monsters) => {
        monsterCont.innerHTML = `Page ${pageNum}`
       monsters.forEach((monster) => {
        monsterCont.append(renderMonster(monster), document.createElement('hr'))
       })
    })


  function renderMonster(monster){
    const monsterSpan = document.createElement('span')
    //add styling/information 
    monsterSpan.innerHTML = `
    <h1>${monster.name}</h1>
    <h4>Age: ${monster.age}</h4>
    <p>Description: ${monster.description}</p>
    `
    monsterSpan.dataset.id = monster.id
    monsterSpan.style.color = 'green'
    //append to dom
    return monsterSpan
  }

})
//on form submit, new monster created

//on bottom of page, arrows show next/ previous 50 monsters