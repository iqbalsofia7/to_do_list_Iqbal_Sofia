//Input et bouton add
let addBtn = document.querySelector('#addBtn')
let inputText = document.querySelector('#inputTxt')
//Filtres pour les to do's
let toDoFilter = document.querySelector('#toDoBtn')
let doneFilter = document.querySelector('#doneBtn')
let allFilter = document.querySelector('#allBtn')
//Div principale dans laquelle iront les tâches
let maDiv = document.querySelector('#allToDos')
let toDoList= document.querySelector('#toDoList')

//! AJOUTER UNE TÂCHE :
let addTask =()=>{
    if (inputText.value.length == 0) {
        alert('Veuiller entrez au mininum un caractère')
    } else{ 
    //Div principale pour la tâche
    let newDivParent = document.createElement('div')
    newDivParent.classList.add('task', 'all')

//Créer un li dans la div créée
    let newLi = document.createElement('li')
    newLi.innerText = inputText.value
    newLi.setAttribute('draggable', true);
    newDivParent.appendChild(newLi)
//Créer une seconde div sous le li
    let newDivEnfant = document.createElement('div')
    newDivEnfant.classList.add('divInsideTask')
    newDivParent.appendChild(newDivEnfant)

//Dans la divEnfant : Créer le bouton "EDIT" 
    let newBtnEdit = document.createElement('button')
    newBtnEdit.innerHTML = '<i class="edit2 fa-regular fa-pen-to-square"></i>'
    newBtnEdit.classList.add('edit') 
    newDivEnfant.appendChild(newBtnEdit)
//Dans la divEnfant : Créer le bouton "DONE"
    let newBtnDone = document.createElement('button')
    newBtnDone.innerHTML = '<i class="doneBtn2 fa-regular fa-circle-check"></i>'
    newBtnDone.classList.add('doneBtn')
    newDivEnfant.appendChild(newBtnDone)
//Dans la divEnfant : Créer le bouton "DELETE"
    let newBtnDelete = document.createElement('button')
    newBtnDelete.innerHTML = '<i class="trashBtn fa-solid fa-trash"></i>'
    newBtnDelete.classList.add('trashBtn2')
    newDivEnfant.appendChild(newBtnDelete)
    newDivParent.setAttribute('draggable', true); //! draggable
    newDivParent.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', e.target.innerText);
    });
//Ajouter toute la div dans l'HTML 
    toDoList.appendChild(newDivParent)
//Réinitialiser la valeur de l'input pour qu'il n'y ait pas le texte mis précédammant
    inputText.value = "" 
    }
}
addBtn.addEventListener('click', addTask)

//! Drag
toDoList.addEventListener('dragover', (e)=> {
    e.preventDefault();
});
//! Drop
toDoList.addEventListener('drop', (e)=> {
    let newDivParent = document.createElement('div')
    newDivParent.classList.add('task', 'all')
//Créer un li dans la div créée
    let newLi = document.createElement('li')
    newLi.setAttribute('draggable', true);

    let task = e.dataTransfer.getData('text/plain'); //! setData pour définir les données transférées / getData pour récupérer les données définies par setData
    newLi.innerText = task; //! permet de conserver la texte du 'li'

    newDivParent.appendChild(newLi)
//Créer une seconde div sous le li
    let newDivEnfant = document.createElement('div')
    newDivEnfant.classList.add('divInsideTask')
    newDivParent.appendChild(newDivEnfant)

//Dans la divEnfant : Créer le bouton "EDIT" 
    let newBtnEdit = document.createElement('button')
    newBtnEdit.innerHTML = '<i class="edit2 fa-regular fa-pen-to-square"></i>'
    newBtnEdit.classList.add('edit') 
    newDivEnfant.appendChild(newBtnEdit)
//Dans la divEnfant : Créer le bouton "DONE"
    let newBtnDone = document.createElement('button')
    newBtnDone.innerHTML = '<i class="doneBtn2 fa-regular fa-circle-check"></i>'
    newBtnDone.classList.add('doneBtn')
    newDivEnfant.appendChild(newBtnDone)
//Dans la divEnfant : Créer le bouton "DELETE"
    let newBtnDelete = document.createElement('button')
    newBtnDelete.innerHTML = '<i class="trashBtn fa-solid fa-trash"></i>'
    newBtnDelete.classList.add('trashBtn2')
    newDivEnfant.appendChild(newBtnDelete)

    newDivParent.setAttribute('draggable', true); //! remettre le draggable à true
    //Ajouter toute la div dans l'HTML 
    toDoList.appendChild(newDivParent)
    //input vide à nouveau
    inputText.value = "" 
    newDivParent.addEventListener('dragstart', (e)=> {
        e.dataTransfer.setData('text/plain', e.target.innerHTML)
    }
)});

