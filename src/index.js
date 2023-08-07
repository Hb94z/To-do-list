import { populateProject } from "./domPopulate";

let objectArr = [];

let counter = 0;
let toDoItemReferenceNum

let addProject = (() => {
  let modal = document.getElementById("add-project");
  let addButton = document.getElementById("add");
  addButton.addEventListener("click", () => {
    
    modal.style.display = "block";
    
    window.onclick = function(e) {
        if (e.target == modal) {
          modal.style.display = "none";
        }
      }
  });
})();

function addToDo(dataNum) {

  let modal2 = document.getElementById("add-to-do");
  console.log(dataNum); 
  modal2.style.display = "block";
  let addTodo = "";
  window.onclick = function(e) {
        if (e.target == modal2) {
          modal2.style.display = "none";
        }
  }
      
  let form = document.getElementById("addToDoForm")
  console.log(dataNum); 
        
  form.addEventListener("submit", logSubmit, false);
  
  function logSubmit(event) {
    
    event.preventDefault();
    
    let modal = document.getElementById("add-to-do");
    let toDo = document.getElementById("To-Do-Name").value;
    console.log(dataNum); 
    
    modal.style.display = "none";
    addTodo = objectArr.find((todos) => todos.dataNum === dataNum);
    
    let arrayofToDoObjects = addTodo.toDos;
    let inp = (dataNum + addTodo.toDoItemReferenceNum);
    let toDoos = toDoFactory(toDo, inp);
addTodo.toDos.push(toDoos);
    form.reset();
    console.log(objectArr);
    updateListdisplay(dataNum, addTodo, arrayofToDoObjects, inp);
    form.removeEventListener("submit", logSubmit, false);  
  };
   
};


function updateListdisplay(dataNum, addTodo, arrayofToDoObjects, inp) {
  console.log(addTodo.title)
 
  document.querySelectorAll('.to-do-form').forEach(Element => {
    
      let dataNum2 = Element.getAttribute('data-num')
      
 console.log(dataNum2);
 
 if (dataNum2 === dataNum)
{

 
let template = document.getElementById("check-box-to-do-item");
let clone = template.content.cloneNode(true);
let checkboxContainer = clone.querySelector(".check-box-container");
let container = document.querySelector(`form[data-num="${dataNum2}"]`);
let label = clone.querySelector(".to-do-label");
let input = clone.querySelector(".to-do-item");
let editButton = clone.querySelector(".del-to-do")

input.id = inp;

label.htmlFor = (dataNum + addTodo.toDoItemReferenceNum);
editButton.id = ("remove" + dataNum + addTodo.toDoItemReferenceNum);
checkboxContainer.setAttribute("to-do-num", inp);

let displayValue = arrayofToDoObjects[addTodo.toDoItemReferenceNum].todoitem;
let CapitalisedDisplayValue = displayValue.charAt(0).toUpperCase() + displayValue.slice(1);
label.innerHTML = CapitalisedDisplayValue;

addTodo.toDoItemReferenceNum++
container.appendChild(clone);
 }
  });
}
 
let addProjectForm = (() => {
let form = document.getElementById("addprojectform")

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  let modal = document.getElementById("add-project");
  let projectNameGet = document.getElementById("project-name").value;
  let descriptionGet = document.getElementById("description").value;
  let deadlineGet = document.getElementById('deadline').value;
  let toDos = [];

  
  
  

  
  console.log(projectNameGet, descriptionGet, deadlineGet);
  modal.style.display = "none";
  let newProject = projectFactory(projectNameGet, descriptionGet, deadlineGet, toDos)
  objectArr.push(newProject);
  console.log(objectArr);
  console.log(newProject.deadline);

  populateProject(newProject, counter);

  form.reset();
});

})();

let toDoFactory = (todoitem, reference,) => {
 
  return {todoitem, reference};
}

let projectFactory = (title, description, deadline, toDos) => {
 
  return {title, description, deadline, toDos};
}


function buttonHandler () {

    let target = event.target;
    if(event.target.className === 'edit-to-dos') {
      console.log("hello")
      let dataNum = target.parentNode.parentNode.getAttribute('data-num');
      console.log(dataNum);
      addToDo(dataNum);
      
    }
   
     if (event.target.className === 'Remove') {
    let nums = document.querySelector(".project-info")
    let dataNum = target.parentNode.getAttribute('data-num');
    console.log(dataNum)
    ;
     objectArr = objectArr.filter((project, index) => {
      if (project.dataNum === dataNum) {
        console.log(project)
        console.log("num is" + project.dataNum)
        let div = document.querySelector(`div[data-num="${dataNum}"]`);
        div.parentNode.removeChild(div);
        
        return false;
        
      }
      
      return true;  
      
});  
};
 if (event.target.className === "del-to-do") {
  console.log("hello" + event.target.id);
  let newId = event.target.id;
  let removeId = newId.slice(-2);
  let removeReferenceNum = removeId.substring(1);
  console.log(removeReferenceNum + "this is removereference num");
  let dataNum = target.parentNode.parentNode.getAttribute('data-num');
  console.log(dataNum + "this is datanum");
  removetoDo(removeId, removeReferenceNum, dataNum);
return
  

  
};
};

function removetoDo(removeId, removeReferenceNum, dataNum) {
  console.log("removeid is" + removeId + "removereferencenum is" + removeReferenceNum + "datanum is" + dataNum);
  
    let thisone = objectArr.find((todos) => todos.dataNum === dataNum);
    let toDoListItem = thisone.toDos
    const idk = toDoListItem.findIndex(object => {
      return object.reference === removeId;
    });
    console.log(idk + "this is idk")
    console.log(thisone);
    if (toDoListItem[idk].reference == removeId) {

      console.log(thisone)
      console.log("num is" + thisone.dataNum)
      let div = document.querySelector(`div[to-do-num="${removeId}"]`);
      console.log(div);
      div.parentNode.removeChild(div);
      toDoListItem.splice(idk, 1); 
      thisone.toDoItemReferenceNum--;
      console.log(objectArr)

      return false;
      
    }
    
    return true;  
    

  
  }


  let div1 = document.getElementById('project-container');
    div1.addEventListener('click', buttonHandler);