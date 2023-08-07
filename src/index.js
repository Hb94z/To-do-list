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
  console.log(dataNum); // tracks dataNum correctly
  modal2.style.display = "block";
  let addTodo = "";
  window.onclick = function(e) {
        if (e.target == modal2) {
          modal2.style.display = "none";
        }
  }
      
  let form = document.getElementById("addToDoForm")
  console.log(dataNum); //also tracks dataNum correctly
        
  form.addEventListener("submit", logSubmit, false);
  
  function logSubmit(event) {
    
    event.preventDefault();
    
    let modal = document.getElementById("add-to-do");
    let toDo = document.getElementById("To-Do-Name").value;
    console.log(dataNum); // HERE IT HANGS ON TO THE PAST VALUE PERMANANTLY
    
    modal.style.display = "none";
    addTodo = objectArr.find((todos) => todos.dataNum === dataNum);
    
     let arrayofToDoObjects = addTodo.toDos;
     //arrayofToDoObjects[addTodo.toDoItemReferenceNum].todoitem = toDo;
     //arrayofToDoObjects[addTodo.toDoItemReferenceNum].reference = input.id;
     //console.log(arrayofToDoObjects[addTodo.toDoItemReferenceNum].todoitem)
    //addTodo.toDos.push(toDo);
    let inp = (dataNum + addTodo.toDoItemReferenceNum);
    let toDoos = toDoFactory(toDo, inp);
addTodo.toDos.push(toDoos);
    form.reset();
    console.log(objectArr);
    updateListdisplay(dataNum, addTodo, arrayofToDoObjects, inp);
    form.removeEventListener("submit", logSubmit, false);  
  };
   
};
//const uncle = Factory('uncle', 44, []);
//MasterArray[indexOfObject].relatives.push(uncle)

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
//label.innerHTML = addTodo.toDos[addTodo.toDoItemReferenceNum];
let displayValue = arrayofToDoObjects[addTodo.toDoItemReferenceNum].todoitem;
let CapitalisedDisplayValue = displayValue.charAt(0).toUpperCase() + displayValue.slice(1);
label.innerHTML = CapitalisedDisplayValue;

//arrayofToDoObjects[addTodo.toDoItemReferenceNum].reference = input.id;

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
  //let toDos = [{ todoitem: "", reference: ""}
  //];
  //let toDoos = toDoFactory(toditem, reference);
  
  
  

  
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
  //objectArr = objectArr.filter((project, index) => {
    let thisone = objectArr.find((todos) => todos.dataNum === dataNum);
    let toDoListItem = thisone.toDos
    const idk = toDoListItem.findIndex(object => {
      return object.reference === removeId;
    });
    console.log(idk + "this is idk")
    console.log(thisone);
    if (toDoListItem[idk].reference == removeId) {
      //let toDoListItem = project.toDos
      console.log("hey");
      //if (toDoListItem[removeReferenceNum].reference == removeId) { console.log("this code would remove it")}
      console.log(thisone)
      console.log("num is" + thisone.dataNum)
      let div = document.querySelector(`div[to-do-num="${removeId}"]`);
      console.log(div);
      div.parentNode.removeChild(div);
      toDoListItem.splice(idk, 1); 
      thisone.toDoItemReferenceNum--;
      console.log(objectArr)
      //code is broken becase the reference cant match the array index when they get removed and added
      //in a certain pattern. need to figure out that.so removereferenceid is wrong there becase it will say 1, when index is
      //now 0 due to removes. how to i keep this in sync?
      //let referncenum == item and incrimentd ecrement?
      
      return false;
      
    }
    
    return true;  
    
//});
  
  }


  let div1 = document.getElementById('project-container');
    div1.addEventListener('click', buttonHandler);
  

    //to code the remove or edit of todo items, i think i need to create and objectin the initial
    //factory function. atm im just making an empty array, but i need to somehow make that array have a
    //defauly object with to-do-item value and a reference value.
    //then i can use these to make it work. it currently works if i hard code the number of objects
    //into that array, but breaks once the items reach that number of hard coded objects.
    //maybe i can set the values without initiating them somehow like with original