//! SUPPRIMER UNE TÂCHE :
function deleteTask(e){
    let maCible = e.target
    if (maCible.classList[0] === 'trashBtn') {
    maCible.parentElement.parentElement.parentElement.remove()
    }
    if (maCible.classList[0] === 'trashBtn2') {
        maCible.parentElement.parentElement.remove()
        }
}
maDiv.addEventListener('click', deleteTask);
//! TÂCHE TERMINEE :
function taskDone(e) {
    let monLi = e.target
    if (monLi.classList[0] === 'doneBtn') {
        monLi.parentElement.parentElement.classList.toggle('done')
    }
    if (monLi.classList[0] === 'doneBtn2') {
        monLi.parentElement.parentElement.parentElement.classList.toggle('done')
    }
}
maDiv.addEventListener('click', taskDone);
//! EDITER UNE TÂCHE
function editTask(e) {
    let editBtn = e.target;
    if (editBtn.classList[0] === 'edit') {
        let liToEdit = editBtn.parentElement.parentElement.querySelector('li');
        let originalText = liToEdit.innerText;
        liToEdit.setAttribute('contenteditable', true);
        liToEdit.focus();
        liToEdit.addEventListener('blur', (e) => {
            liToEdit.setAttribute('contenteditable', false);
            
            if(liToEdit.innerText.length === 0) {
                liToEdit.innerText = originalText; //dans le cas ou on ne modifie pas la tâche
            }
        });
    }
    if (editBtn.classList[0] === 'edit2') {
        let liToEdit = editBtn.parentElement.querySelector('li')
        let originalText = liToEdit.innerText;
        liToEdit.setAttribute('editable', true);
        liToEdit.focus();
        liToEdit.addEventListener('blur', (e) => { //blur : annuler le ciblage
            liToEdit.setAttribute('editable', false);
            if(liToEdit.innerText.length === 0) {
                liToEdit.innerText = originalText; //si Li non modifié
            }
        });
    }
}
maDiv.addEventListener('click', editTask);


//!FILTRE TO DO :
function filterToDo() {
    // Selectionne les tâches qui n'ont pas la classe done (celles à afficher)
    let notDoneTasks = document.querySelectorAll('.task:not(.done)');

    // Cacher les tâches qui ne correspondent pas
    let allTasks = document.querySelectorAll('.task');
    allTasks.forEach(task => task.style.display = 'none');

    // Afficher uniquement les tâches à faire
    notDoneTasks.forEach(task => task.style.display = 'flex');
}
toDoFilter.addEventListener('click', filterToDo);
// //!FILTRE DONE :
function filterDone() {
    // Select all the tasks that have the "done" class
    // let tasks = document.querySelectorAll('.task');
    // let doneTasks = tasks.querySelectorAll('.done')
    // // Hide all the tasks
    // let allTasks = document.querySelectorAll('.task');
    // allTasks.forEach(task => task.style.display = 'none');

    // // Show only the selected tasks
    // doneTasks.forEach(task => task.style.display = 'flex')

    let tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
      if(!task.classList.contains('done')) {
        task.style.display = "none"
      } else {
        task.style.display = 'flex'
    }
})
}
doneFilter.addEventListener('click', filterDone);
//! FILTRE ALL TO DO'S :
function filterALL() {
    let tasks = document.querySelectorAll('.task');
    tasks.forEach(element => {
        if (element.classList.contains('all')) {
            element.style.display = 'flex'
        }
    });
}
allFilter.addEventListener('click', filterALL)
